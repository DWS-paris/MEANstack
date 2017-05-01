import { Component} from '@angular/core';
import { AppTranslate } from '../../app.translate';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  // Définition des varaibles
    public appTitle = AppTranslate.APP_TITLE;
    public appSubTitle = AppTranslate.APP_SUBTITLE

}
