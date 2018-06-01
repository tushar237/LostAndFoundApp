import { Component } from '@angular/core';
import { ServicesApiService } from '../services/services-api.service';
import {IMyDpOptions} from 'mydatepicker';


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
  image:any;
  selectedDate:any;
  showLoader:boolean;
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
};

// Initialized to specific date (09.10.2018).
public model: any ;
  constructor(private services:ServicesApiService
  ){
    this.title="Lost";
    var today=new Date();
    this.showLoader=false;
    this.selectedDate= { date: { year: today.getFullYear(), month: today.getMonth()+1, day:today.getDate() } };
  }

  
  onCategoryChange(e)
  {
    if(this.selectedCategory==0)
    {
      this.title="Lost";
    }
    else
    {
      this.title="Found";
    }
  }

  changeTab(index)
	  { 
		 this.tabIndex=index;
     this.selectedCategory=index; 		 
		 //alert(this.tabIndex);
	  }
	  
  onSubmit()
  {
    this.showLoader=true;
    var category;
    var createdOn;
	  if(this.selectedCategory==0)
	  {
		  category="lost";
	  }
	  else
	  {
		  category="found";
    }
    var today=new Date();
    createdOn=today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear();
    var lostRcvDate=this.selectedDate.date.day+"-"+this.selectedDate.date.month+"-"+this.selectedDate.date.year;
	  var data={"category":category,"name":this.name,"email":this.email,"attachment":this.image,
	  "description":this.description,"lostRcvDate":lostRcvDate};
    this.lostFormData={"createdOn":createdOn,"data":data};
    console.log(JSON.stringify(this.lostFormData));
    this.services.insertLostRecord(this.lostFormData).then((response)=>{
    
    if (response.code == 200)
	  {
      this.showLoader=false;
		  alert("Post submitted successfully");
	  }
	  else
	  {
      this.showLoader=false;
		 alert("Something went wrong.");
    }
    
    });
	  
  }

  
  
  changeListener(fileInput) {
    this.readThis(fileInput.target);
  }
  
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      //console.log(this.image);
    }
    
  }

	  
	  
}
