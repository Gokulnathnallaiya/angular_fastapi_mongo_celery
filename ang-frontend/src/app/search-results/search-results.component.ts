import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  searchParams = ""
  searchResults = []
  isLoading:boolean = false

  constructor( private route : ActivatedRoute, private api: ApiService, private router : Router) { }

  ngOnInit(): void {
    
    this.route.params.subscribe(paramsId=> {
        this.searchParams = paramsId['search']
        this.isLoading = true
        this.api.getKaggleDatasetList(this.searchParams).subscribe(res=>{
          this.isLoading = false
          if(res.message){
            this.searchResults = res.message
            console.log(res.message)
          }
        })
    });
  }


  navigate(result: any){
    let datasetName = result['ref']
    console.log(datasetName)
    this.router.navigate([`dataset-files`], {queryParams : {datasetName: datasetName}})

  }

  

}
