@isTest
public with sharing class PostalCodeAPITest {
    @isTest
    public static void postalCodeAPITest() {
        Test.setMock(HttpCalloutMock.class, new PostalCodeAPIHTTPMOCK());
        Map<String,String> inputResponse = new Map<String,String>();
        inputResponse.put('postalArea','Delhi');
        String response = PostalCodeAPIController.getPostalCodeDetails(JSON.serialize(inputResponse));
        PostalResponse postalRes = PostalResponse.parse(response);
        System.debug('postalRes --'+postalRes);
        System.assertEquals(postalRes.PostOffice[0].Circle, 'New Delhi');
    }
    @isTest
    public static void postalCodeAPITest2() {
        Test.setMock(HttpCalloutMock.class, new PostalCodeAPIHTTPMOCK());
        Map<String,String> inputResponse = new Map<String,String>();
        inputResponse.put('postalCode','110085');
        String response = PostalCodeAPIController.getPostalCodeDetails(JSON.serialize(inputResponse));
        PostalResponse postalRes = PostalResponse.parse(response);
        System.debug('postalRes @--'+postalRes);
        System.assertEquals(postalRes.PostOffice[0].District, 'Central Delhi');
    }
}