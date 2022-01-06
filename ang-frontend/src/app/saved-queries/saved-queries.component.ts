import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DataSharingService } from '../services/datasharing.service';

@Component({
  selector: 'app-saved-queries',
  templateUrl: './saved-queries.component.html',
  styleUrls: ['./saved-queries.component.scss']
})
export class SavedQueriesComponent implements OnInit {

  savedQueries = []
  isUserLoggedIn : boolean = false;
  isLoading: boolean = false;

  constructor( private api : ApiService, private dataSharingService : DataSharingService) { 
    this.dataSharingService.isUserLoggedIn.subscribe( value => {
            this.isUserLoggedIn = value;
    });
    
  }

  ngOnInit(): void {
    if(this.isUserLoggedIn){
    this.api.getSavedQueries().subscribe(res => {
      this.savedQueries = res
      console.log(this.savedQueries)
    })
  }else {
    window.location.href = "/"
  }
  }

  download_file(filename:string){

    return "http://13.92.80.122:9000/blob/download/pdqueries/"+ filename
  }
   

}
