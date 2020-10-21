import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FramesComponent } from './frames.component';
import { FormsModule } from '@angular/forms';
import { SmallCanvasComponent } from '../small-canvas/small-canvas.component';

describe('FramesComponent', () => {
  let component: FramesComponent;
  let fixture: ComponentFixture<FramesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FramesComponent, SmallCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FramesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
