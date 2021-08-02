import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/registerModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registerForm:FormGroup;

  constructor(private fb:FormBuilder, private userService:UserService, private router:Router) {

    this.registerForm = this.fb.group({
      username: '',
      email: '',
      password: ''
    });
   }

  ngOnInit(): void {

    // this.registerForm = this.fb.group({
    //   username: 'Sammy',
    //   email: '',
    //   password: ''
    // });
  }

  register(registerForm : FormGroup){
    // console.log(registerForm);
    

    // console.log(registerForm.value);

    let registerUser:User = {
      username : registerForm.value.username,
      email : registerForm.value.email,
      password : registerForm.value.password
    }

    console.log(registerUser);
    

    this.userService.userPost(registerUser).subscribe((data)=>{
      if(data){
        console.log(data);
        this.router.navigateByUrl('login');
        
      }
      else{
        console.log("User didn't register!");
        
      }
    });

  }


}
