@isTest
public with sharing class LeadManagerTest {
    @isTest
    public static void testLeadManager() {
        LeadManager.createNewLead('Shankar', 'Babu', 'SBJ Corp', 'test@kpmg.com', '1234567789');
        LeadManager.createNewLead('Shankar', 'Babu', null, 'test@kpmg.com', '1234567789');
    }
}