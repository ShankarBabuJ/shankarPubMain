public with sharing class PostalCodeAPIController {
    public class PostalCodeAPIControllerException extends Exception{}

    @AuraEnabled
    public static String getPostalCodeDetails(String inputParams){
        try {
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            Map<String,Object> inputMap = (Map<String,Object>) JSON.deserializeUntyped(inputParams);
            String postalCode = (String)inputMap.get('postalCode');
            String postalArea = (String)inputMap.get('postalArea');
            // System.debug('postalCode --'+postalCode);
            // System.debug('postalArea --'+postalArea);
            if(!String.isBlank(postalCode)){
                request.setEndpoint('callout:PostalCode/pincode/'+postalCode);
            }
            if(!String.isBlank(postalArea)){
                request.setEndpoint('callout:PostalCode/postoffice/'+postalArea);
            }
            request.setMethod('GET');
            HttpResponse response = http.send(request);
            // System.debug('response --'+response);
            // System.debug('response body--'+response.getBody());
            return response.getBody();
        }catch(Exception ex){
            throw new PostalCodeAPIControllerException(ex.getMessage());
        }
    }
}