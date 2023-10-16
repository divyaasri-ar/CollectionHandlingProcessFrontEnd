import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCardNumberFormat]'
})
export class CardNumberFormatDirective {

  // constructor(private el: ElementRef) {}

  // @HostListener('input', ['$event'])
  // onInput(event: any): void {
  //   const input = event.target.value.replace(/\s+/g, '').replace(/[^0-9]/g, '');
  //   if (input.length > 0) {
  //     event.target.value = input.match(new RegExp('.{1,4}', 'g')).join(' ');
  //   } else {
  //     event.target.value = '';
  //   }
  // }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let trimmedValue = inputElement.value.replace(/\s+/g, '').replace(/[^0-9]/g, '');
    if (trimmedValue.length > 16) {
      trimmedValue = trimmedValue.substr(0, 16);
    }
    if (trimmedValue.length > 0) {
      const matches = trimmedValue.match(new RegExp('.{1,4}', 'g'));
      if (matches) {
        const formattedValue = matches.join(' ');
        this.renderer.setProperty(inputElement, 'value', formattedValue);
      }
    } else {
      this.renderer.setProperty(inputElement, 'value', '');
    }
  }

}
