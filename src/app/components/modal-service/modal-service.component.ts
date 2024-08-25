import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Datum } from '../../interfaces/kcdb.models';

@Component({
  selector: 'app-modal-service',
  templateUrl: './modal-service.component.html',
  styles: ``
})
export class ModalServiceComponent implements AfterViewInit, OnInit {

  ngOnInit(): void {}

  @Input() servicioData?: Datum;
  @Output() quitar = new EventEmitter<boolean>()

  @ViewChild("modalContainer") modal!: ElementRef<HTMLDialogElement>

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.modal.nativeElement.classList.add("show")
      this.modal.nativeElement.style.marginTop = "0px";
      this.modal.nativeElement.style.marginLeft = "0px";
      this.modal.nativeElement.style.marginLeft = "0px";
      this.modal.nativeElement.style.zIndex = "10000";
    }, 1)

    console.log(this.servicioData)

  }

  cerrar() {
    this.quitar.emit(true)
    this.modal.nativeElement.classList.remove("show")
  }

}