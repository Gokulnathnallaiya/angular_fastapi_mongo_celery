import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../services/api.service';
import { DataSharingService } from '../services/datasharing.service';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './loginModal.component.html'
})
export class LoginModalContent {
  @Input() name: any;
  loginForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.required),
  })
  isError = false;
  errorMessage = "";
  isLoggingIn = false
  constructor(public activeModal: NgbActiveModal, private api: ApiService, private dataSharingService : DataSharingService) { }

  loginUser() {
    console.log(this.loginForm.value);
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched()
    } else {
      this.errorMessage = ""
      this.isLoggingIn = true
      this.api.loginUser(this.loginForm.value).subscribe(
        res => {
          this.isLoggingIn = false
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res));
           this.dataSharingService.isUserLoggedIn.next(true);
          this.activeModal.close();
          window.location.reload()
        }
        , err => {
          this.isError = true;
          this.isLoggingIn = false
          this.errorMessage = err.error.detail;
          console.log(err.error.detail)
        }
      )
    }
  }
}