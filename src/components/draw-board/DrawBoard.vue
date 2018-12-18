<template>
  <div class="panel" @mousemove="mousemove" @mouseup="mouseup">
    <Draggable />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {EventBus, Draggable} from '.';
@Component({
  components: {
    Draggable,
  },
})
export default class DrawBoard extends Vue {
  public mousemove(e: MouseEvent) {
    const children = this.$children as any as Draggable[];
    const onDragItem = children.find((d: any) => d.dragFlag);
    if (onDragItem) {
      onDragItem.onMouseMove(e);
    }
  }
  public mouseup(e: MouseEvent) {
    const children = this.$children as any as Draggable[];
    const onDragItem = children.find((d: any) => d.dragFlag);
    if (onDragItem) {
      onDragItem.onMouseUp(e);
    }
  }
}
</script>
<style lang="scss" scoped>
.panel{
  border:1px solid;
  height: 800px;
  position: relative;
}
</style>

