import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallCanvasComponent } from './small-canvas.component';

describe('SmallCanvasComponent', () => {
  let component: SmallCanvasComponent;
  let fixture: ComponentFixture<SmallCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallCanvasComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
