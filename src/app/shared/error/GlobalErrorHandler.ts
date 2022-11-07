import { ErrorHandler, NgZone } from '@angular/core';
import { Injectable } from '@angular/core';
import { ModalService } from 'src/app/Services/ModalService.service';

@Injectable()

export class GlobalErrorHandler implements ErrorHandler {

    
    constructor(private Modal:ModalService,private ngZone:NgZone) {}

    handleError(error: any): void {
        //console.log(error);
        this.ngZone.run(()=>{
            
            this.Modal.openModal('Error',error.message);
        });
        
    }
    
}