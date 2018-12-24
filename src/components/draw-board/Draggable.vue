<template>
  <div
    class="draggable"
    :style="{
			top: position.y + 'px',
			left: position.x + 'px',
			width: position.width + 'px',
			height: position.height + 'px'
		}"
    @mousedown="e => drag(e)"
  >
    <div
      class="cursor cursor-left-top"
      style="cursor:nw-resize"
      @mousedown.stop="e => scale(e, 'left', 'top')"
    ></div>
    <div
      class="cursor cursor-center-top"
      style="cursor:n-resize"
      @mousedown.stop="e => scale(e, 'center', 'top')"
    ></div>
    <div
      class="cursor cursor-right-top"
      style="cursor:ne-resize"
      @mousedown.stop="e => scale(e, 'right', 'top')"
    ></div>

    <div
      class="cursor cursor-left-middle"
      style="cursor:w-resize"
      @mousedown.stop="e => scale(e, 'left', 'middle')"
    ></div>
    <div
      class="cursor cursor-right-middle"
      style="cursor:e-resize"
      @mousedown.stop="e => scale(e, 'right', 'middle')"
    ></div>

    <div
      class="cursor cursor-left-bottom"
      style="cursor:sw-resize"
      @mousedown.stop="e => scale(e, 'left', 'bottom')"
    ></div>
    <div
      class="cursor cursor-center-bottom"
      style="cursor:s-resize"
      @mousedown.stop="e => scale(e, 'center', 'bottom')"
    ></div>
    <div
      class="cursor cursor-right-bottom"
      style="cursor:se-resize"
      @mousedown.stop="e => scale(e, 'right', 'bottom')"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Rectangle, Point, Offset } from '.';
import * as _ from 'lodash';
type Horizon = 'left' | 'center' | 'right';
type Vertical = 'top' | 'middle' | 'bottom';
interface ScaleDirect {
  h: Horizon;
  v: Vertical;
}

function getOffset(event: MouseEvent, parent: Element): Offset {
  const offset = {
    x: event.offsetX,
    y: event.offsetY,
  };
  let el: HTMLElement | null = event.target as HTMLElement;
  while (el && el !== parent) {
    offset.x += el.offsetLeft;
    offset.y += el.offsetTop;
    el = el.parentElement;
  }
  return offset;
}
@Component({
  components: {},
})
export default class DraggableItem extends Vue {
  @Prop({ default: false, type: Boolean })
  public edit: boolean = false;

  /**
   * 0 : nothing
   * 1 : scale
   * 2 : drag
   */
  public dragFlag: 0 | 1 | 2;
  public scaleDirect: ScaleDirect | undefined;

  protected position: Rectangle;

  private $lastPosition: Rectangle | undefined;
  private $lastPoint: Point | undefined;
  constructor() {
    super();
    this.position = new Rectangle(10, 10, 100, 150);
    this.dragFlag = 0;
  }
  public drag(e: MouseEvent) {
    this.dragFlag = 2;
    this.$lastPoint = getOffset(e, this.$parent.$el);
  }
  public scale(e: MouseEvent, horizon: Horizon, vertical: Vertical) {
    e.preventDefault();
    this.dragFlag = 1;
    this.scaleDirect = {
      h: horizon,
      v: vertical,
    };
    this.$lastPosition = _.clone(this.position);
  }
  public onMouseMove(e: MouseEvent) {
    const offset = getOffset(e, this.$parent.$el);
    if (!this.dragFlag) {
      return;
    } else if (this.dragFlag === 1) {
      if (!this.scaleDirect) {
        return;
      }
      this.onScale(offset);
    } else {
      this.onDrag(offset);
    }
  }
  public onMouseUp(e: MouseEvent) {
    if (this.dragFlag) {
      this.dragFlag = 0;
      this.scaleDirect = undefined;
    }
  }

  public getPosition() {
    return this.position;
  }
  protected onDrag(offset: Offset) {
    if (this.$lastPoint) {
      const x = offset.x - this.$lastPoint.x;
      const y = offset.y - this.$lastPoint.y;
      this.position.x += x;
      this.position.y += y;
      this.$lastPoint = offset;
    }
  }
  protected onScale(offset: Offset) {
    if (!this.scaleDirect) {
      return;
    }
    const x = offset.x;
    const y = offset.y;
    // horizon
    if (this.scaleDirect.h === 'right') {
      this.position.width = x - this.position.x;
    } else if (this.scaleDirect.h === 'left') {
      const newWidth = this.position.width - (x - this.position.x);
      if (newWidth <= 10) {
        if (this.$lastPosition) {
          const maxX = this.$lastPosition.x + this.$lastPosition.width - 10;
          this.position.x = maxX;
          this.position.width = 10;
        } else {
          this.position.x +=
            this.position.width < 10 ? 0 : Math.abs(this.position.width - 10);
          this.position.width = 10;
        }
      } else {
        this.position.x = x;
        this.position.width = newWidth;
      }
    }
    // vertical
    if (this.scaleDirect.v === 'bottom') {
      this.position.height = y - this.position.y;
    } else if (this.scaleDirect.v === 'top') {
      const newHeight = this.position.height - (y - this.position.y);
      if (newHeight <= 20) {
        if (this.$lastPosition) {
          const maxY = this.$lastPosition.y + this.$lastPosition.height - 20;
          this.position.y = maxY;
          this.position.height = 20;
        } else {
          this.position.y +=
            this.position.height < 20 ? 0 : Math.abs(this.position.height - 20);
          this.position.height = 20;
        }
      } else {
        this.position.y = y;
        this.position.height = newHeight;
      }
    }
  }

}
</script>
<style lang="scss" scoped>
.draggable {
  position: absolute;
  min-width: 10px;
  min-height: 20px;
  border: 1px solid #999;
  cursor: move;
  .cursor {
    width: 3px;
    height: 3px;
    background-color: grey;
    position: absolute;
    &[class*="-left"] {
      left: 0;
    }
    &[class*="-center"] {
      left: 50%;
    }
    &[class*="-right"] {
      right: 0;
    }
    &[class*="-top"] {
      top: 0;
    }
    &[class*="-middle"] {
      top: 50%;
    }
    &[class*="-bottom"] {
      bottom: 0;
    }
  }
}
</style>
