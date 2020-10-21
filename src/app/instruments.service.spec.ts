import { TestBed } from '@angular/core/testing';
import { InstrumentsService } from './instruments.service';

describe('InstrumentsService', () => {
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(InstrumentsService);
  });

  it('Must be created', () => {

    expect(service).toBeTruthy();
  });

  it('Must implement pensil correctly', () => {
    let event = {
      offsetX: 0,
      offsetY: 0,
    }
    const canvas = document.createElement('canvas');
    canvas.width = 10;
    canvas.height = 10;
    let ctx = canvas.getContext('2d');
    let oldCtx = ctx.getImageData(0, 0, 1, 1);
    service.setInstrument('pencil');
    service.getInstrument()(event, canvas);
    expect(ctx.getImageData(0, 0, 1, 1) == oldCtx).toBe(false);
  });

  it('Must implement line drawing correctly', () => {
    const canvas = document.createElement('canvas');
    let lastDot = {
      x: 0,
      y: 0
    }
    canvas.width = 10;
    canvas.height = 10;
    let ctx = canvas.getContext('2d');
    let oldCtx = ctx.getImageData(0, 0, 10, 10);
    expect(service.drawLine(5, 5, canvas, lastDot, '#000000').getImageData(0, 0, 10, 10)).not.toEqual(oldCtx);
  });

  it('Must return right HEX color', () => {
    let data: any = [255, 0, 0];
    expect(service.rgbToHex(data)).toBe('#FF0000');
    data = 'rgb(255, 0, 0)';
    expect(service.rgbToHex(data)).toBe('#FF0000');
  });

  it('Must return white color if data is incorrect', () => {
    let data: any = 'sadasdasdasda';
    expect(service.rgbToHex(data)).toBe('#FFFFFF');
    data = ['bbb', 'kkk', 'ccc'];
    expect(service.rgbToHex(data)).toBe('#FFFFFF');
    data = [255, 255, '255'];
    expect(service.rgbToHex(data)).toBe('#FFFFFF');
  });

  it('Must correctly implement shortcut change', () => {
    service.setShortcut('KeyP', 'pencil', 'KeyN');
    expect(service.shortcuts['KeyN']).toEqual({ instrument: 'pencil', key: 'N' });
  });

  it('Must corrctly change instrument', () => {
    expect(service.setInstrument('pencil')).toEqual('pencil');
  });

  it('Must corrctly change main color', () => {
    expect(service.setCurrentColor('#bbbbbb')).toEqual('#bbbbbb');
  });

  it('Must corrctly change second color', () => {
    expect(service.setSecondCOlor('#bbbbbb')).toEqual('#bbbbbb');
  });

  it('Must corrctly change brush size', () => {
    expect(service.setBrushSize(5)).toEqual(5);
  });



});
