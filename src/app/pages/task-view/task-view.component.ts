import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/task.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  listsById: any;

  lists: any = [];
  tasks: any = [];
  tasksTable: any = [];
  webVersion: string = '0.0.2';
  selectedListId!: string;

  users: any = [];
  load: any = 1;
  load2: any = 1;
  loadBtn: any= 1;
  loadProfile: any= 1;

  showProfile: any=0;

  constructor(
    private taskService : TaskService,
    private route: ActivatedRoute ,
    private router: Router, 
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.load2 = 0;
    this.route.params.subscribe(
      (params: Params) =>  {
        if (params['listId']) {
          this.selectedListId = params['listId'];
          this.taskService.getTasks(params['listId']).subscribe((tasks: any=[]) => {
            this.tasks = tasks;
            this.tasks.forEach((el:any, i:any, arr:any) => {
              this.tasksTable.push([formatDate(el.tanggal, 'dd MMMM YYYY', 'en_US'), el.title, el.waktuMulai + ' WITA', el.waktuSelesai + ' WITA']);
            });
          }) 

        this.taskService.getKapalsById(params['listId']).subscribe((listsId: any) => {
        this.listsById = listsId;
        })
        } else {
          this.tasks = undefined;
        }
      })
      this.taskService.getKapals().subscribe((lists: any=[]) => {

        this.lists = lists;
        
        this.load2 = 1;
      })
     this.users  = localStorage.getItem('user');
     this.users = JSON.parse(this.users);
  }

  removePush(listId:string) {
    this.load = 0;
    this.showProfile = 0;
    this.selectedListId = listId;
    this.taskService.getKapalsById(listId).subscribe((listsId: any) => {
      this.listsById = listsId;

      this.load = 1;
    })
    document.getElementById("mySidenav")!.style.width = "0";
    document.getElementById("main")!.style.marginLeft= "0";

  }

  onDeleteListClick() {
    this.taskService.deleteKapal(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
      console.log(res);
    })
  }

  onDeleteTaskClick(id: string) {
    this.loadBtn = 0;
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
      this.tasks = this.tasks.filter((val: { _id: string; }) => val._id !== id);
      this.tasksTable = []
      this.tasks.forEach((el:any, i:any, arr:any) => {
        this.tasksTable.push([formatDate(el.tanggal, 'dd MMMM YYYY', 'en_US'), el.title, el.waktuMulai + ' WITA', el.waktuSelesai + ' WITA']);
        this.loadBtn = 1;
      });
      console.log(res);
    })
  }

  profile() {
    this.loadProfile = 0;
    this.showProfile = 1;
    setTimeout(() => {
      this.loadProfile = 1;
    }, 1000);
  }

  logout() {
    this.authService.logout();
  }

  downloadReport() {
    const doc = new jsPDF();

    autoTable(doc,{
      body: [
        [
          // for header text
          {
            content: 'PT. TANAIR PRATAMA NUSANTARA SAMARINDA',
            styles: { 
              halign: 'left',
              fontSize: 15,
              textColor: '#ffffff'
            }
          },
          {
            content: 'Laporan',
            styles: { 
              halign: 'right',
              fontSize: 15,
              textColor: '#ffffff'
            }
          }
        ],
      ],
      theme: 'plain',
      //for bg color
      styles: {
        fillColor: '#343a40'
      }
    });

    autoTable(doc,{
      body: [
        [
          {
            content: 'NAMA KAPAL / BG :'
            +'\nNAMA KAPAL BONGKAR :'
            +'\nJUMLAH MUATAN :'
            +'\nABK NAMA NAHKODA :'
            +'\nJUMLAH KRU :'
            +'\nDAFTAR KRU :',
            styles: {
              halign:'left',
              fontStyle:'bold'
            }
          },
          {
            content: this.listsById.title
            +'\n'+this.listsById.namaKapal
            +'\n'+this.listsById.jumlahMuatan +' TON'
            +'\n'+this.users.nahkoda
            +'\n'+this.users.jumlahKru +' Orang'
            +'\n'+this.users.kru,
            styles: {
              halign:'right'
            }
          }
        ],
      ],
      theme: 'plain',
    });
    
    autoTable(doc, {
      body: [
        [
          {
            content: 'DAFTAR KEGIATAN',
            styles: {
            halign:'left',
            fontSize:14
            }
          }
        ],
        [
          {
            content: 'Tanggal: ' + formatDate(new Date() , 'hh:mm, dd MMMM YYYY', 'en_US'),
            styles: {
            halign:'left'
            }
          }
        ]
      ],
      theme: 'plain',
    });


    autoTable(doc, {
      head: [['Tanggal', 'Kegiatan', 'Mulai', 'Selesai']],
      body: this.tasksTable,
      theme: 'striped',
      headStyles: {
        fillColor: '343a40',
      }
    });
    
    return doc.save('Laporan-'+this.listsById.title+'-'+formatDate(new Date() , 'dd MMMM YYYY', 'en_US'));
  }

  openNav() {
    document.getElementById("mySidenav")!.style.width = "250px";
    document.getElementById("main")!.style.marginLeft = "250px";
  }

  closeNav() {
    document.getElementById("mySidenav")!.style.width = "0";
    document.getElementById("main")!.style.marginLeft= "0";
  }

}

//   downloadReport() {
//     const doc = new jsPDF();

//     autoTable(doc,{
//       body: [
//         [
//           // for header text
//           {
//             content: 'Company Brand',
//             styles: { 
//               halign: 'left',
//               fontSize: 20,
//               textColor: '#ffffff'
//             }
//           },
//           {
//             content: 'Invoice',
//             styles: { 
//               halign: 'right',
//               fontSize: 20,
//               textColor: '#ffffff'
//             }
//           }
//         ],
//       ],
//       theme: 'plain',
//       //for bg color
//       styles: {
//         fillColor: '#3366ff'
//       }
//     });

//     autoTable(doc,{
//       body: [
//         [
//           {
//             content: 'Reference: #INV0001'
//             +'\nDate: 27-01-2022'
//             +'\nInvoice Number: 123123',
//             styles: { 
//               halign: 'right',
//             }
//           }
//         ],
//       ],
//       theme: 'plain',
//     });

//     autoTable(doc,{
//       body: [
//         [
//           {
//             content: 'Billed to:'
//             +'\nJohn Doe'
//             +'\nBilling Address line 1'
//             +'\nZip code - City'
//             +'\nCountry',
//             styles: {
//               halign:'left'
//             }
//           },
//           {
//             content: 'Shipping address:'
//             +'\nJohn Doe'
//             +'\nShipping Address line 1'
//             +'\nShipping Address line 2'
//             +'\nZip code - City'
//             +'\nCountry',
//             styles: {
//               halign:'left'
//             }
//           },
//           {
//             content: 'From:'
//             +'\nCompany name'
//             +'\nShipping Address line 1'
//             +'\nShipping Address line 2'
//             +'\nZip code - City'
//             +'\nCountry',
//             styles: {
//               halign:'right'
//             }
//           }
//         ],
//       ],
//       theme: 'plain',
//     });

//     autoTable(doc, {
//       body: [
//         [
//           {
//             content: 'Amount due:',
//             styles: {
//             halign:'right',
//             fontSize:14
//             }
//           }
//         ],
//         [
//           {
//             content: '$1000',
//             styles: {
//             halign:'right',
//             fontSize:20,
//             textColor: '#3366ff'
//             }
//           }
//         ],
//         [
//           {
//             content: 'Due date: 2022-02-01',
//             styles: {
//               halign:'right'
//             }
//           },
//         ]
//       ],
//       theme: 'plain',
//     });
    
//     autoTable(doc, {
//       body: [
//         [
//           {
//             content: 'Product & Services',
//             styles: {
//             halign:'left',
//             fontSize:14
//             }
//           }
//         ]
//       ],
//       theme: 'plain',
//     });

//     autoTable(doc, {
//       head: [['Items', 'Category', 'Quantity', 'Price', 'Tax', 'Amount']],
//       body: [
//         ['Product or service name', 'Category', '2', '$100', '$10', '$500'],
//         ['Product or service name', 'Category', '2', '$100', '$10', '$500'],
//         ['Product or service name', 'Category', '2', '$100', '$10', '$500'],
//         ['Product or service name', 'Category', '2', '$100', '$10', '$500']
//       ],
//       theme: 'striped',
//       headStyles: {
//         fillColor: '343a40',
//       }
//     });

//     autoTable(doc, {
//       body: [
//         [
//           {
//             content: 'Subtotal',
//             styles: {
//             halign:'right'
//             }
//           },
//           {
//             content: '$400',
//             styles: {
//             halign:'right'
//             }
//           }
//         ],
//         [
//           {
//             content: 'Total tax',
//             styles: {
//             halign:'right'
//             }
//           },
//           {
//             content: '$40',
//             styles: {
//             halign:'right'
//             }
//           }
//         ],
//         [
//           {
//             content: 'Total amount',
//             styles: {
//             halign:'right'
//             }
//           },
//           {
//             content: '$2000',
//             styles: {
//             halign:'right'
//             }
//           }
//         ]
//       ],
//       theme: 'plain',
//     });

//     autoTable(doc, {
//       body: [
//         [
//           {
//             content: 'Terms & notes',
//             styles: {
//             halign:'left',
//             fontSize: 14
//             }
//           }
//         ],
//         [
//           {
//             content: 'Et nam perferendis omnis repellat est magnam sed consequatur enim. Facere et vitae cumque necessitatibus. Qui neque aliquid. Doloremque accusantium maiores at.',
//             styles: {
//               halign:'left'
//             }
//           }
//         ]
//       ],
//       theme: 'plain',
//     });
    
//     autoTable(doc, {
//       body: [
//         [
//           {
//             content: 'This is center footer',
//             styles: {
//             halign:'center',
//             fontSize: 14
//             }
//           }
//         ]
//       ],
//       theme: 'plain',
//     });
//     return doc.save('Invoice');
//   }


// }
