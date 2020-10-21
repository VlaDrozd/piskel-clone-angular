import { Component } from '@angular/core';
import { InstrumentsService } from '../instruments.service';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.scss']
})
export class InstrumentsComponent {

  constructor(private instrumentsService: InstrumentsService) { };

}
