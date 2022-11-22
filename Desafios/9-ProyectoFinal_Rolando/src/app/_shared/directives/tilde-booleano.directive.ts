import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTildeBooleano]',
})
export class TildeBooleanoDirective implements OnInit {
  @Input('appTildeBooleano') admin!: boolean;

  constructor(private elemento: ElementRef) {}

  ngOnInit(): void {
    if (this.admin) {
      this.elemento.nativeElement.innerHTML = '<img src="assets/images/icons/tilde.png" style="width:16px; height:16px;">';
    }else{
      this.elemento.nativeElement.innerHTML = '<img src="assets/images/icons/cruz.png" style="width:16px; height:16px;">';
    }
  }

}
