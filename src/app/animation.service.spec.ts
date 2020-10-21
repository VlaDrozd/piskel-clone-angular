import { TestBed } from '@angular/core/testing';
import { AnimationService } from './animation.service';

describe('AnimationService', () => {
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(AnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update current frame', () => {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    service.frames = ['ctx'];
    service.currentFrame = 0;
    expect(service.updateFrame(ctx.getImageData(0, 0, 1 ,1))).toEqual(ctx.getImageData(0, 0, 1, 1));
  });

});
