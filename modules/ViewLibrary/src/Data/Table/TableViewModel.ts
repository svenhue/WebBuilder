import { computed, ref, Ref, toValue, watch } from 'vue';
import { ITableViewConfiguration } from './TableViewConfiguration.js';
import {BaseViewModel } from 'alphautils';


export class TableViewModel extends BaseViewModel{

    columns: Ref<Array<object>>;
    rows: Ref<Array<object>>
    selected: Ref<[] | object>
    rowKey: string;
    selection: string
    viewconfig: Ref<ITableViewConfiguration>
    rowsPerPageOptions: Ref<Array<number>>

    constructor(config: ITableViewConfiguration){
        super(toValue(config).contextid);
        this.initialize(toValue(config) as ITableViewConfiguration)

        // 
        // todo: only for development
        
        watch(config, (newVal: ITableViewConfiguration) => {
            this.viewconfig.value = newVal;
            if(newVal.content?.initialRows != this.GetRows().value){
                this.SetRows(newVal.content?.initialRows)
            }
            if(newVal.content?.columns != this.GetColumns().value && Array.isArray(newVal.content?.columns)){
                this.SetColumns(newVal.content?.columns)
            }
            this.rowsPerPageOptions.value = newVal.properties.rowsPerPageOptions ?? [5, 10, 25, 50, 100];
        },
        {

            deep: true  
        })
    }
    public initialize(config: ITableViewConfiguration){
        this.viewconfig = ref();
        this.viewconfig.value = config;

        this.columns = ref([]);
        this.rows = ref([]);
        this.selected = ref([]);

        if(config.content?.initialRows != undefined){
            this.SetRows(config.content.initialRows);
        }
        if(config.content?.columns != undefined){
            this.SetColumns(config.content.columns);
        }
        this.rowsPerPageOptions = ref(config.properties.rowsPerPageOptions ?? [5, 10, 25, 50, 100]);
    }
    public SelectRow(row: object){
        this.selected.value = [row];
    }
    public GetRows(){
        return computed(() => {
            if(this.viewconfig?.value?.dataConfig?.columndatasource != 'Auto' && this.columns.value.length == 0){
                return []
            }
            return this.rows.value;
        })
    }
    public GetColumns(){
        return computed(() => {
            if(this.viewconfig?.value?.dataConfig?.columndatasource == 'Auto' && this.rows.value.length > 0){
                
                return this.ComputedAutomaticColumns();
            }
            return this.columns.value?.sort(
                function(
                    a: {position: number, label: string; field: string; name: string; align: string}, 
                    b: { position: number, label: string; field: string; name: string; align: string})
                    { return a?.position - b?.position})
        })
    }
    public SetRows(rows: Array<object>){
        this.rows.value = rows;
    }
    public SetColumns(columns: Array<object>){
        this.columns.value = columns;
    }
    public GetSelected(){
        return computed(() => {
            return this.selected.value;
        })
    }
    public GetRowsPerPageOptions(){
        return computed(() => {
            return this.rowsPerPageOptions.value
        })
    }
    private ComputedAutomaticColumns(){
        const biggestRows = this.rows.value.reduce((a, b) => {
            return Object.keys(a).length > Object.keys(b).length ? a : b
        })

        return Object.keys(biggestRows).map(k => {
            return {
                label: k,
                field: k,
                name: k,
                align: 'left'
            }
        })?.sort(
            function(
                a: {position: number, label: string; field: string; name: string; align: string}, 
                b: { position: number, label: string; field: string; name: string; align: string})
                { return a?.position - b?.position})
    }
}