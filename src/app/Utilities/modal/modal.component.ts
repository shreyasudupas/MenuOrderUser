import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
//import { ModalConfig } from 'src/app/Models/ModalConfig';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() my_modal_title:any;
  @Input() my_modal_content:any;

  
  //private modalRef: NgbModalRef;
  
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
