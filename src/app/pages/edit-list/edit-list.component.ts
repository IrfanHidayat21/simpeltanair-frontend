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

  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
        console.log(params['listId']);
      }
    )
    this.taskService.getKapals().subscribe((lists: any=[]) => {
      this.valTitle = lists[0].title;
      this.valNama = lists[0].namaKapal;
      this.valJumlahMuatan = lists[0].jumlahMuatan;
      
    })
  }

  updateKapal(title:string, nama:string, jumlah:number) {
    this.taskService.updateKapal(this.listId, title, nama, jumlah).subscribe(() => {
      this.router.navigate(['/lists', this.listId]);
    })
  }

}
