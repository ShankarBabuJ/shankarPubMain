import { LightningElement, track, api } from 'lwc';

export default class LightningPickListValue extends LightningElement {
    
    @api
    selected = false;
    
    @api
    label;
    
    @api
    value;

    @api mode;

    @api values = [];


    handleSelect(event) {
        //this.selected = true;
        console.log('value inside picklistvalue comp',this.value);
        console.log('this.mode',this.mode);
        console.log('values',this.values);
        var singleModeOptions = [];
        if(this.mode == 'S'){
            if(this.values.length > 0){
                console.log('this.values.length',this.values.length)
                for(var i = 0; i < this.values.length; i++){
                    if(this.values[i].value == this.value){
                        singleModeOptions.push({ label: this.values[i].label, value: this.values[i].value, selected: true })
                    }else{
                        singleModeOptions.push({ label: this.values[i].label, value: this.values[i].value, selected: false })
                    }
                }
                console.log('values after processed',singleModeOptions);
                const passEventr = new CustomEvent('fetchedvalue', {
                    detail: {
                        data: { singleModeOptions: singleModeOptions},
                    }
                });
                console.log('passEventr.detail',passEventr.detail.data.singleModeOptions);
                this.dispatchEvent(passEventr);
            }           
        }else{
            if(this.selected){
                this.selected = false;
            }else{
                this.selected = true;
            } 
        }        
    }
}