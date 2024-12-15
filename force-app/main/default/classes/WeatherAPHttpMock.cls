public with sharing class WeatherAPHttpMock implements HttpCalloutMock {
    public static HttpResponse respond(HTTPRequest request) {
        // Create a fake response
        HttpResponse response = new HttpResponse();
        response.setBody('main: {temp: 291.94, feels_like: 291.91, temp_min: 291.07, temp_max: 293.97, pressure: 1016, …}');
        response.setStatusCode(200);
        return response;
    }
}