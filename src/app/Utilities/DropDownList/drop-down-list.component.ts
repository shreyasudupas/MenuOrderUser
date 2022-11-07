import { HttpClient } from '@angular/common/http';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { map } from 'rxjs/operators';
import { dropdownApiRepsonse } from 'src/app/Models/dropdown-component/dropdown-api-response';

@Component({
    selector: 'drop-down-list',
    templateUrl: './drop-down-list.component.html',
    providers: [
        { 
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DropDownListComponent),
            multi: true
          }
    ]
})

export class DropDownListComponent implements ControlValueAccessor{
    @Input() options?:any;
    @Input() placeholderName:string;
    @Input() displayLabel:string;
    @Input() responseFromAPI?:string;
    dropDownSelectedValue:any;
    apiResponse:dropdownApiRepsonse[]=[];
    @Input() ReadOnly?:boolean=false;
    readOnlyDisplayValue:any;

    OnChange = (dropdownValue?:string)=>{};
    OnTouched = ()=>{};

    constructor(private client:HttpClient){ }

    ngOnInit(){

        if(this.responseFromAPI != null){
            this.client.get(this.responseFromAPI).pipe(map((data:any)=>{
                if(data.statusCode == 200){

                    data.content.forEach((element:any)=> {
                        let item:dropdownApiRepsonse = { label: element.label, value: element.value, code: element.code };
                        this.apiResponse.push(item);
                    });
                    return this.apiResponse;
                }else{
                    return new Error("Drop Down Error");
                }
            })).subscribe((result:any)=>{
                this.options = result; 
                if(this.dropDownSelectedValue != undefined || this.dropDownSelectedValue !=null){
                     if(this.displayLabel == "label"){
                        this.dropDownSelectedValue = this.options.find((x:any)=>this.dropDownSelectedValue == x.label);
                        this.readOnlyDisplayValue = this.dropDownSelectedValue.label;
                     }else if(this.displayLabel == "value"){
                        this.dropDownSelectedValue = this.options.find((x:any)=>this.dropDownSelectedValue == x.value);
                        this.readOnlyDisplayValue = this.dropDownSelectedValue.value;
                     }
                }
            })
        }
        
    }


    //when the form wants to set a value
    writeValue(value: any): void {
        if (value !== undefined && value!=null){
            //console.log(value);
            this.dropDownSelectedValue = {label:value,value:value,code:''}; //this value will set initially when during the api call when in API call we will re apear there

            // if(this.options != null){
            //     if(this.displayLabel == "label"){
            //         this.dropDownSelectedValue = this.options.find((x:any)=>this.dropDownSelectedValue.label == x.label);
            //      }else if(this.displayLabel == "value"){
            //         this.dropDownSelectedValue = this.options.find((x:any)=>this.dropDownSelectedValue.label == x.value);
            //      }
            // }
        }
        
    }
    //when you want to send the data from child compoenent to parent component
    registerOnChange(OnChange: any): void {
        this.OnChange = OnChange;
    }
    registerOnTouched(OnTouched: any): void {
        this.OnTouched = OnTouched;
    }

    sendDropDownValue?:string;
    SelectDropDownEvent(event:any){
        if(this.displayLabel == "label"){
            this.sendDropDownValue = this.dropDownSelectedValue.label;
        }else if(this.displayLabel == "value"){
            this.sendDropDownValue = this.dropDownSelectedValue.value;
        }
        this.dropDownSelectedValue = event;
        this.OnChange(this.sendDropDownValue);
        this.OnTouched();
    }
}