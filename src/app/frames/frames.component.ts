import { Component, SimpleChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AnimationService } from '../animation.service';

@Component({
  selector: 'app-frames',
  templateUrl: './frames.component.html',
  styleUrls: ['./frames.component.scss']
})
export class FramesComponent {
  constructor(private animation: AnimationService) { }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.animation.frames, event.previousIndex, event.currentIndex);
    this.animation.changeCurrentFrame(event.currentIndex);
  }

  addFrame(): void {
    let canvas = document.createElement('canvas');
    canvas.width = this.animation.size;
    canvas.height = this.animation.size;
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = '#bbbbbb';
    ctx.fillRect(0, 0, this.animation.size, this.animation.size);
    this.animation.frames.push(ctx.getImageData(0, 0, this.animation.size, this.animation.size));
  }

  copy(i: number): void {
    this.animation.frames.push(this.animation.frames[i]);
  }

  delete(i: number): void {
    if (this.animation.frames.length != 1) {
      this.animation.frames.splice(i, 1);
      this.animation.changeCurrentFrame(0);
    }
  }


  changeCurrentFrame(i: number): void {
    this.animation.changeCurrentFrame(i)
  }

}
