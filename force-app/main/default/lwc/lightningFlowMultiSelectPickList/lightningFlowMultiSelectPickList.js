import { LightningElement, api, track } from 'lwc';

export default class LightningFlowMultiSelectPickList extends LightningElement {
    @track serialsListLoading = false;
    showdropdown = true;
    @api mode;
    @api selectedValues;
    @track isSingleMode = false;
    @api recordList = [];
    @api labelFieldAPIName;
    @api valueFieldAPIName;
    @track optionsList = [];

    connectedCallback() {
        if (this.recordList != undefined) {
            for (var i = 0; i < this.recordList.length; i++) {
                this.optionsList.push({ label: this.recordList[i][this.labelFieldAPIName], value: this.recordList[i][this.valueFieldAPIName], selected: false })
            }
        }
    }
    handleSelectedValues(event) {
        var selectedIds = event.detail.data.selectedvalues;
        this.selectedValues = '';
        if (selectedIds != undefined && selectedIds.length > 0) {
            for (var i = 0; i < selectedIds.length; i++) {
                if (i == 0) {
                    this.selectedValues = selectedIds[i];
                } else {
                    this.selectedValues = this.selectedValues + ';' + selectedIds[i];
                }
            }
        }
    }
}