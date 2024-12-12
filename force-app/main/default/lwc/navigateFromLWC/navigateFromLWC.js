import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation'

export default class NavigateFromLWC extends NavigationMixin(LightningElement){
    navigateWithAura(){
        this[NavigationMixin.Navigate]({
            type: "standard__component",
            attributes: {
                componentName: "c__NavigateLWCToAura"
            }
        });
    }
    navigateWithoutAura(){
        let cmpdef = {
            componentDef: "c:navigateToLWC"
        }
        let encodeDef = btoa(JSON.stringify(cmpdef));
        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
                url: "one/one.app#"+encodeDef
            }
        });
    }
}