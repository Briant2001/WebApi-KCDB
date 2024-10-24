import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Datum } from '../../interfaces/kcdbChe.interface';

@Component({
  selector: 'app-modal-service-che',
  templateUrl: './modal-service-che.component.html',
  styleUrl: `./modal-service-che.component.css`
})
export class ModalServiceCheComponent implements AfterViewInit, OnInit{
  ngOnInit(): void {
    if (this.servicioData) {
      if (this.servicioData.cmc) {
        if (this.servicioData.cmc.lowerLimit && this.servicioData.cmc.upperLimit) {
          if ((this.servicioData.cmc.lowerLimit/this.servicioData.cmc.upperLimit)==1) {
            this.servicioData.cmc.upperLimit = null;

          }else{

          }
        }
        if (this.servicioData.cmc.unit == "" || this.servicioData.cmc.unit == "(dimensionless)") {
          this.servicioData.cmc.unit = "(dimensionless)";
        }

      }
      if (this.servicioData.cmcUncertainty) {
        if (this.servicioData.cmcUncertainty.lowerLimit && this.servicioData.cmcUncertainty.upperLimit) {
          if ((this.servicioData.cmcUncertainty.lowerLimit/this.servicioData.cmcUncertainty.upperLimit)==1) {
            this.servicioData.cmcUncertainty.upperLimit = null;
          }else{

          }
        }
        if (this.servicioData.cmcUncertainty.unit == "" || this.servicioData.cmcUncertainty.unit == "(dimensionless)") {
          this.servicioData.cmcUncertainty.unit = "(dimensionless)";
        }

      }
      if (this.servicioData.crm) {
        if (this.servicioData.crm.lowerLimit && this.servicioData.crm.upperLimit) {
          if ((this.servicioData.crm.lowerLimit/this.servicioData.crm.upperLimit)==1) {
            this.servicioData.crm.upperLimit = null;
          }else{

          }
        }
        if (this.servicioData.crm.unit == "" || this.servicioData.crm.unit == "(dimensionless)") {
          this.servicioData.crm.unit = "(dimensionless)";
        }
      }
      if (this.servicioData.crmUncertainty) {
        if (this.servicioData.crmUncertainty.lowerLimit && this.servicioData.crmUncertainty.upperLimit) {
          if ((this.servicioData.crmUncertainty.lowerLimit/this.servicioData.crmUncertainty.upperLimit)==1) {
            this.servicioData.crmUncertainty.upperLimit = null;
          }else{

          }
        }
        if (this.servicioData.crmUncertainty.unit == "" || this.servicioData.crmUncertainty.unit == "(dimensionless)") {
          this.servicioData.crmUncertainty.unit = "(dimensionless)";

        }
      }
    }
  }
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



  }

  cerrar(){
    this.quitar.emit(true)
    this.modal.nativeElement.classList.remove("show")
  }


  click(event:Event){
    const div = event.target as HTMLDivElement;
    if (div.id == "large-modal-size-preview") {
      this.quitar.emit(true)
      this.modal.nativeElement.classList.remove("show")
    }
  }
}
