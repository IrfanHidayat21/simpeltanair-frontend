import { Injectable } from '@angular/core';
import { Task } from './models/task.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private webReqService: WebRequestService
  ) { }

  getKapals() {
    return this.webReqService.get('kapal');
  }

  getKapalsById(id: string) {
    return this.webReqService.get(`kapal/${id}`);
  }

  createKapal(title: string, namaKapal:string, jumlahMuatan:number) {
    // we want to send a web request to create a list
    return this.webReqService.post('kapal', { title, namaKapal, jumlahMuatan })
  }

  updateKapal(id: string, title: string, namaKapal:string, jumlahMuatan:number) {
    // We want to send a web request to update a list
    return this.webReqService.patch(`kapal/${id}`, { title, namaKapal, jumlahMuatan });
  }

  updateTask(listId: string, taskId: string, title: string, tanggal:any, waktuMulai:string, waktuSelesai:string, ) {
    // We want to send a web request to update a list
    console.log(waktuMulai,'tgl');
    return this.webReqService.patch(`kapal/${listId}/tasks/${taskId}`, { title, tanggal, waktuMulai, waktuSelesai });
  }

  deleteTask(listId: string, taskId: string) {
    return this.webReqService.delete(`kapal/${listId}/tasks/${taskId}`);
  }

  deleteKapal(id: string) {
    return this.webReqService.delete(`kapal/${id}`);
  }

  getTasks(listId: string) {
    return this.webReqService.get(`kapal/${listId}/tasks`);
  }

  getTaskById(listId: string, taskId: string) {
    return this.webReqService.get(`kapal/${listId}/tasks/${taskId}`);
  }

  createTask(title: string, tanggal:string, waktuMulai:string, waktuSelesai:string, listId: string) {
    // we want to send a web request to create a task
    return this.webReqService.post(`kapal/${listId}/tasks`, { title, tanggal, waktuMulai, waktuSelesai })
  }

  complete(task:Task) {
    return this.webReqService.patch(`kapal/${task._listId}/tasks/${task._id}`,
    {
      completed: !task.completed
    })
  }
}
