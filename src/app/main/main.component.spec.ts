import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { InstrumentsComponent } from '../instruments/instruments.component';
import { CanvasComponent } from '../canvas/canvas.component';
import { FramesComponent } from '../frames/frames.component';
import { PreviewComponent } from '../preview/preview.component';
import { FormsModule } from '@angular/forms';
import { SmallCanvasComponent } from '../small-canvas/small-canvas.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        MainComponent,
        InstrumentsComponent,
        CanvasComponent,
        FramesComponent,
        PreviewComponent,
        SmallCanvasComponent
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
