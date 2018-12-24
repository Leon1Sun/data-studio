import _ from 'lodash';
type Column = string;
type Row = any[];
interface Dict<T> { [K: string]: T; }
const parseDictToSourceData = (dict: Array<Dict<any>>): SourceDataBase => {
    if (dict.length === 0) {
        return new SourceDataBase();
    } else {
        const headDict = dict[0];
        const cols = _.keys(headDict);
        const rows = _.map(dict, (dictRow: Dict<any>) => _.map(dictRow));
        const data = [cols, ...rows];
        return new SourceDataBase(data);
    }
};
class SourceDataBase {
    protected cols: Column[] = [];
    protected rows: Row[] = [];

    constructor(data?: any[][]) {
        if (!data || data.length === 0) {
            this.cols = [];
            this.rows = [];
        } else {
            const colVal: any[] = data[0];
            this.cols = _.map(colVal, (c: any) => typeof c === 'string' ? c : c.toString());
            this.rows = _.slice(data, 1);
        }
    }
    public getColumns() {
        return this.cols;
    }
    public getRows() {
        return this.rows;
    }
}
export {
    Column,
    Row,
    Dict,
    SourceDataBase,
    parseDictToSourceData,
};
