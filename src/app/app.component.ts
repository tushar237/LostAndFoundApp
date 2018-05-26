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
  image:any;
  constructor(private services:ServicesApiService
  ){
    this.title="Lost";
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
	  var data={"category":category,"name":this.name,"email":this.email,"attachment":this.image,
	  "description":this.description,"lostRcvDate":"08-04-2018"};
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
