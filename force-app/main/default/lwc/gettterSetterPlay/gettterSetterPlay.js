import { LightningElement, track } from 'lwc';

export default class GetterSetter extends LightningElement {
    currentClass = 'padding-around:small slds-m-top_small RedClass';
    displayColor;
    get colorOptions() {
        return [
            { label: 'Red', value: 'Red' },
            { label: 'Blue', value: 'Blue' },
            { label: 'Green', value: 'Green' }
        ];
    }
    get selectedColor(){
        return 'Red';
    }
    set selectedColor(val){
        this.displayColor = val;
        this.currentClass = `padding-around:small slds-m-top_small ${val}Class`
    }
    handleColorChange(event){
        this.selectedColor = event.target.value;
        console.log('color --',this.selectedColor)
    }
}