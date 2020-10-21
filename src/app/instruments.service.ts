import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstrumentsService {

  constructor() {
    document.onkeypress = (event: any) => {
      this.pickInstrumentByShortcut(event)
    };
  }

  private lastDot: any = null;
  private currentInstrument: string = 'stroke';
  private currentColor: string = '#000000';
  private secondColor: string = '#990000'
  private brushSize: number = 1;


  private instruments: object = {
    "pencil": (event: any, canvas: HTMLCanvasElement) => {
      const color = this.useColor(event.which);
      let ctx = canvas.getContext('2d');
      const offsetX = Math.floor(event.offsetX / (512 / canvas.width));
      const offsetY = Math.floor(event.offsetY / (512 / canvas.width));
      // if drawing is just beginning
      if (this.lastDot == null) {
        this.lastDot = {
          x: offsetX,
          y: offsetY,
        };
        ctx.fillStyle = this.currentColor;
        ctx.fillRect(this.lastDot.x, this.lastDot.y, this.brushSize, this.brushSize);
      } else {
        this.PensilDraw(offsetX, offsetY, color, canvas);
      }
      canvas.onmousemove = (e: any) => {
        this.instruments["pencil"](e, canvas);
      };
      document.onmouseup = () => {
        this.lastDot = null;
        canvas.onmousemove = () => false;
      };
    },

    "color-picker": (event: any, canvas: HTMLCanvasElement) => {
      let ctx = canvas.getContext('2d');
      let scale = 512 / canvas.width;
      const x = Math.floor(event.offsetX / scale);
      const y = Math.floor(event.offsetY / scale);
      if(event.which === 1) {
        this.setCurrentColor(this.rgbToHex(ctx.getImageData(x, y, 1, 1).data));
      }
      else {
        this.setSecondCOlor(this.rgbToHex(ctx.getImageData(x, y, 1, 1).data));
      }
    },

    "paint-bucket": (event: any, canvas: HTMLCanvasElement) => {
      const color = this.useColor(event.which);
      let ctx = canvas.getContext('2d');
      let scale = 512 / canvas.width;
      const x = Math.floor(event.offsetX / scale);
      const y = Math.floor(event.offsetY / scale);
      if (this.rgbToHex(ctx.getImageData(x, y, 1, 1).data)
        .toUpperCase() === this.currentColor.toUpperCase()) return;
      const oldColor = this.rgbToHex(ctx.getImageData(x, y, 1, 1).data);
      let point;
      const stack = [[x, y]];
      while (stack.length > 0) {
        point = stack.pop(); // takes cerrent pixel from stack
        ctx.fillStyle = color;
        ctx.fillRect(point[0], point[1], 1, 1);
        // cc takes color of neighbour pixel
        let cc = this.rgbToHex(ctx.getImageData(point[0], point[1] + 1, 1, 1).data);
        if (cc === oldColor && point[0] >= 0 && point[1] + 1 >= 0
          && point[0] < canvas.width && point[1] + 1 < canvas.height) {
          stack.push([point[0], point[1] + 1]);
        }
        cc = this.rgbToHex(ctx.getImageData(point[0] + 1, point[1], 1, 1).data);
        if (cc === oldColor && point[0] + 1 >= 0 && point[1] >= 0
          && point[0] + 1 < canvas.width && point[1] < canvas.height) {
          stack.push([point[0] + 1, point[1]]);
        }
        cc = this.rgbToHex(ctx.getImageData(point[0], point[1] - 1, 1, 1).data);
        if (cc === oldColor && point[0] >= 0 && point[1] - 1 >= 0
          && point[0] < canvas.width && point[1] - 1 < canvas.height) {
          stack.push([point[0], point[1] - 1]);
        }
        cc = this.rgbToHex(ctx.getImageData(point[0] - 1, point[1], 1, 1).data);
        if (cc === oldColor && point[0] - 1 >= 0 && point[1] >= 0
          && point[0] - 1 < canvas.width && point[1] < canvas.height) {
          stack.push([point[0] - 1, point[1]]);
        }
      }
    },

    'eraser': (event: any, canvas: HTMLCanvasElement) => {
      let ctx = canvas.getContext('2d');
      const offsetX = Math.floor(event.offsetX / (512 / canvas.width));
      const offsetY = Math.floor(event.offsetY / (512 / canvas.width));
      // if drawing is just beginning
      if (this.lastDot == null) {
        this.lastDot = {
          x: offsetX,
          y: offsetY,
        };
        ctx.fillStyle = '#bbbbbb';
        ctx.fillRect(this.lastDot.x, this.lastDot.y, this.brushSize, this.brushSize);
      } else {
        this.PensilDraw(offsetX, offsetY, '#bbbbbb', canvas);
      }
      canvas.onmousemove = (e: any) => {
        this.instruments["eraser"](e, canvas);
      };
      document.onmouseup = () => {
        this.lastDot = null;
        canvas.onmousemove = () => false;
      };
    },

    "stroke": (event: any, canvas: HTMLCanvasElement) => {
      const color = this.useColor(event.which);
      let ctx = canvas.getContext('2d');
      const offsetX = Math.floor(event.offsetX / (512 / canvas.width));
      const offsetY = Math.floor(event.offsetY / (512 / canvas.width));
      this.lastDot = {
        x: offsetX,
        y: offsetY,
      };
      let prev = ctx.getImageData(0, 0, canvas.width, canvas.width);
      canvas.onmousemove = (e: any) => {
        const X = Math.floor(e.offsetX / (512 / canvas.width));
        const Y = Math.floor(e.offsetY / (512 / canvas.width));
        ctx.putImageData(prev, 0, 0);
        this.drawLine(X, Y, canvas, this.lastDot, color);
      }
      document.onmouseup = () => {
        this.lastDot = null;
        canvas.onmousemove = () => false;
      };
    },

    "paint-all": (event: any, canvas: HTMLCanvasElement) => {
      let ctx = canvas.getContext('2d');
      let scale = 512 / canvas.width;
      const x = Math.floor(event.offsetX / scale);
      const y = Math.floor(event.offsetY / scale);
      ctx.fillStyle = this.useColor(event.which);;
      let changeIt = this.rgbToHex(ctx.getImageData(x, y, 1, 1).data);
      for (let i = 0; i < canvas.width; i++) {
        for (let j = 0; j < canvas.height; j++) {
          if (this.rgbToHex(ctx.getImageData(i, j, 1, 1).data)
            .toUpperCase() === changeIt) {
            ctx.fillRect(i, j, this.brushSize, this.brushSize);
          }
        }
      }
    }

  };

  useColor(code: number): string {
    if(code === 1) {
      return this.currentColor;
    }
    return this.secondColor;
  }

  getInstrument(): Function {
    return this.instruments[this.currentInstrument];
  };

  setInstrument(instrument: string): string {
    this.currentInstrument = instrument;
    return this.currentInstrument;
  };

  setBrushSize(size: number): number {
    this.brushSize = size;
    return this.brushSize;
  }

  setCurrentColor(color: string): string {
    this.currentColor = this.rgbToHex(color);
    return this.currentColor;
  }

  setSecondCOlor(color: string): string {
    this.secondColor = this.rgbToHex(color);
    return this.secondColor;
  }

  pickInstrumentByShortcut(event: any): void {
    if(event.code in this.shortcuts) {
      this.setInstrument(this.shortcuts[event.code].instrument);
    }
  }

  shortcuts: object = {
    'KeyP': { instrument: 'pencil', key: 'P'},
    'KeyS': { instrument: 'stroke', key: 'S'},
    'KeyF': { instrument: 'paint-bucket', key: 'F'},
    'KeyE': { instrument: 'eraser', key: 'E'},
    'KeyA': { instrument: 'paint-all', key: 'A'},
    'KeyC': { instrument: 'color-picker', key: 'C'},
  }

  getkeys(): object {
    return Object.keys(this.shortcuts);
  }

  setShortcut(key: string, instrument: string, newKey: string): void {
    delete this.shortcuts[key];
    this.shortcuts[newKey] = {instrument: instrument, key: newKey[newKey.length-1]};
    document.onkeypress = (event) => {
      this.pickInstrumentByShortcut(event)
    };
  }

  rgbToHex(data: any): string {
    if (data[0] === '#' && data.length === 7) return data; // if data is already hex
    if (data.toString() === data) { // if data is rgb(r, g, b);
      const newData = data.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
      if (newData && newData.length === 4) {
        const r = `0${parseInt(newData[1], 10).toString(16)}`.slice(-2);
        const g = `0${parseInt(newData[2], 10).toString(16)}`.slice(-2);
        const b = `0${parseInt(newData[3], 10).toString(16)}`.slice(-2);
        return `#${r}${g}${b}`.toUpperCase();
      }
      return '#FFFFFF';
    }
    // if data is array from canvas image data
    let red = data[0].toString(16);
    let green = data[1].toString(16);
    let blue = data[2].toString(16);

    if (red === data[0] || green === data[1] || blue === data[2]) return '#FFFFFF'; // data is incorrect

    if (red.length === 1) red = `0${red}`;
    if (green.length === 1) green = `0${green}`;
    if (blue.length === 1) blue = `0${blue}`;

    return `#${(red + green + blue)}`.toUpperCase();
  }

  PensilDraw(offsetX: any, offsetY: any, color: string, canvas: any): void {
    let ctx = canvas.getContext('2d');
    const dx = Math.abs(offsetX - this.lastDot.x);
    const dy = Math.abs(offsetY - this.lastDot.y);
    const sx = (this.lastDot.x < offsetX) ? 1 : -1;
    const sy = (this.lastDot.y < offsetY) ? 1 : -1;
    let err = dx - dy;
    while (true && this.lastDot.x >= 0 && this.lastDot.x < canvas.width
      && this.lastDot.y >= 0 && this.lastDot.y < canvas.width) {
      ctx.fillStyle = color;
      ctx.fillRect(this.lastDot.x, this.lastDot.y, this.brushSize, this.brushSize);
      if ((this.lastDot.x === offsetX) && (this.lastDot.y === offsetY)) break;
      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; this.lastDot.x += sx; }
      if (e2 < dx) { err += dx; this.lastDot.y += sy; }
    }
  };

  drawLine(offsetX: any, offsetY: any, canvas: any, oldLastDot: any, color: string): CanvasRenderingContext2D {
    let lastDot = {
      x: oldLastDot.x,
      y: oldLastDot.y
    };
    let ctx = canvas.getContext('2d');
    const dx = Math.abs(offsetX - lastDot.x);
    const dy = Math.abs(offsetY - lastDot.y);
    const sx = (lastDot.x < offsetX) ? 1 : -1;
    const sy = (lastDot.y < offsetY) ? 1 : -1;
    let err = dx - dy;
    while (true && lastDot.x >= 0 && lastDot.x < canvas.width
      && lastDot.y >= 0 && lastDot.y < canvas.width) {
      ctx.fillStyle = color;
      ctx.fillRect(lastDot.x, lastDot.y, this.brushSize, this.brushSize);
      if ((lastDot.x === offsetX) && (lastDot.y === offsetY)) break;
      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; lastDot.x += sx; }
      if (e2 < dx) { err += dx; lastDot.y += sy; }
    }
    return ctx;
  }
}
