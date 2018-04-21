import { Component } from '@angular/core';
import { ServicesApiService } from '../services/services-api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  tabIndex:number= 0;
  lostFormData:any={};
  selectedCategory:number=0;
  name:String="";
  email:String="";
  phone:String="";
  attachment:String="";
  description:String="";
  constructor(private services:ServicesApiService
  ){
	  
  }
  
  changeTab(index)
	  { 
		 this.tabIndex=index;
         this.selectedCategory=index; 		 
		 //alert(this.tabIndex);
	  }
	  
  onSubmit()
  {
	  var category;
	  if(this.selectedCategory==0)
	  {
		  category="lost";
	  }
	  else
	  {
		  category="found";
	  }
	  var data={"category":category,"name":this.name,"email":this.email,"attachment":this.attachment,
	  "description":this.description,"lostRcvDate":"08-04-2018"};
    this.lostFormData={"createdOn":new Date().toString(),"data":data};
    this.services.insertLostRecord(this.lostFormData).then((response)=>{
      if (response._body.code == 200)
	  {
		  alert("Post submitted successfully");
	  }
	  else
	  {
		 alert("Something went wrong.");
	  }
    });
	  
  }
	  
	  
}
