import { animate, AnimationBuilder, style } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopService {

  renderer! : Renderer2;

  constructor( private _rendererFactory : RendererFactory2,
               @Inject(DOCUMENT) private document: Document,
               private animationBuilder: AnimationBuilder,
    ) {
    this.renderer = _rendererFactory.createRenderer(null, null);
   }

  onClic(event: MouseEvent, msg : string ){
    const div = this.renderer.createElement('div');
    div.innerHTML = msg;
    this.renderer.addClass(div, 'pop');
    this.renderer.setStyle(div, 'position', 'absolute');
    this.renderer.setStyle(div, 'left', event.clientX - 5 + 'px');
    this.renderer.setStyle(div, 'top', (event.clientY - 20) + 'px');
    this.renderer.setStyle(div, 'user-events', 'none');
    this.renderer.setStyle(div, 'pointer-events', 'none');
    this.renderer.setStyle(div, 'opacity', '0');
    this.document.body.appendChild(div);

    const animation = this.animationBuilder.build([
      style({opacity: 0, transform: 'translateY(100%)'}),
      animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(-300%)' })),
    ]);
    animation.create(div).play();
    setTimeout(() => {
      this.document.body.removeChild(div);
    }, 300);

  }

}
