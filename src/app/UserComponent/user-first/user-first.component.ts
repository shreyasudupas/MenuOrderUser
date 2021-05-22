import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-first',
  templateUrl: './user-first.component.html',
  styleUrls: ['./user-first.component.css']
})
export class UserFirstComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var message ="hello";
  }

}
