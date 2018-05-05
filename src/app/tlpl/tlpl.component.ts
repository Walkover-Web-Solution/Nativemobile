import { Component } from "@angular/core";

@Component({
    selector: 'ns-tlpl',
    moduleId: module.id,
    templateUrl: './tlpl.component.html'
})
export class TlPlComponent {
    options = [
        'One',
        'Two',
        'Three'
       ];
}
