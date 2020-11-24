import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { AppGlobals } from '../app.globals';
import { ActivatedRoute } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import *  as  codes from '../CountryCodes.json';   // import country code json
@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {
  /************** Variables declarations starts *************/

  meetingForm: FormGroup;
  countrycodes: any = (codes as any).default;
  submitted = false;
  errorMsg: boolean;
  meeting_id: any;
  createMeet: boolean;
  selected: any;
  meetingUsers: any = [];
  meeting_userId: any;
  editUser: any;
  @ViewChild("placesRef", { static: true }) placesRef: GooglePlaceDirective;

  /*************variables declaration ends****************/
  constructor(
    public localstorage: LocalStorage,
    public router: Router,
    public globals: AppGlobals,
    private _Activatedroute: ActivatedRoute
  ) {

    /*****this is for  get navigation parameter while edit the user*******/
    this.meeting_id = this._Activatedroute.snapshot.paramMap.get("id");
    if (this.meeting_id)
      this.createMeet = false
    else
      this.createMeet = true;

    /*********to check if user logged in or not***********/
    this.localstorage.getItem('isLoggein').subscribe((logedin: any) => {
      if (logedin === false) {
        this.router.navigate(['']);
      }
    });

    /********get meeting users  to update new users and updated users in the local storage********/
    this.localstorage.getItem('meetingUsers').subscribe((users: any) => {
      /***initially dont have any users then assign userid as 1 */
      if (users === null) {
        this.meetingUsers = [];
        this.meeting_userId = 1;
      }
      else {
        this.meetingUsers = users;
        var index = this.meetingUsers.length - 1;
        // to get the meeting user id for create new user...
        this.meeting_userId = this.meetingUsers[index].id + 1;

        // filter to get user  data by user id to edit the selected user.......
        this.editUser = this.meetingUsers.filter((obj) => {
          return obj.id == this.meeting_id
        })[0];
        if (!this.editUser && this.createMeet == false) // user not found in edit form then navigate to home page... not done any furthr action.
        {
          this.router.navigate(['/home']);
          alert("User not found")
        }
        this.setUpdateForm();  // call functin to assign edite user details...

      }

    });
  }
  get f() { return this.meetingForm.controls; }

  ngOnInit() {
    // initialize meeting form....
    this.meetingForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.pattern(this.globals.emailReg)]),
      countrycode: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(this.globals.phoneReg), Validators.maxLength(this.globals.PhoneMaxLength), Validators.minLength(this.globals.phoneMinLength)]),
      address: new FormControl('', [Validators.required]),
      meeting_time: new FormControl('', [Validators.required]),
    });

  }
  // added values to edit form
  setUpdateForm() {
    if (this.createMeet == false) {
      this.meetingForm.patchValue({
        firstname: this.editUser.firstname,
        lastname: this.editUser.lastname,
        email: this.editUser.email,
        countrycode: this.editUser.countrycode,
        phone: this.editUser.phone,
        address: this.editUser.address,
        meeting_time: this.editUser.meeting_time
      })
    }
  }
  // handle the value of address change from google location...
  public handleAddressChange(address: Address) {
    console.log(address)
  }

  // while select the option form country code dropdown...
  public onOptionsSelected(event) {
    const value = event.target.value;
    this.meetingForm.value.countrycode = value;
    this.selected = value;
  }

  /**********function to save new meeting for user******/
  saveMeeting() {
    this.submitted = true;
    /********cehck form is valid or not....******* */
    if (this.meetingForm.valid) {
      var formdata = this.meetingForm.value;
      /*****set the values for object********/
      var savedData = { id: this.meeting_userId, firstname: formdata.firstname, lastname: formdata.lastname, email: formdata.email, phone: formdata.phone, countryCode: formdata.countrycode, address: formdata.address, meeting_time: formdata.meeting_time }
      /*****push the form object to users Json array***** */
      this.meetingUsers.push(savedData);
      /*****Set total JSON array into local storage */
      this.localstorage.setItem('meetingUsers', this.meetingUsers).subscribe(() => {
        this.router.navigate(['/home']);  // navigate to home page...
      });
    }
    else {
      /*****Displaying error message while form is invalid***** */
      this.errorMsg = true;
      setTimeout(() => {
        this.errorMsg = false;
      }, 3000)
    }

  }
  /*******Update user meeting details************/
  updateMeeting() {
    this.submitted = true;
    /***********Check form Validation**********/
    if (this.meetingForm.valid) {
      var formdata = this.meetingForm.value;
      /*****set the values for object********/
      var savedData = { id: this.editUser.id, firstname: formdata.firstname, lastname: formdata.lastname, email: formdata.email, phone: formdata.phone, countryCode: formdata.countrycode, address: formdata.address, meeting_time: formdata.meeting_time }

      var index = this.meetingUsers.findIndex(x => x.id == this.editUser.id);   // get the index of the editing user.

      this.meetingUsers[index] = savedData;   // update the user object in users list...

      /****Set the JSON array to localstorage***********/
      this.localstorage.setItem('meetingUsers', this.meetingUsers).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
    else {
      // displaying error meessage for invalid form data.....
      this.errorMsg = true;
      setTimeout(() => {
        this.errorMsg = false;
      }, 3000)
    }
  }
}
