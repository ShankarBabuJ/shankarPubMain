trigger UpdateCaseOnAccountUpdateSubscribe on Update_Case_On_Account_Update__e (after insert) {
    List<Case> casesToUpdate = new List<Case>();
    Set<Id> accountIds = new Set<Id>();
    for(Update_Case_On_Account_Update__e ucoau : Trigger.new){
        accountIds.add(ucoau.Account_Id__c);
    }
    List<Account> accountList = new List<Account>();
    if(accountIds.size() > 0){
        accountList = [SELECT CustomerPriority__c, (SELECT Priority FROM Cases) FROM Account WHERE Id IN :accountIds];
        for(Account acc :accountList){
            if(acc.CustomerPriority__c == 'High'){
                for(Case caseObj : acc.Cases){
                    caseObj.Priority = 'High';
                    casesToUpdate.add(caseObj);
                }
            }
        }
        if(casesToUpdate.size() > 0){
            update casesToUpdate;
        }
    }
}