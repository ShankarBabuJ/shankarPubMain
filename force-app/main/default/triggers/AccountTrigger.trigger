trigger AccountTrigger on Account (after insert) {
    List<Update_Case_On_Account_Update__e> updateCaseOnAccountUpdate = new List<Update_Case_On_Account_Update__e>();
    if(Trigger.isAfter && Trigger.isInsert){
        for(Account acc : Trigger.new){
            if(acc.CustomerPriority__c == 'High'){
                Update_Case_On_Account_Update__e uconac = new Update_Case_On_Account_Update__e(Account_Id__c = acc.id);
                updateCaseOnAccountUpdate.add(uconac);
            }
        }
        if(updateCaseOnAccountUpdate.size() > 0){
            List<Database.SaveResult> saveResults = EventBus.publish(updateCaseOnAccountUpdate);
            for(Database.SaveResult sr : saveResults){
                if(sr.isSuccess()){
                    System.debug('Success event published');
                }else{
                    System.debug('Failed event not published');
                }
            }
        }
    }
}