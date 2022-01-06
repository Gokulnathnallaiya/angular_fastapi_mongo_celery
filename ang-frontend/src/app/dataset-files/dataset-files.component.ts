import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dataset-files',
  templateUrl: './dataset-files.component.html',
  styleUrls: ['./dataset-files.component.scss']
})
export class DatasetFilesComponent implements OnInit {
  
  searchParams : any = ""
  searchResults = []
  isLoading: boolean = false
  constructor( private router : Router, private api: ApiService,private route : ActivatedRoute) { 

   
    
  }

   ngOnInit(): void {
     this.route.queryParamMap.subscribe((params:any) => {
       this.searchParams = params.params['datasetName']
       this.isLoading = true
       this.api.getDatasetFiles(this.searchParams).subscribe(res=>{
        this.isLoading = false
          if(res.message){
            this.searchResults = res.message
            console.log(res.message)
          }
        })
     });
   
  }

  navigate(fileName: string, queryType: string){

    let data = {
      datasetName : this.searchParams,
      fileName: fileName,
      queryType: queryType,
      path : "http://wwww.kaggle.com/"+this.searchParams
    }

    this.router.navigate([`kaggle/view-dataset`], {state: data})

  }

}
