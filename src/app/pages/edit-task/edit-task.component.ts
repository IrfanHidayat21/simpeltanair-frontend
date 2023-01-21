import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) { }

  taskId!: string;
  listId!: string;
  valTitle!: string;
  valTanggal!: any;
  valWaktuMulai!: string;
  valWaktuSelesai!: string;

  loadData: any = 1;
  loadBtn: any = 1;
  ngOnInit() {
    this.loadData = 0;
    this.route.params.subscribe(
      (params: Params) => {
        this.taskId = params['taskId'];
        this.listId = params['listId'];
        this.taskService.getTaskById(this.listId, this.taskId).subscribe((lists: any=[]) => {
          this.valTitle = lists.title;
          this.valTanggal = lists.tanggal;
          // this.valTanggal = this.valTanggal.formatDate("DD-MM-YYYY");
          this.valWaktuMulai = lists.waktuMulai;
          this.valWaktuSelesai = lists.waktuSelesai;
          this.loadData = 1;
        })
      }
    )


  }

  updateTask(title: string, tanggal: any, waktuMulai: string, waktuSelesai:string) {
    this.loadBtn = 0;
    this.taskService.updateTask(this.listId, this.taskId, title, tanggal, waktuMulai, waktuSelesai).subscribe(() => {
      this.router.navigate(['/lists', this.listId]);
      this.loadBtn = 1;
    },
    error => {
      this.loadBtn = 1;
      console.log(error);    
    })
  }

}
