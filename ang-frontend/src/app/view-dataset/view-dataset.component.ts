
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { DataSharingService } from '../services/datasharing.service';
import { LoginModalContent } from '../LoginModal/loginModal.component';

@Component({
  selector: 'app-view-dataset',
  templateUrl: './view-dataset.component.html',
  styleUrls: ['./view-dataset.component.scss']
})
export class ViewDatasetComponent implements OnInit {
  columns: string[] = []
  retrivedData: any[] = []
  isLoggedIn: boolean = false
  isLoading = false
  isSaving = false
  saveSuccess = false
  savingInProgress = false
  savingFailed = false
  constructor(private router: Router, private modalService: NgbModal, private api: ApiService, private dataSharingService: DataSharingService) {
    this.query = this.router.getCurrentNavigation()!.extras.state
    this.dataSharingService.isUserLoggedIn.subscribe(value => {
      this.isLoggedIn = value
    })
  }
  query: any = {}
  ngOnInit(): void {
    if (this.query) {
      this.isLoading = true
      this.api.fetchData(this.query).subscribe(res => {
        if (res) {
          this.isLoading = false
          this.columns = res.columns
          this.retrivedData = res.data
        }
      })

    } else {
      this.router.navigate(['/home'])
    }
  }

  checkTaskStatus(id: string) {

    this.api.getTaskStatus(id).subscribe(res => {
      console.log(res)
      if (res.status == 'PENDING') {
        this.checkTaskStatus(id)
      }
      else if (res.status == 'SUCCESS') {
        this.savingInProgress = false
        this.saveSuccess = true
        setTimeout(() => {
          this.saveSuccess = false
        }, 4000)
      }
      else if(res.status === 'FAILURE') {
        this.savingInProgress = false
         this.savingFailed = true
        setTimeout(() => {
          this.savingFailed = false
        }, 4000)
      }
      return
    })

  }

  saveData() {
    if (this.isLoggedIn) {
      this.isSaving = true
      this.api.saveQuery(this.query).subscribe(res => {
        if (res) {
          this.isSaving = false
          this.savingInProgress = true
          this.checkTaskStatus(res.message)
        }
      })
    }
    else {
      this.modalService.open(LoginModalContent);
    }
  }

}
