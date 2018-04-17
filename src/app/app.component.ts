import { Component } from '@angular/core';


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
  constructor(
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
	  /*
	  {
	"createdOn": "07-04-2018",
	"data": {
		"category": "Lost",
		"name": "Chetan Chauhan",
		"email": "chetan.gitm@gmail.com",
		"attachment": "aadskjshjksahkjsahkjsakjashjkaskjdsa",
		"description": "Fossil watch is lost",
		"lostRcvDate": "07-04-2018"
	   }
      }
	  */
	  var data={"category":this.selectedCategory,"name":this.name,"email":this.email,"attachment":this.attachment,
	  "description":this.description,"lostRcvDate":"08-04-2018"};
	  this.lostFormData={"createdOn":new Date().toString(),"data":data};
	  alert(JSON.stringify(this.lostFormData));
  }
	  
	  
}
