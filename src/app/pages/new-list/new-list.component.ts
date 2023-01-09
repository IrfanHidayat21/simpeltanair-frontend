import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {
  list!: List;

  constructor(
    private router: Router,
    private taskService : TaskService
  ) { }

  ngOnInit() {
  }

  createKapal(title:string, nama:string, jumlah:number) {
    this.taskService.createKapal(title, nama, jumlah).subscribe((list: any) => {
      console.log(list);
      this.list = list;
      // now we navigate to /list/response._id  
      this.router.navigate([ '/lists', this.list._id]);

  })
  }

}
