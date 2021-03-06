import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  newUser:User={
  name:'',
  email:'',
  profile:'',
  location:'',
  password:'',
  file:'',


  }

  loginuser:Login={
    email:'',
    password:'',

  }


  constructor(private http:HttpClient,private router:Router) { }



  addnewuser(newuser:User){
      return this.http.post('/newUser',newuser);

  }
  login(verify:Login){
    return this.http.post('/auth',verify);
  }


  settoken(token:string){
    localStorage.setItem('token',token);
  }

  gettoken(){
    return localStorage.getItem('token');
  }
  removetoken(){
    localStorage.removeItem('token');
  }
  setUserId(id:string)
  {
     localStorage.setItem('userid',id);
  }
  getUseriId(){
     return localStorage.getItem('userid');
  }
  getselectedUser(id:string)
  {
    return this.http.get('/selecteduser/'+id);
  }

  deleteduser(id:String){
    return this.http.delete('/deleteduser/'+id);
  }
  updateuser(id:string,data:String){
    return this.http.put('/updateuser/'+id,data);
  }

  loginIn(){
    return localStorage.getItem('token')!=null;

  }


  logout(){
    return localStorage.removeItem('token');
  }
  //profile

Payload()
{
  var token=JSON.stringify(this.gettoken());
  var Payload=atob(token.split('.')[1]);

   return JSON.parse(Payload);

}

isLoggedIn()
  {
    var userpayload=this.Payload();
    if(userpayload)
    {
      return userpayload.exp>Date.now()/1000;
    }
    else
    {
      return null;
    }
  }

}


