import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as moment from 'moment/moment';
import {ChartFilterType, ChartType} from '../../models/interfaces/dashboard.interface';
import {ChartCustomFilter} from '../../models/api-models/Dashboard';
import {AppState} from '../../store';
import {RouterService} from '../../services/router.service';
import {Config} from '../../common';
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import {TBPlBsActions} from '../../actions/tl-pl/tl-pl.actions';
import * as _ from 'lodash';

@Component({
    selector: 'ns-tlpl-filter',
    moduleId: module.id,
    templateUrl: './tlpl-filter.component.html',
    styleUrls: ['./tlpl-filter.component.css']
})
export class TlplFilterComponent implements OnInit {
    public chartType: ChartType;
    public items: Array<{ text: string, selected: boolean, val: ChartFilterType }>;
    public showCustomFilterInputs: boolean = false;
    public customFilterObj: ChartCustomFilter;
    public selectedFilter: ChartFilterType = ChartFilterType.Custom;
    constructor(private routerExtensions: RouterService, private store: Store<AppState>,
        private params: ModalDialogParams, public _tlPlActions: TBPlBsActions) {

        this.items = [
            { val: ChartFilterType.ThisMonthToDate, text: 'This Month to Date', selected: false },
            { val: ChartFilterType.ThisQuarterToDate, text: 'This Quarter to Date', selected: false },
            { val: ChartFilterType.ThisFinancialYearToDate, text: 'This Financial Year to Date', selected: false },
            { val: ChartFilterType.ThisYearToDate, text: 'This Year to Date', selected: false },
            { val: ChartFilterType.LastMonth, text: 'Last Month', selected: false },
            { val: ChartFilterType.LastQuater, text: 'Last Quater', selected: false },
            { val: ChartFilterType.LastFiancialYear, text: 'Last Fiancial Year', selected: false },
            { val: ChartFilterType.LastYear, text: 'Last Year', selected: false },
            { val: ChartFilterType.Custom, text: 'Custom', selected: false },
        ];
        
        this.customFilterObj = new ChartCustomFilter();
    }

    ngOnInit() {
        // Config.IS_MOBILE_NATIVE && (this.activatedRouter as any).activatedRoute
        //     .switchMap(activatedRoute => activatedRoute.params)
        //     .subscribe((params) => {
        //         this.chartType = Number(params['chartType']) as ChartType;
        //     });
        this.store.select(s => s.tlPl).distinctUntilKeyChanged('tlplFilter').take(1).subscribe(s => {
            this.selectedFilter = s.tlplFilter;
            this.showCustomFilterInputs = s.tlplFilter === ChartFilterType.Custom;
            this.setSelectedItem(s.tlplFilter);
        });
        this.store.select(p => p.tlPl.tlplCustomFilter).take(1).subscribe(s => {
            (this.customFilterObj.activeYear.startDate as any) = moment(this.customFilterObj.activeYear.startDate, 'DD-MM-YYYY').toDate();
            (this.customFilterObj.activeYear.endDate  as any)= moment(this.customFilterObj.activeYear.endDate, 'DD-MM-YYYY').toDate();
            (this.customFilterObj.lastYear.startDate as any) = moment(this.customFilterObj.lastYear.startDate, 'DD-MM-YYYY').toDate();
            (this.customFilterObj.lastYear.endDate as any) = moment(this.customFilterObj.lastYear.endDate, 'DD-MM-YYYY').toDate();
            if(s.activeYear.startDate !== ''){
                (this.customFilterObj.activeYear.startDate as any) = moment(s.activeYear.startDate, 'DD-MM-YYYY').toDate();
                (this.customFilterObj.activeYear.endDate  as any)= moment(s.activeYear.endDate, 'DD-MM-YYYY').toDate();
                (this.customFilterObj.lastYear.startDate as any) = moment(s.lastYear.startDate, 'DD-MM-YYYY').toDate();
                (this.customFilterObj.lastYear.endDate as any) = moment(s.lastYear.endDate, 'DD-MM-YYYY').toDate();
            }
        });
        

    }

    onNavBtnTap() {
        Config.IS_MOBILE_NATIVE && (this.routerExtensions.router as any).backToPreviousPage();
    }

    changeCheckedRadio(item: { val: ChartFilterType, text: string, selected: boolean }) {
        this.showCustomFilterInputs = item.val === ChartFilterType.Custom;
        // this.showCustomFilterInputs = this.selectedFilter === ChartFilterType.Custom;
        this.selectedFilter = item.val;
        this.items.forEach(option => {
            option.selected = option.val === item.val;
            // option.text = `item.val`;
            console.log(option);
        });
        console.log(this.items);
    }

    saveAndClose() {
        let url: string;
        // let customFilterObj: any = this.customFilterObj;
        if (this.selectedFilter === ChartFilterType.Custom) {
            this.customFilterObj.activeYear.startDate = moment(this.customFilterObj.activeYear.startDate).format('DD-MM-YYYY');
            this.customFilterObj.activeYear.endDate = moment(this.customFilterObj.activeYear.endDate).format('DD-MM-YYYY');
            
            this.customFilterObj.lastYear.startDate = moment(this.customFilterObj.lastYear.startDate).format('DD-MM-YYYY');
            this.customFilterObj.lastYear.endDate = moment(this.customFilterObj.lastYear.endDate).format('DD-MM-YYYY');

        } else {
            this.customFilterObj = new ChartCustomFilter();
        }
        let item = this.items.find(f => f.selected);
        // let item = this.items.find(a => a.val === this.selectedFilter);
        // this.store.dispatch(this._tlPlActions.GetTrialBalance(_.cloneDeep(request)));
        this.store.dispatch(this._tlPlActions.setChartFilter(this.chartType, item.val, this.customFilterObj));
        this.params.closeCallback();
        // Config.IS_MOBILE_NATIVE && (this.routerExtensions.router as any).navigateByUrl(url, { clearHistory: true });
    }

    closeFilter(){
        this.params.closeCallback();
    }

    setSelectedItem(selVal) {
        this.showCustomFilterInputs = selVal === ChartFilterType.Custom;
        this.items.forEach(p => {
            if (p.val === selVal) {
                p.selected = true;
            }
        });
    }

    public openFromDatePicker(year: string = 'activeYear') {
        let ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
        const picker = new ModalPicker();
        picker.pickDate({
            title: "Select From Date",
            theme: "dark",
            maxDate: new Date(new Date().getFullYear(), 11, 31),
            startingDate: moment(this.customFilterObj[year].startDate, 'DD-MM-YYYY').toDate()
        }).then((result) => {
            let date = `${result.day}-${result.month}-${result.year}`
            this.customFilterObj[year].startDate = moment(date, 'DD-MM-YYYY').toDate();
            // console.log('==========================')
            // console.log('this.customFilterObj')
            // console.log(this.customFilterObj)
            // console.log('==========================')
        }).catch((error) => {
            // console.log("Error: " + JSON.stringify(error));
        });
    }

    public openToDatePicker(year: string = 'activeYear') {
        let ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
        const picker = new ModalPicker();
        picker.pickDate({
            title: "Select To Date",
            theme: "dark",
            maxDate: new Date(new Date().getFullYear(), 11, 31),
            startingDate: moment(this.customFilterObj[year].endDate, 'DD-MM-YYYY').toDate()
        }).then((result) => {
            let date = `${result.day}-${result.month}-${result.year}`
            this.customFilterObj[year].endDate = moment(date, 'DD-MM-YYYY').toDate();
        }).catch((error) => {
            // console.log("Error: " + JSON.stringify(error));
        });
    }
}
