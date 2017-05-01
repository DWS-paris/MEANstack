import { Component} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

// Désactiver le mode développement
// import {enableProdMode} from '@angular/core';
// enableProdMode();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  // Définition des animations
  animations: [
    trigger('header', [
      transition(':enter', [ style({opacity: '0', transform: 'translateY(-10px)'}), animate('.3s ease-out') ]),
      transition(':leave', [ style({opacity: '1', transform: 'translateY(0px)'})])
    ]),

    trigger('main', [
      transition(':enter', [ style({opacity: '0'}), animate('.7s .2s ease-out') ]),
      transition(':leave', [ style({opacity: '1'})])
    ]),

    trigger('footer', [
      transition(':enter', [ style({opacity: '0', transform: 'translateY(20px)'}), animate('.3s ease-out') ]),
      transition(':leave', [ style({opacity: '1', transform: 'translateY(0px)'})])
    ])
  ]
})
export class AppComponent {}
