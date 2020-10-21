import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InstrumentsService } from '../instruments.service';
import { AnimationService } from '../animation.service'

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  constructor(private instrumentsService: InstrumentsService, private animation: AnimationService) {

  }

  @ViewChild('canvas', { static: true }) canvas: ElementRef;

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.fillStyle = '#bbbbbb';
    this.ctx.fillRect(0, 0, 2 ** this.size, 2 ** this.size);
    this.animation.frames = [this.ctx.getImageData(0, 0, 2 ** this.size, 2 ** this.size)];
  }

  ngAfterViewInit(): void {
    this.animation.changeCurrentFrame(0);
  }

  size: number = 6;
  ctx: CanvasRenderingContext2D;

  onDown(event: any): void {
    event.preventDefault();
    this.instrumentsService.getInstrument()(event, this.canvas.nativeElement);
  };

  update(): void {
    this.animation.updateFrame(this.ctx.getImageData(0, 0, 2 ** this.size, 2 ** this.size));
  }

  resize(): void {
    this.animation.changeSize(2 ** this.size);
    this.ctx.fillStyle = '#bbbbbb';
    this.ctx.fillRect(0, 0, 2 ** this.size, 2 ** this.size);
    this.ctx.putImageData(this.animation.frames[this.animation.currentFrame], 0, 0);
  }

  pow(): number {
    return Math.pow(2, this.size);
  }

}
