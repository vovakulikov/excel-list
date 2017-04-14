import { Component} from '@angular/core';
import { getAnimationConfig } from '../router.animation';
@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  animations: [getAnimationConfig()],
  styleUrls: ['./wrapper.component.css'],
  host: {
    '[@openClose]': 'true',
    'style': 'display: block;'}
})
export class WrapperComponent {

  constructor() { }

}
