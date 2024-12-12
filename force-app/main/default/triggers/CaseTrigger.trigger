trigger CaseTrigger on Case (before update) {
    if(Trigger.IsUpdate && Trigger.IsBefore){
        RefactorTest.restrictChangeOwner(Trigger.new, Trigger.oldMap);
    }
}