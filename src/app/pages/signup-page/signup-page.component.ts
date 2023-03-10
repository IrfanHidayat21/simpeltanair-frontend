import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  loadBtn: any = 1;
  errorMsg:any;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSignupButtonClicked(email: string, nahkoda:string, jumlahKru: number, kru:string, password: string) {
    this.loadBtn = 0;
    this.errorMsg = null;
    console.log(email, nahkoda, jumlahKru, kru, password);
    this.authService.signup(email, nahkoda, jumlahKru, kru, password).subscribe((res: HttpResponse<any>) => {
      if (res.status === 200) {
        // we have logged in successfully
        this.router.navigate(['/lists']);
        this.loadBtn = 1;
      }
    },
    error => {
      this.loadBtn = 1;
      this.errorMsg = "Harap mengisi semua data!";
      console.log(error);    
    })
  }

}
