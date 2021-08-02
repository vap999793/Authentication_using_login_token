import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  username = '';

  constructor(private userService:UserService, private router:Router) { 
    this.userService.getUsername().subscribe(
      (data)=>{
        this.username = data.username,
        console.log("username ka data : ", data);
        
      },
      error=>this.router.navigateByUrl('login')
    )
  }

  ngOnInit(): void {
  }

}
