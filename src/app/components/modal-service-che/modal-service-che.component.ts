import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Datum } from '../../interfaces/kcdbChe.interface';

@Component({
  selector: 'app-modal-service-che',
  templateUrl: './modal-service-che.component.html',
  styleUrl: `./modal-service-che.component.css`
})
export class ModalServiceCheComponent {
  @Input() servicioData?:Datum;
  @Output() quitar = new EventEmitter<boolean>()

  @ViewChild("modalContainer") modal!: ElementRef<HTMLDialogElement>

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.modal.nativeElement.classList.add("show")
      this.modal.nativeElement.style.marginTop = "0px";
      this.modal.nativeElement.style.marginLeft = "0px";
      this.modal.nativeElement.style.marginLeft = "0px";
      this.modal.nativeElement.style.zIndex = "10000";
    },1)

    console.log(this.servicioData)
  }

  cerrar(){
    this.quitar.emit(true)
    this.modal.nativeElement.classList.remove("show")
  }
}
