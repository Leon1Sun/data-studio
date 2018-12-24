<template>
  <div class="home">
    <div class="left-nav">
      <SourceDataList @onSelected="onSrcDataSelected" :selected="currentSelect"/>
      <FilterList @onSelected="onFilterSelected" :selected="currentSelect"/>
    </div>
    
    <div class="main-container">
      <TableViz v-if="currentSelect && selectedData" :srcData="selectedData" />
      <div v-else>
        No Data Select
      </div>
    </div>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DrawBoard from '@/components/draw-board'; // @ is an alias to /src
import TableViz from '@/components/viz/table/table-viz.vue';
import { Selection } from '@/components/workspace/';
import SourceDataList from '@/components/workspace/source-data-list.vue';
import FilterList from '@/components/workspace/filter-list.vue';
import { SourceData } from '@/types/source-data';

@Component({
  components: {
    TableViz, SourceDataList, FilterList,
  },
})
export default class Home extends Vue {
  private currentSelect: Selection = {
    name: '',
    type: undefined,
  };
  private selectedData: SourceData | undefined = undefined;
  private onSrcDataSelected(name: string) {
    this.currentSelect.name = name;
    this.currentSelect.type = 'source';
    this.selectedData = this.$store.getters.sourceData(name);
  }
  private onFilterSelected(name: string) {
    this.currentSelect.name = name;
    this.currentSelect.type = 'filter';
    this.selectedData = this.$store.getters.sourceData(name);
  }
}
</script>
<style lang="scss" scoped>
.home{
  height: 100%;
  display: flex;
  .left-nav{
    width:200px;
    border: 1px solid #999;
  }
  .main-container{
    flex:1
  }
}
</style>

