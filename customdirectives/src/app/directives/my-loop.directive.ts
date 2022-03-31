import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appMyLoop]',
})
export class MyLoopDirective {
  constructor(
    private container: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  @Input('appMyLoop') set myCustomLoop(num: number) {
    for (let i = 0; i < num; i++) {
      this.container.createEmbeddedView(this.templateRef);
    }
  }
}
