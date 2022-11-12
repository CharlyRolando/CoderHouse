import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[soloNumeros]'
})
export class SoloNumerosDirective {

  constructor(private readonly elemento: ElementRef) { }

  @HostListener('input',['$event']) alCambiarElInput(event:Event): void{

      const soloNumeros = /[^0-9.]/g;
    const valor = this.elemento.nativeElement.value;
    var valorLimpio = valor.replace(soloNumeros, '');
    this.elemento.nativeElement.value = valorLimpio;

    if (valor !== this.elemento.nativeElement.value){
      event.stopPropagation();
    };


};


  validateDecimal(valor: any) {
    var RE = /^\d*\.?\d*$/;
    if (RE.test(valor)) {
        return true;
    } else {
        return false;
    }
}


//Para validar un número decimal con dos dígitos de precisión
validateDecimal2(valor: any) {
    var RE = /^\d*(\.\d{1})?\d{0,1}$/;
    if (RE.test(valor)) {
        return true;
    } else {
        return false;
    }
}


isCommaDecimalNumber(value:any) {
  return /^-?(?:\d+(?:,\d*)?)$/.test(value);
}


}
