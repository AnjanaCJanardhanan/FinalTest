import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //declare variables
  loginForm!: FormGroup;
  isSubmitted: boolean = false;
  error: string='';

  loginUser?: User= new User();


  constructor(private formBuilder:FormBuilder,
     private authService: AuthService,
      private router: Router) { }

      //Life Cycle Hook
  ngOnInit(): void {
    //create  a reactive Form
    this.loginForm = this.formBuilder.group({

      userName: ['',[Validators.required]],
      password: ['',[Validators.required]]
    });
  }
  //get Controls for validation
  get formControls(){
    return this.loginForm.controls
  }

  //Functionality
  loginCredentials(): void{
    //setting value to isSubmitted
    this.isSubmitted=true;

    //Checking form is VALId
  
      //Checking form is VALId
      if(this.loginForm.invalid){
        this.error="Please enter User Name and password"
        return;

    }
    //Form  is VALID
    if(this.loginForm.valid){
      this.error="";
      console.log(this.loginForm.value);

      //checking login functionality
      this.authService.loginverify(this.loginForm.value)
      .subscribe(response =>{
        console.log(response);

        if(response==null){
          this.error="Invalid response";
        }
         if(response.data.role === 1){
          console.log("Admin");
          localStorage.setItem("USER_NAME",response.data.UserName);
          sessionStorage.setItem("USER_NAME",response.data.UserName);
          localStorage.setItem("ACCESS_ROLE",response.data.role);
          localStorage.setItem("JWT_UTIL",response.data.ACCESSTOKEN);
        this.router.navigate(["/auth/admin"]);
         }
         else if(response.data.role == 2){
          console.log("manager");
          localStorage.setItem("USER_NAME",response.data.UserName);
          sessionStorage.setItem("USER_NAME",response.data.UserName);
          localStorage.setItem("ACCESS_ROLE",response.data.role);
          localStorage.setItem("JWT_UTIL",response.data.ACCESSTOKEN);
        this.router.navigate(["/auth/manager"]);
         }
         else if(response.data.role == 3){
          console.log("HR");
          localStorage.setItem("USER_NAME",response.data.UserName);
          sessionStorage.setItem("USER_NAME",response.data.UserName);
          localStorage.setItem("ACCESS_ROLE",response.data.role);
          localStorage.setItem("JWT_UTIL",response.data.ACCESSTOKEN);
        this.router.navigate(["/auth/hr"]);
         }
        else{
          this.error="invalid username and password";
        }

  
      })
    }
}
}
