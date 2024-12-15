@isTest
public with sharing class WeatherAPITest {
    @isTest
    public static void WeatherAPITest() {
        Test.setMock(HttpCalloutMock.class, new YouTubeAPIControllerHTTPMOCK());
        Map<String,Object> params = new Map<String, Object>();
        params.put('latitude','28.731143');
        params.put('longitude','77.096291');
        Map<String,Object> res = WeatherAPI.getCurrentWeather(params);
        System.debug('res --'+res);
    }
}