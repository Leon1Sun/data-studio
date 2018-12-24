import Vue from 'vue';
import { StoreOptions } from 'vuex';
import * as TYPE from '@/store/mutations/workspace';
import _ from 'lodash';
import { SourceData, Filter } from '@/types/source-data';
// sample
const sampleData = [
  ['buyer_count', 'visit', 'time', 'site'],
  ['13', '400', '2018', 'CN'],
  ['20', '888', '2017', 'CN'],
  ['5', '12', '2016', 'CN'],
  ['200', '3000', '2018', 'US'],
  ['125', '2344', '2017', 'US'],
  ['98', '1000', '2016', 'US'],
];
const sampleData1 = [
    ['pv', 'user', 'date'],
    ['13', 'A', '2018-12-24'],
    ['0', 'B', '2018-12-24'],
    ['21', 'A', '2018-12-23'],
    ['5', 'B', '2018-12-22'],
    ['2', 'A', '2018-12-22'],
    ['1', 'B', '2018-12-23'],
  ];
const filterSample: Filter[] = [{
  column: 'time',
  operation: '>=',
  value: '2017',
}];
const option: StoreOptions<any> = {
    state: {
        sourceDataMap: {
            buyer_visit: new SourceData(sampleData, [], []),
            pv: new SourceData(sampleData1, [], []),
        },
        filtersMap: {
            after2017: {
                column: 'time',
                operation: '>=',
                value: '2017',
              },
        },
    },
    mutations: {
        [TYPE.SET_SRC_DATA](state, {name, data}) {
            state.sourceDataMap[name] = data;
        },
    },
    getters: {
        sourceDataMap: (state: any) => {
            return state.sourceDataMap;
        },
        sourceData: (state: any) => {
            return (name: string) => state.sourceDataMap[name];
        },
        filtersMap: (state: any) => {
            return state.filtersMap;
        },
        filters: (state: any) => {
            return (name: string) => state.filters[name];
        },
    },
    actions: {
        setSrcData({ commit }, args ) {
            commit(TYPE.SET_SRC_DATA, args);
        },
    },
};
export default option;
