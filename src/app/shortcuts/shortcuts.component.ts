import { Component, OnInit } from '@angular/core';
import { InstrumentsService } from '../instruments.service'

@Component({
  selector: 'app-shortcuts',
  templateUrl: './shortcuts.component.html',
  styleUrls: ['./shortcuts.component.scss']
})
export class ShortcutsComponent {

  constructor(private instruments: InstrumentsService) { }

  changing: string;

  changeKey(key: string, instrument: string): void {
    this.changing = key;
    document.onkeypress = (event) => {
      console.log('press');
      if (!(event.code in this.instruments.shortcuts) && event.key.length == 1) {
        document.onkeypress = null;
        this.instruments.setShortcut(key, instrument, event.code);
      }
      else {
        alert('Already in use');
      }
    }
  }
}
