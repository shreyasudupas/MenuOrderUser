import {Injectable, Injector} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../Utilities/modal/modal.component';

@Injectable({
    'providedIn':'root'
})

export class ModalService{
    private modalService: NgbModal;

    constructor(private injector: Injector) {
    }

    openModal(title:string,body:string) {
        this.modalService = this.injector.get(NgbModal);
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.my_modal_title = title;
        modalRef.componentInstance.my_modal_content = body;
      }
}