import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';
@Injectable() 
export class ServicesApiService {

  constructor(private http:Http) { }
  //rootUrl:string="https://192.168.0.115:8080";
  rootUrl:string="http://localhost:8080";
  constants:any={
	  "proxyUrl":"https://cors-anywhere.herokuapp.com/",
    "insertLostRecordUrl":this.rootUrl+"/LostNFound/report/lostandfound"
  }

  insertLostRecord(payload): any {
    var applyLeaveData;
    var url = this.constants.insertLostRecordUrl;
   /* const headersReq = new Headers();
    headersReq.append('Content-Type', 'application/json');
    headersReq.append('Access-Control-Allow-Origin','*');
    //headersReq.append('authentication', `hello`);
    const options = new RequestOptions({headers: headersReq});*/
    console.log(url +"##"+ JSON.stringify(payload));

    return new Promise(resolve => {
      this.http.post(url, payload)
        .subscribe(data => {
          applyLeaveData = JSON.parse(data["_body"]);
          resolve(applyLeaveData);
        }); 
    });
  }

}
