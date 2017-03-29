import { AfterViewChecked, AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

import { fabric } from 'fabric';

export type Mode = 'Arrow' | 'Draw' | 'Edit' | 'Text' | 'Pointer' | 'Pan';
export type Color = 'rgb(229,80,49)'| 'rgb(253,203,55)' | 'rgb(152,192,72)' | 'rgb(0,169,228)';

const Arrow = fabric.util.createClass(fabric.Line, fabric.Observable, {
  initialize: function(e, t) {
    this.callSuper('initialize', e, t);
    this.set({
      type: 'arrow'
    });
  },
  _render: function(e) {
    e.beginPath();
    const r = this.calcLinePoints();
    const headlen = 8 * (this.strokeWidth || 1);   // length of head in pixels
    const angle = Math.atan2(r.y2 - r.y1, r.x2 - r.x1);
    e.moveTo(r.x1, r.y1);
    e.lineTo(r.x2, r.y2);
    e.lineTo(r.x2 - headlen * Math.cos(angle - Math.PI / 6), r.y2 - headlen * Math.sin(angle - Math.PI / 6));
    e.moveTo(r.x2, r.y2);
    e.lineTo(r.x2 - headlen * Math.cos(angle + Math.PI / 6), r.y2 - headlen * Math.sin(angle + Math.PI / 6));

    e.lineWidth = this.strokeWidth;
    const s = e.strokeStyle;
    e.strokeStyle = this.stroke || e.fillStyle, this.stroke && this._renderStroke(e), e.strokeStyle = s
  },
  complexity: function() {
    return 2;
  }
});

Arrow.fromObject = function(e) {
  const n = [e.x1, e.y1, e.x2, e.y2];
  return new Arrow(n, e);
};

fabric.Arrow = Arrow;

@Directive({
  selector: 'zp-fabric'
})
export class FabricDirective implements AfterViewChecked, AfterViewInit, OnInit {


  @Output() added = new EventEmitter<any>();
  @Output() modified = new EventEmitter<any>();
  @Output() removed = new EventEmitter<any>();
  @Output() selected = new EventEmitter<any>();

  private _mode: Mode = 'Draw';
  private _color: Color = 'rgb(229,80,49)';
  private _images: Array<any> = [];
  private _objects: Array<any> = [];
  private canvas: any;
  private arrow: any;

  constructor(private el: ElementRef) {
    const element = document.createElement('canvas');
    this.el.nativeElement.appendChild(element);
    const canvas = new fabric.Canvas(element, {
        isDrawingMode: true,
        selection: false,
        stateful : true
    });

    this.canvas = canvas;

    this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
    this.canvas.freeDrawingBrush.color = this._color;
    this.canvas.freeDrawingBrush.width = 10;
    this.canvas.freeDrawingBrush.shadowBlur = 0;
    this.canvas.on('path:created', (event) => {
      // console.log('path:created', event);
    });
    this.canvas.on('object:added', (event) => {
      // console.log('object:added', event);

      this.added.emit(event.target);
    });
    this.canvas.on('object:modified', (event) => {
      // console.log('object:modified', event);

      this.modified.emit(event.target);
    });
    this.canvas.on('object:removed', (event) => {
      // console.log('object:removed', event);

      this.removed.emit(event.target);
    });
    this.canvas.on('object:selected', (event) => {
      // console.log('object:selected', event);

      this.selected.emit(event.target);
    });
    this.canvas.on('mouse:down', (event) => {
      // console.log('mouse:down', event);
      this.onCanvasMouseDown(event);
    });
    this.canvas.on('mouse:move', (event) => {
      // console.log('mouse:move', event);
      this.onCanvasMouseMove(event);
    });
    this.canvas.on('mouse:up', (event) => {
      // console.log('mouse:up', event);
      this.onCanvasMouseUp(event);
    });

    this.mode = this._mode;
  }

  @Input()
  set color(color: Color) {
    // Set new color
    this._color = color;
    // Update drawing color
    this.canvas.freeDrawingBrush.color = this._color;
  }

  get color(): Color {
    return this._color;
  }

  @Input()
  set images(images: Array<any>) {
    console.log('try to set images', images);
    // Set new images
    this._images = images;

    images.forEach((image) => {
      const url = URL.createObjectURL(image)
      fabric.Image.fromURL(url, (img) => {
        console.log('fabric image', img)
        this.canvas.add(img);
        /*
        this.canvas.backgroundImage = img;
        this.canvas.height = img.height;
        this.canvas.width = img.width;
        */
        this.canvas.renderAll();
      });
    });
  }

  get images(): Array<any> {
    return this._images;
  }

  @Input()
  set mode(mode: Mode) {
    // Disable old mode
    this[`on${this._mode}ModeDisabled`]();
    // Set new mode
    this._mode = mode;
    // Enable new mode
    this[`on${mode}ModeEnabled`]();
  }

  get mode(): Mode {
    return this._mode;
  }

  @Input()
  set objects(objects: Array<any>) {
    // Set new objects
    this._objects = objects;
    // Update drawing color
    this.canvas.loadFromJSON({
      objects
    }, () => {
      this.canvas.renderAll();
    });
  }

  get objects(): Array<any> {
    return this._objects;
  }

  @HostListener('window:resize', ['$event'])
  @HostListener('resize', ['$event'])
  protected onResize(event) {
    console.log('FabricDirective::onResize');
    console.log('FabricDirective::onResize', event);
    this.resize();
  }

  ngAfterViewChecked() {

  }

  ngAfterViewInit() {
    console.log('FabricDirective::ngAfterViewInit');

    this.resize();
  }

  ngOnInit() {
    console.log('FabricDirective::ngOnInit', fabric);
  }

  /***/
  /**
  /***/

  protected onEditModeEnabled() {
    console.log('FabricDirective::onEditModeEnabled');

    const canvas = this.canvas;

    canvas.selection = true;
    canvas.forEachObject((object) => {
      if (object['client:not-selectable']) {
        object.selectable = false;
      } else {
        object.selectable = true;
      }
    });
    canvas.renderAll();
  }

  protected onEditModeDisabled() {
    console.log('FabricDirective::onEditModeDisabled');

    const canvas = this.canvas;

    canvas.selection = false;
    canvas.forEachObject((object) => {
      object.selectable = false;
    });
    canvas.deactivateAll().renderAll();
  }

  protected onDrawModeEnabled() {
    console.log('FabricDirective::onDrawModeEnabled');

    const canvas = this.canvas;

    canvas.isDrawingMode = true;
    canvas.deactivateAll().renderAll();
  }

  protected onDrawModeDisabled() {
    console.log('FabricDirective::onDrawModeDisabled');

    const canvas = this.canvas;

    canvas.isDrawingMode = false;
  }

  protected onTextModeEnabled() {
    console.log('FabricDirective::onTextModeEnabled');

    const canvas = this.canvas;

    canvas.hoverCursor = 'text';
    canvas.defaultCursor = 'text';
    canvas.deactivateAll().renderAll();
  }

  protected onTextModeDisabled() {
    console.log('FabricDirective::onTextModeDisabled');

    const canvas = this.canvas;

    canvas.hoverCursor = 'move';
    canvas.defaultCursor = 'default';
  }

  protected onArrowModeEnabled() {
    console.log('FabricDirective::onArrowModeEnabled');
    /*
    console.debug('BoardView::onArrowModeEnabled');
    this.mCurrentMode = MODE_ARROW;
    this.$el.find('#board-action-mode-arrow').prop('checked', true);
    */
  }

  protected onArrowModeDisabled() {
    console.log('FabricDirective::onArrowModeDisabled');
    /*
    console.debug('BoardView::onArrowModeDisabled');
    this.$el.find('#board-action-mode-arrow').prop('checked', false);
    */
  }

  protected onPointerModeEnabled() {
    console.log('FabricDirective::onPointerModeEnabled');
    /*
    var pointer = this.createPointer(this.mBoardService.getUserId());
    this.draw.add(pointer);
    this.draw.renderAll();
    this.mBoardService.startPointer(this.pRoom, this.pId);
    */
  }

  protected onPointerModeDisabled() {
    console.log('FabricDirective::onPointerModeDisabled');
    /*
    var pointer = this.mPointers[this.mBoardService.getUserId()];

    //this.pointer.set('selectable', false);
    this.draw.remove(pointer);
    delete this.mPointers[this.mBoardService.getUserId()];
    // TODO Optimization
    this.draw.renderAll();
    this.mBoardService.stopPointer(this.pRoom, this.pId);
    */
  }

  protected onPanModeEnabled() {
    console.log('FabricDirective::onPanModeEnabled');
    /*
    console.debug('BoardView::onPanModeEnabled');
    this.mCurrentMode = MODE_PAN;
    //this.$el.find('.Board__Action--Mode:checked').prop('checked', false);
    this.$el.find('#board-action-mode-pan').prop('checked', true);

    this.draw.allowTouchScrolling  = true;
    this.draw.isDrawingMode = false;
    this.draw.perPixelTargetFind  = false;
    this.draw.selection  = false;
    this.draw.skipTargetFind = true;

    this.$el.find('.Board__Viewport')[0].style.cursor = "move";
    */
  }

  protected onPanModeDisabled() {
    console.log('FabricDirective::onPanModeDisabled');
    /*
    console.debug('BoardView::onPanModeDisabled');

    this.$el.find('#board-action-mode-pan').prop('checked', false);

    this.draw.allowTouchScrolling = false;
    this.draw.isDrawingMode = false;
    this.draw.perPixelTargetFind  = false;
    this.draw.selection  = false;
    this.draw.skipTargetFind = false;
    this.$el.find('.Board__Viewport')[0].style.cursor = "default";
    */
  }

  /***/
  /**
  /***/

  protected onCanvasMouseDown(event) {
    if ('Arrow' === this.mode) {
      const pointer = this.canvas.getPointer(event.e);
      const points = [ pointer.x, pointer.y, pointer.x, pointer.y ];
      this.arrow = new Arrow(points, {
        strokeWidth: 5,
        fill: this.canvas.freeDrawingBrush.color,
        stroke: this.canvas.freeDrawingBrush.color,
        originX: 'center',
        originY: 'center'
      });
      this.canvas.add(this.arrow);
    }
  }

  protected onCanvasMouseMove(event) {
    if ('Arrow' === this.mode) {
      if (this.arrow) {
        const pointer = this.canvas.getPointer(event.e);
        this.arrow.set({ x2: pointer.x, y2: pointer.y });
        // TODO Optimization
        this.canvas.renderAll();
      }
    }
  }

  protected onCanvasMouseUp(event) {
    if ('Arrow' === this.mode) {
      //this.onCanvasObjectModified(this.arrow);
      this.arrow = null;
    } else if ('Text' === this.mode) {
      const text = prompt('Enter text value...', 'Text');
      if (text) {
        const offsetX = event.e.offsetX - this.canvas.viewportTransform[4];
        const offsetY = event.e.offsetY - this.canvas.viewportTransform[5];
        const ratio = 1 / this.canvas.getZoom();
        const top = offsetY * ratio;
        const left = offsetX * ratio;
        const object = new fabric.Text(text, {
          selectable: false,
          left: left,
          top: top
        });

        object.setColor(this.canvas.freeDrawingBrush.color);

        this.canvas.add(object);
      }
    }
  }

  /***/
  /**
  /***/

  private resize(): void {
    const { clientHeight, clientWidth } = this.el.nativeElement;
    const canvas = this.canvas;

    canvas.setHeight(clientHeight);
    canvas.setWidth(clientWidth);
  }
}
