import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user:any =  {
    username: '',
    password: ''
  }

  constructor() { }

  ngOnInit() {
  }


  login(e:Event){};
}
