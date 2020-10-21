import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import gifshot from 'gifshot';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor(rendererFactory: RendererFactory2) {
    this.render = rendererFactory.createRenderer(null, null);
  }

  size: number = 64;
  currentFrame: number = 0;
  frames: any[] = [];
  speed: number = 24;
  resized: boolean = false;
  private render: Renderer2;

  changeSize(size: number): number {
    this.size = size;
    this.resized = true;
    setTimeout(() => {this.resized = false}, 100)
    return this.size;
  }

  changeCurrentFrame(i: number): number {
    this.currentFrame = i;
    let ctx = this.render.selectRootElement('.canvas').getContext('2d');
    ctx.putImageData(this.frames[this.currentFrame], 0, 0);
    return this.currentFrame;
  }

  updateFrame(newData: ImageData): ImageData {
    this.frames[this.currentFrame] = newData;
    return this.frames[this.currentFrame];
  }

  createGIF(): void {
    const imageFrames = [];
    const canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    canvas.width = this.size;
    canvas.height = this.size;
    canvas.style.imageRendering = 'pixelated';
    this.frames.forEach(frame => {
      ctx.putImageData(frame, 0, 0);
      imageFrames.push(canvas.toDataURL());
    });
    gifshot.createGIF({
      'images': imageFrames,
    }, function (obj) {
      if (!obj.error) {
        let image = obj.image, animatedImage = document.createElement('img');
        animatedImage.src = image;
        let link = document.createElement("a");
        link.setAttribute("href", image);
        link.setAttribute("download", 'gif.gif');
        link.click();
      }
    });
  }
}
