<template>
  <div class="table-container">
      <table>
          <tr>
              <th>index</th>
              <th v-for="col in cols" :key="col">{{col}}</th>
          </tr>
          <tbody v-for="(row,$i) in rows" :key="$i">
              <tr>
                  <td>{{$i}}</td>
                  <th v-for="ceil in row" :key="ceil">{{ceil}}</th>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { SourceData, Filter } from '@/types/source-data';

@Component({
  components: {
  },
})
export default class TableViz extends Vue {
    @Prop()
    public srcData!: SourceData;
    constructor() {
        super();
        // this.srcData = new SourceData(sampleData);
        // this.srcData.filters = filterSample;
        // console.log(this.srcData);
    }
    get cols() {
        return this.srcData.metrics;
    }
    get rows() {
        return this.srcData.values;
    }
}
</script>
