import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalContent } from '../LoginModal/loginModal.component';
import { RegisterModalContent } from '../regiseterModal/registerModal.component';
import { DataSharingService } from '../services/datasharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn : boolean = false;
  name: string = "";
  email: string = "";
  constructor( private router : Router, private modalService: NgbModal, private dataSharingService: DataSharingService) { 
    this.dataSharingService.isUserLoggedIn.subscribe( value => {
            this.isUserLoggedIn = value;
    });
  }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.dataSharingService.isUserLoggedIn.next(true);
      let user: any = localStorage.getItem('user');
      user = JSON.parse(user);
      this.name = user.name;
      this.email = user.email;
      console.log(this)
    }
  }

  gotoRoute(route : string){
    this.router.navigate([route]);
  }

  openLoginModal() {
    const loginModalRef = this.modalService.open(LoginModalContent);
    loginModalRef.componentInstance.name = 'Login';
  }

  openRegisterModal() {
    const registerModalRef = this.modalService.open(RegisterModalContent);
    registerModalRef.componentInstance.name = 'Register';
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.dataSharingService.isUserLoggedIn.next(false);
    this.router.navigate(['/']);
    window.location.reload()
  }

}
