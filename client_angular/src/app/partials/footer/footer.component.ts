import { Component} from '@angular/core';
import { AppTranslate } from '../../app.translate';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  // Définition des variables
    public footer = AppTranslate.FOOTER;

}
