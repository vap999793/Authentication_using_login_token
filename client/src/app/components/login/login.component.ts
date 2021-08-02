import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/registerModel';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  constructor(private fb:FormBuilder, private userService:UserService, private router:Router) { 

    this.loginForm = this.fb.group({
      email:'',
      password:''
    });
  }

  ngOnInit(): void {
  }

  login(loginForm : FormGroup){

    let loginCredentials = {
      email:loginForm.value.email,
      password:loginForm.value.password
    }



    console.log(loginCredentials);

    this.userService.userLogin(loginCredentials).subscribe((data)=>{
      if(data){
        console.log("Login ke baad ka data : ", data);
        localStorage.setItem("token", data.token);
        this.router.navigateByUrl('username');
        
      }
      else{
        console.log("Invalid Login Credentials");
        
      }
    });

  }
    
    
}


