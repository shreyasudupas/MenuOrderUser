import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/shared/component/base-component';
import { DataSharingService } from 'src/app/Services/data-sharing.service';
import { MenuService } from 'src/app/Services/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItemGroup } from 'primeng/api';
import { environment as env} from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent<any> implements OnInit {
  
  subscription: Subscription;
  registerUserLocation:FormGroup;
  userLocality:string;
  locations: SelectItemGroup[]=[];

  constructor(public _menuService:MenuService
    ,public httpclient:HttpClient
    ,public activatedRoute:ActivatedRoute
    ,private formBuilder:FormBuilder
    ,private broadcastService:DataSharingService
    ,private router: Router) {
    super(_menuService,httpclient,broadcastService);
    
  }

  ngOnInit(): void {

    this.componentName = this.activatedRoute.snapshot.routeConfig?.component?.name;
    this.versionUrl = env.auth.idpAuthority + '/api/utility';
    this.action = "getAllCities"; 

    this.Initilize();

    //Get Location dropdown values from backend based on active address in IDS user form
    this.GetItem(null).subscribe((result:any)=>{
      debugger
      this.locations = result;

      // //Once the API is called add the active location of user in form
      // this.registerUserLocation.patchValue({
      //   locality:this.userLocality
      // });
    })

    // this.broadcastService.getUserLocality().subscribe(result=> {
    //     this.userLocality = result;
    // });

    // console.log('location get:'+ this.userLocality);

    //get user location
    // this.broadcastService.getCurrentUserInfo().subscribe(user=>{
    //   //debugger
    //   //console.log(user);
    //   if(user.address !== undefined){
    //     let userAddress = user.address.find(a=>a.isActive == true);

    //     if(userAddress.)
    //   }
    // });

    this.registerUserLocation = this.formBuilder.group({
      locality: [this.userLocality,Validators.required]
    });
  }

  //form submit
  onSubmit(){

    if(this.registerUserLocation.valid){
     //console.log(this.registerUserLocation.value);

      this.broadcastService.updateUserLocality(this.registerUserLocation.value.locality);

      //navigate to Vendor
      this.router.navigate(['user','vendorlist']);
    }
  }

  ngOnDestroy(){
    console.log("Home destroyed");
  }

}
