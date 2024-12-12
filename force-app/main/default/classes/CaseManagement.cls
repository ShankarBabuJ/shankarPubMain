@RestResource(urlMapping='/Cases/*')
global with sharing class CaseManagement {
    @HttpGet
    global static List<Case> getCaseById() {
        RestRequest request = RestContext.request;
        System.debug('request --'+request);
        System.debug('request body--'+request.requestBody.toString());
        List<Case> result = new List<Case>();
    //    Map<String,Object> requestBodyMap = (Map<String,Object>) JSON.deserializeUntyped(request.requestBody.toString());
    //     String caseId = (String)requestBodyMap.get('caseId');
    //     if(caseId != null){
    //         result =  [SELECT CaseNumber,Subject,Status,Origin,Priority
    //         FROM Case WHERE Id = :caseId];
    //     }else{
    //         result =  [SELECT CaseNumber,Subject,Status,Origin,Priority
    //         FROM Case LIMIT 10];
    //     }
        result =  [SELECT CaseNumber,Subject,Status,Origin,Priority
        FROM Case LIMIT 10];
        System.debug('result --'+result);
        return result;
    }
    @HttpPost
    global static Case createCase() {
        RestRequest request = RestContext.request;
        System.debug('request --'+request);
        System.debug('request body--'+request.requestBody.toString());
        Map<String,Object> requestBodyMap = (Map<String,Object>) JSON.deserializeUntyped(request.requestBody.toString());
        String subject = (String)requestBodyMap.get('subject');
        String status = (String)requestBodyMap.get('status');
        String origin = (String)requestBodyMap.get('origin');
        String priority = (String)requestBodyMap.get('priority');
        Case thisCase = new Case(
            Subject=subject,
            Status=status,
            Origin=origin,
            Priority=priority);
        insert thisCase;
        return thisCase;
    }   
    @HttpDelete
    global static String deleteCase() {
        RestRequest request = RestContext.request;
        Map<String,Object> requestBodyMap = (Map<String,Object>) JSON.deserializeUntyped(request.requestBody.toString());
        String caseId = (String)requestBodyMap.get('caseId');
        Case thisCase = [SELECT Id FROM Case WHERE Id = :caseId];
        delete thisCase;
        return 'Record is deleted';
    }     
   /* @HttpPut
    global static ID upsertCase(String subject, String status,
        String origin, String priority, String id) {
        Case thisCase = new Case(
                Id=id,
                Subject=subject,
                Status=status,
                Origin=origin,
                Priority=priority);
        // Match case by Id, if present.
        // Otherwise, create new case.
        upsert thisCase;
        // Return the case ID.
        return thisCase.Id;
    }*/
    @HttpPatch
    global static Case updateCaseFields() {
        RestRequest request = RestContext.request;
        // Deserialize the JSON string into name-value pairs
        Map<String, Object> requestBodyMap = (Map<String, Object>)JSON.deserializeUntyped(request.requestbody.tostring());
        String caseId = (String)requestBodyMap.get('Id');
        Case thisCase = [SELECT Id FROM Case WHERE Id = :caseId];
        // Iterate through each parameter field and value
        for(String fieldName : requestBodyMap.keySet()) {
            // Set the field and value on the Case sObject
            thisCase.put(fieldName, requestBodyMap.get(fieldName));
        }
        update thisCase;
        return thisCase;
    }    
}