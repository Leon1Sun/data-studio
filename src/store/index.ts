import Vue from 'vue';
import Vuex from 'vuex';
import workspace from './modules/workspace';
Vue.use(Vuex);
interface DataStudioStore {
    sourceData: any;
}
const store =  new Vuex.Store<DataStudioStore>({
    modules: {
        workspace,
    },
    strict: false,
});
export default store;
