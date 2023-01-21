import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) { }

  listId!: string;
  valTitle!: string;
  valNama!: string;
  valJumlahMuatan!: number;

  loadData: any = 1;
  loadBtn:any=1;
  ngOnInit() {
    this.loadData = 0;
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
        console.log(params['listId']);

        this.taskService.getKapalsById(params['listId']).subscribe((lists: any=[]) => {
          this.valTitle = lists.title;
          this.valNama = lists.namaKapal;
          this.valJumlahMuatan = lists.jumlahMuatan;
          this.loadData = 1;
        })
      }
    )

  }

  updateKapal(title:string, nama:string, jumlah:number) {
    this.loadBtn = 0;
    this.taskService.updateKapal(this.listId, title, nama, jumlah).subscribe(() => {
      this.router.navigate(['/lists', this.listId]);
      this.loadBtn = 1;
    },
    error => {
      this.loadBtn = 1;
      console.log(error);    
    })
  }

}
