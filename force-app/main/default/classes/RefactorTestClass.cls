@isTest
public with sharing class RefactorTestClass {
    @isTest
    public static void testRefactor() {
        Test.startTest();
        Account accountNew = new Account();
        accountNew.Name = 'Test Account';
        accountNew.Type = 'VIP';
        insert accountNew;
        Case caseNew = new Case();
        caseNew.Status = 'Working';
        caseNew.Origin = 'Phone';
        caseNew.IsEscalated = true;
        caseNew.Priority = 'High';
        caseNew.Subject = 'HELPP';
        caseNew.AccountId = accountNew.Id;
        insert caseNew;
        Case caseNew2 = new Case();
        caseNew2.Status = 'Working';
        caseNew2.Origin = 'Phone';
        caseNew2.IsEscalated = true;
        caseNew2.Priority = 'High';
        caseNew2.Subject = 'HELPP';
        caseNew2.AccountId = accountNew.Id;
        caseNew2.Priority = 'Low';
        insert caseNew2;
        caseNew.Subject = 'HELPP2';
        List<Case> updateCase = new List<Case>{caseNew2,caseNew};
        update updateCase;
        Test.stopTest();
    }
}