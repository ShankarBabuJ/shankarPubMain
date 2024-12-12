import { LightningElement, track, api } from 'lwc';

export default class LightningMultiSelectPickList extends LightningElement {
    @api
    values = [];
    @track serialsListLoading = false;
    showdropdown = true;
    @api mode;
    @track selectedvalues = [];
    @track isSingleMode = false;

    connectedCallback(){
        this.serialsListLoading = true;
        var picklistOption = []
        this.serialsListLoading = true;
        if (this.values != undefined && this.values.length > 0) {
            for (var i = 0; i < this.values.length; i++) {
                if (this.values[i].selected) {
                    picklistOption.push({ label: this.values[i].label, value: this.values[i].value, selected: true })
                    this.selectedvalues.push(this.values[i].value);
                } else {
                    picklistOption.push({ label: this.values[i].label, value: this.values[i].value, selected: false })
                }
            }
        }
        this.values = picklistOption;
        console.log('this.values init', this.values);
        console.log('mode',this.mode);
        this.isSingleMode = (this.mode == 'S');
        this.serialsListLoading = false;
    }
    handleSelectedOption(event){
        this.handleClick(event);
    }
    handleClick(event) {
        if(this.mode == 'S'){
            console.log('called event S mode')
            console.log('event.details ***',event.detail.data.singleModeOptions);
            this.values = event.detail.data.singleModeOptions;
            this.selectedvalues = [];
            this.values.forEach(
                    element => {
                        if (element.selected) {
                            console.log(element.value);
                            this.selectedvalues.push(element.value);
                        }
                    }
                );
                const passEventr = new CustomEvent('fetchedvalue', {
                    detail: {
                        data: { selectedvalues: this.selectedvalues, picklistOptions: this.values},
                    }
                });
                this.dispatchEvent(passEventr);
        }else{
            if (this.template.querySelectorAll('c-lightning-pick-list-value') != undefined) {
                console.log('called click inside',this.template.querySelectorAll('c-lightning-pick-list-value'))
                this.selectedvalues = [];
                this.template.querySelectorAll('c-lightning-pick-list-value').forEach(
                    element => {
                        if (element.selected) {
                            console.log(element.value);
                            this.selectedvalues.push(element.value);
                        }
                    }
                );
                const passEventr = new CustomEvent('fetchedvalue', {
                    detail: {
                        data: { selectedvalues: this.selectedvalues, picklistOptions: this.template.querySelectorAll('c-lightning-pick-list-value')},
                    }
                });
                this.dispatchEvent(passEventr);
            }
        }
    }
}