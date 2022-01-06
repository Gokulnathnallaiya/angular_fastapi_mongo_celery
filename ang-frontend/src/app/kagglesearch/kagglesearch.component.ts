import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router'
import { FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-kagglesearch',
  templateUrl: './kagglesearch.component.html',
  styleUrls: ['./kagglesearch.component.scss']
})
export class KagglesearchComponent implements OnInit {

    searchForm = new FormGroup({
    path: new FormControl('', Validators.required)
  })
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }


  get path() { return this.searchForm.get('path'); }

  navigate() {
    
    if(!this.searchForm.valid)
    {
      this.searchForm.controls['path'].markAsTouched()
    }else {

      let dataset = this.searchForm.value.path
      console.log(dataset)
      this.router.navigate([`search-results/${dataset}`])
    }
  }

}
