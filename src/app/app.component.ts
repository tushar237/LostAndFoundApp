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
	  var category;
	  if(this.selectedCategory==0)
	  {
		  category="lost";
	  }
	  else
	  {
		  category="found";
    }
    var lostRcvDate=this.selectedDate.date.day+"-"+this.selectedDate.date.month+"-"+this.selectedDate.date.year;
    console.log(lostRcvDate);
	  var data={"category":category,"name":this.name,"email":this.email,"attachment":this.image,
	  "description":this.description,"lostRcvDate":lostRcvDate};
    this.lostFormData={"createdOn":new Date().toString(),"data":data};
    this.services.insertLostRecord(this.lostFormData).then((response)=>{
    console.log(JSON.stringify(response));;
    
    if (response.code == 200)
	  {
		  alert("Post submitted successfully");
	  }
	  else
	  {
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
