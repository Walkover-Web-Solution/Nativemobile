import {Component, Input, AfterViewInit} from '@angular/core';

@Component({
    selector: 'ns-pie-chart',
    moduleId: module.id,
    templateUrl: './pie-chart.component.html'
})
export class PieChartComponent implements AfterViewInit {
    @Input() maxPoint = 0;
    @Input() chartColor = 'blue';
    @Input() indicatorColor = 'green';
    @Input() chartBorderRadius = 0.1;
    @Input() chartBorderWidth = 0.1;

    constructor() {

    }

    ngAfterViewInit() {
        // this.toggle();
        // setInterval(this.toggle.bind(this), 2000);
    }

    public toggle() {
        this.maxPoint = Math.floor(Math.random() * 100);
    }
}
