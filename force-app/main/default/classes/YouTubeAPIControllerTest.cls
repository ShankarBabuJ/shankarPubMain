@isTest
public with sharing class YouTubeAPIControllerTest {
    @isTest
    public static void testYouTubeAPIController() {
        Test.setMock(HttpCalloutMock.class, new YouTubeAPIControllerHTTPMOCK());
        Map<String,Object> res = YouTubeAPIController.getYouTubeVideos('Salesforce');
        System.debug('res --'+res);
    }
}