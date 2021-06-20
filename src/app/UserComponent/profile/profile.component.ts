import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/Services/data-sharing.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private BroadcastService:DataSharingService) { }

  ngOnInit(): void {

    //set the active item to Profile
    this.BroadcastService.getActiveItem('Profile');
  }

}
