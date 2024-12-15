@isTest
public with sharing class YouTubeAPIControllerTest {
    @isTest
    public static void testYouTubeAPIController() {
        // YoutubeAPIKey__c customSetting = new YoutubeAPIKey__c(); 
        // customSetting.Key__c = 'TestSetting'; 
        // customSetting.Name = 'TestSetting';
        // insert customSetting;
        // System.debug('customSetting --'+customSetting);
        Test.setMock(HttpCalloutMock.class, new YouTubeAPIControllerHTTPMOCK());
        Map<String,Object> res = YouTubeAPIController.getYouTubeVideos('Salesforce');
        System.debug('res --'+res);
    }
}