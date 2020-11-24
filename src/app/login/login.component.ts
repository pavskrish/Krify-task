import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/***** I am using this module to store the values into localstorage**********/
import { LocalStorage } from '@ngx-pwa/local-storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /********Variable s declaration starts********** */
  loginForm: FormGroup;
  submitted = false;
  errorMsg: boolean;
  /**********Variables declarations ends***********/
  constructor(
    public localstorage: LocalStorage,
    public router: Router
  ) {
    /*********To set the admin detials in the local storage************/
    var userdata = { username: "admin", password: 'admin' }
    this.localstorage.setItem('adminData', userdata).subscribe(() => { });

    /********set the logging as false in the localstorage initially */
    this.localstorage.setItem('isLoggein', false).subscribe(() => { });

  }

  ngOnInit() {
    /******Create the login reactive form ***********/
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
  /***** function to return the reative form controls *******/
  get f() { return this.loginForm.controls; }

  /******Funciton to autheniticate the admin details********/
  submit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    /********get the localstorage values of admin details to verify the admin authentication***** */
    this.localstorage.getItem('adminData').subscribe((adminData: any) => {
      // To check admin username and password
      if (this.loginForm.value.username === adminData.username && this.loginForm.value.password === adminData.password) {
        this.localstorage.setItem('isLoggein', true).subscribe(() => { });
        this.router.navigate(['/home']);
      }
      else {
        /*******displaying error message  while form is invalid....*******/
        this.errorMsg = true;
        setTimeout(() => {
          this.errorMsg = false;
        }, 3000)
      }
    })
  }

}
