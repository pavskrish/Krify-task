import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';    // local storage Module

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /*********Variables declaration start************/
  meetingUsers: any = [];
  allMeetingUsers: any;
  p: number = 1;
  config: any;
  searchText: any;

  /**********Variable declaration ends************/

  constructor(public localstorage: LocalStorage, private router: Router) {
    // Tocheck application is logged in or not...
    this.localstorage.getItem('isLoggein').subscribe((logedin: any) => {
      if (logedin === false) // if not logged go to login page...
      {
        this.router.navigate(['']);
      }
    })

    // to get meeting users details form local storage
    this.localstorage.getItem('meetingUsers').subscribe((users: any) => {
      // if users doesnot exists...
      if (users === null) {
        this.meetingUsers = [];
        this.allMeetingUsers = [];
      }
      else // if users exists...
      {
        this.meetingUsers = users;
        this.allMeetingUsers = users;
      }
    });

  }

  ngOnInit() {
  }


  /*********search data function**********/
  searchData() {
    // return found data..
    if (this.searchText && this.searchText.length > 2)  // search starts from user type 3rd letter...
    {
      this.meetingUsers = this.allMeetingUsers.filter((obj) => {
        var return_data;
        return_data = (obj.firstname.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1 || obj.lastname.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1 || obj.phone.indexOf(this.searchText) > -1 || obj.email.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1)
        return return_data;
      })
    }
    else {
      this.meetingUsers = this.allMeetingUsers
    }
  }

}
