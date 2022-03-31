import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMyStyles]',
})
export class MyStylesDirective {
  @Input() public fontSize!: string;

  constructor(private elRef: ElementRef) {
    elRef.nativeElement.style.color = 'red';
    elRef.nativeElement.style.backgroundColor = 'yellow';
    elRef.nativeElement.style.fontSize = '30px';
  }

  ngAfterViewinit(): void {
    this.elRef.nativeElement.style.fontSize = this.fontSize;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.elRef.nativeElement.style.backgroundColor = 'blue';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.elRef.nativeElement.style.backgroundColor = 'green';
  }
}
