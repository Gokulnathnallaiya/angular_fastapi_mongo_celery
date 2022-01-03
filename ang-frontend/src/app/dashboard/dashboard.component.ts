import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router'
import { FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

 
  mainForm = new FormGroup({
    path: new FormControl('', Validators.required)
  })
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }


  get path() { return this.mainForm.get('path'); }

  navigate(type: string) {
    if(!this.mainForm.valid)
    {
      this.mainForm.controls['path'].markAsTouched()
    }else {
      let data = {
        path: this.mainForm.value.path,
        queryType: type
      }
      this.router.navigate(['/view-dataset'], { state: data })
    }
  }

}
