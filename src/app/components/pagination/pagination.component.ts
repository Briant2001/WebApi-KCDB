import { AfterViewInit, Component, ElementRef, Input, Output, QueryList, ViewChild, ViewChildren, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

interface Items<T>{
  data:T[]
}
@Component({
  selector: 'shared-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, AfterViewInit, OnDestroy{

  public arrayCantidad:number[]=[];
  private currentElement?:HTMLElement;
  private previousElement?:HTMLElement;
  private value = -58;
  public onDebounce?:Subscription;

  @ViewChild("pagination") pagination!:ElementRef<HTMLElement>;
  @ViewChildren("items") items!:QueryList<ElementRef<HTMLElement>>;

  @Input() numberItems:number = 0;
  @Input() resetValueItems:Subject<boolean> = new Subject();

  @Output() itemSelected = new EventEmitter<number>;

  ngOnInit(): void {
    if (this.numberItems >= 0) {
      for (let index = 0; index < this.numberItems; index++) {
        this.arrayCantidad[index] =index;
      }

    }

    this.onDebounce =  this.resetValueItems.subscribe(isReset=>{
      if (isReset) {
        this.currentElement?.classList.toggle("pg")
        this.currentElement = this.items.first.nativeElement;
        this.currentElement.classList.toggle("pg");
        this.pagination.nativeElement.style.transform=`translateX(58px)`;
        this.value = -58;
      }
    })
  }

  ngAfterViewInit(): void {
    this.currentElement = this.items.first.nativeElement;
    this.currentElement.classList.add("pg")
    this.pagination.nativeElement.style.transform=`translateX(58px)`;
  }

  onSelected(event:Event){
    //Obtenemos el elemneto previo
    this.previousElement = this.currentElement;
    //Eliminamos clase al elemento anterior
    this.previousElement?.classList.remove("pg")

    //Obntenemos elemento selccionado
    this.currentElement = event.currentTarget as HTMLElement;
    //Agregamos clase.
    this.currentElement.classList.add("pg");
    const valueItem =  Number.parseInt(this.currentElement.lastChild?.textContent!)
    this.itemSelected.emit(valueItem);

    if (this.currentElement?.nextElementSibling == this.previousElement) {

      if (this.value <= 0) {
        this.pagination.nativeElement.style.transform=`translateX(58px)`;
        this.value=-58;
        this.previousElement = undefined
        return
      }

      this.pagination.nativeElement.style.transform=`translateX(-${this.value-=58}px)`;

    }else{
      if (this.currentElement != this.previousElement){
        this.pagination.nativeElement.style.transform=`translateX(-${this.value+=58}px)`;
      }
    }
  }


  next(){
    if (this.currentElement!.nextElementSibling) {
      this.currentElement?.classList.remove("pg");

      const nex = this.currentElement!.nextElementSibling as HTMLElement;
      nex.classList.toggle("pg");
      this.currentElement = nex;
      const valueItem =  Number.parseInt(this.currentElement.lastChild?.textContent!)
      this.itemSelected.emit(valueItem);

      if (this.value <= ( (this.items.length - 3) * 58)) {
          this.value+=58;
          this.pagination.nativeElement.style.transform=`translateX(-${this.value}px)`;
      }
    }
  }

  back(){
    if (this.currentElement!.previousElementSibling) {
      this.currentElement?.classList.remove("pg")
      const nex = this.currentElement!.previousElementSibling as HTMLElement;
      nex.classList.toggle("pg")
      this.currentElement = nex;
      const valueItem =  Number.parseInt(this.currentElement.lastChild?.textContent!)
      this.itemSelected.emit(valueItem);

      if (this.value >= 58) {
        this.value-=58
        this.pagination.nativeElement.style.transform=`translateX(-${this.value}px)`;
    }else{
      this.pagination.nativeElement.style.transform=`translateX(58px)`;
      this.value =-58;

    }
  }
}


  ngOnDestroy(): void {
    this.onDebounce?.unsubscribe()
  }
}
