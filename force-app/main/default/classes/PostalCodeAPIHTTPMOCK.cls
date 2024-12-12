@isTest
public with sharing class PostalCodeAPIHTTPMOCK implements HttpCalloutMock  {
    public static HttpResponse respond(HTTPRequest request) {
        // Create a fake response
        HttpResponse response = new HttpResponse();
        response.setBody('{"Message":"Number of Post office(s) found: 21","Status":"Success","PostOffice":[{"Name":"Baroda House","Description":"","BranchType":"Sub Post Office","DeliveryStatus":"Non-Delivery","Circle":"New Delhi","District":"Central Delhi"}]}');
        response.setStatusCode(200);
        return response;
    }
}