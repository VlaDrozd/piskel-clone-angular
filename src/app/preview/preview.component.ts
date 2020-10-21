import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AnimationService } from '../animation.service'


@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  constructor(private animation: AnimationService) { }

  @ViewChild('canvas', { static: true }) canvas: ElementRef;

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.animate();
  }

  currentFrame: number = 0;

  ctx: CanvasRenderingContext2D;

  animate() {
    setTimeout(() => {
      if (this.currentFrame > this.animation.frames.length - 1) {
        this.currentFrame = 0;
      }
      this.ctx.fillStyle = '#bbbbbb';
      this.ctx.fillRect(0, 0, this.animation.size, this.animation.size)
      this.ctx.putImageData(this.animation.frames[this.currentFrame], 0, 0);
      this.currentFrame += 1;
      this.animate();
    }, 1000 / this.animation.speed);
  }

}
