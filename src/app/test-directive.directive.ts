import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';

@Directive({
  selector: '[appTestDirective]'
})
export class TestDirectiveDirective {

  constructor(private element: ElementRef) { 
    console.log(element);
  }
}
