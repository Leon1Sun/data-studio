import _ from 'lodash';
import {
    Column,
    Row,
    Dict,
    SourceDataBase,
    parseDictToSourceData,
} from './source-data-base';
type FilterOperation = '!==' | '===' | '<=' | '<' | '>=' | '>' | 'function';
interface Filter {
    column: string;
    operation: FilterOperation;
    value: ((...arg: any) => boolean) | string;
    expression?: (val: any) => any;
}
const filterRow = (row: Row, cols: Column[], filter: Filter): boolean => {
    const getValue = (input: string) => _.isNaN(input) ? input : parseInt(input, undefined);
    const columnIndex = cols.indexOf(filter.column);
    const rowData = row[columnIndex];
    if (columnIndex < 0 || rowData === undefined) {
        return false;
    } else {
        // operation == function
        if (filter.operation === 'function') {
            if (typeof filter.value !== 'function') {
                return false;
            } else {
                return filter.value(rowData);
            }
        } else {
            if (typeof filter.value === 'function') {
                return false;
            }
        }

        let result = false;
        const computedRowData = filter.expression ? filter.expression(rowData) : rowData;
        switch (filter.operation) {
            case '!==' :
                result = Boolean(getValue(computedRowData) !== getValue(filter.value));
                break;
            case '===' :
                result = Boolean(getValue(computedRowData) === getValue(filter.value));
                break;
            case '<=' :
                result = Boolean(getValue(computedRowData) <= getValue(filter.value));
                break;
            case '<' :
                result = Boolean(getValue(computedRowData) < getValue(filter.value));
                break;
            case '>=' :
                result = Boolean(getValue(computedRowData) >= getValue(filter.value));
                break;
            case '>' :
                result = Boolean(getValue(computedRowData) > getValue(filter.value));
                break;
        }
        return result;
    }
};
interface DataMetrics {
    metrics: string[];
    metricsOptions: string[];
}
interface DataFilters {
    filters: Filter[];
    filtersOption: string[];
}
class SourceData extends SourceDataBase implements DataMetrics, DataFilters {
    private $metrics: string[];
    private $filters: Filter[];
    constructor(data?: any[][], metrics?: string[], filters?: Filter[]) {
        super(data);
        const cols = this.getColumns();
        this.$filters = [];
        this.$metrics = [];
        this.metrics = metrics ? metrics : cols;
        this.filters = filters ? filters : [];
    }

    set metrics(metrics: string[]) {
        // validate metrics
        const cols = this.getColumns();
        const validMetrics = _.chain(metrics).filter((m: string) => cols.includes(m)).value();
        if (!validMetrics || validMetrics.length === 0) {
            this.$metrics = cols;
        } else {
            this.$metrics = validMetrics;
        }
    }
    get metrics() {
        return this.$metrics;
    }

    get metricsOptions() {
        return this.getColumns();
    }


    set filters(fts: Filter[]) {
        // validate cols
        const cols = this.getColumns();
        const validFilters = _.chain(fts).filter((filter: Filter) => cols.includes(filter.column)).value();
        this.$filters = validFilters;
    }

    get filters() {
        return this.$filters;
    }

    get filtersOption() {
        return this.getColumns();
    }

    get values(): Row[] {
        // filters
        const filters = this.$filters;
        const cols = this.getColumns();
        let rows = this.getRows();
        rows =  _.chain(rows).filter((row: Row) => {
            // const isMatch = _.find(filters, (f: Filter) => filterRow(row, cols, f));
            let isMatch = true;
            _.forEach(filters, (f: Filter) => {
                if (!filterRow(row, cols, f)) {
                    isMatch = false;
                }
            });
            return isMatch;
        }).value();

        // show only metrics
        if (!this.$metrics || this.$metrics.length === 0) {
            return rows;
        }
        const indexList = _.map(this.$metrics, (m: string) => cols.indexOf(m));
        return _.chain(rows).map((row: Row) => {
            return  _.map(indexList, (i: number) => row[i]);
        }).value();
    }

}
export {
    FilterOperation,
    Filter,
    SourceData,
};
