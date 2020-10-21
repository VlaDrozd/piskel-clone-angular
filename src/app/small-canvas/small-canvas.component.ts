import { Component, Input, ViewChild , ElementRef } from '@angular/core';

@Component({
  selector: 'app-small-canvas',
  templateUrl: './small-canvas.component.html',
  styleUrls: ['./small-canvas.component.scss']
})
export class SmallCanvasComponent {

  @ViewChild('canvas', {static: true}) canvas: ElementRef;

  @Input() imageData: ImageData;
  @Input() size: number;

  ngAfterViewInit(): void {
    let ctx = this.canvas.nativeElement.getContext('2d');
    ctx.fillStyle = '#bbbbbb';
    ctx.fillRect(0, 0, this.size, this.size);
    ctx.putImageData(this.imageData, 0, 0, 0, 0, this.size, this.size);
  }

}
