import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTemaTitulos]'
})
export class TemaTitulosDirective implements OnInit{

  constructor(
    private elemento: ElementRef,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.renderer.setStyle(this.elemento.nativeElement, 'font-size', '20px');
    this.renderer.setStyle(this.elemento.nativeElement, 'margin-left', '40px');
    this.renderer.setStyle(this.elemento.nativeElement, 'font-weight', '600');
    this.renderer.setStyle(this.elemento.nativeElement, 'color', '#000000');
  }

}
