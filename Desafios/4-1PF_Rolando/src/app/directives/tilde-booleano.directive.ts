import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appTildeBooleano]',
})
export class TildeBooleanoDirective implements OnInit {
  @Input('appTildeBooleano') admin!: boolean;

  constructor(private elemento: ElementRef) {}

  ngOnInit(): void {
    if (this.admin) {
      this.elemento.nativeElement.innerHTML = '<img src="../assets/tilde.png" style="width:16px; height:16px;">';
    }else{
      this.elemento.nativeElement.innerHTML = '<img src="../assets/cruz.png" style="width:16px; height:16px;">';
    }
  }

}
