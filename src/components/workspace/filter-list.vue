<template>
  <div class="filter-list">
    <div class="title"><span>Filters</span> <i :class="{'el-icon-arrow-right':!show,'el-icon-arrow-down':show}" @click="show = !show"></i></div>
    <ul v-if="map" class="data-list" v-show="show">
      <li class="data-item" v-for="(data,name) in map" :key="name" @click="onFilterSelect(name)">{{name}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import DrawBoard from '@/components/draw-board'; // @ is an alias to /src
import TableViz from '@/components/viz/table/table-viz.vue';
import * as _ from 'lodash';
@Component({
  components: {},
})
export default class FilterList extends Vue {
  private show = false;
  get map() {
      return this.$store.state.workspace.filtersMap;
  }
  @Emit('onSelected')
  private onFilterSelect(name: string) {
  }
}
</script>
<style lang="scss" scoped>
.filter-list{
  border-bottom: 1px solid #999;
  .title{
    background: #999;
    color: #000;
    display: flex;
    justify-content: space-between;
  }
  ul.data-list{
    padding: 10px 5px;
    margin:0;
    li.data-item{
      list-style: none;
    }
  }
}
</style>
