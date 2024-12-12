public with sharing class YouTubeAPIControllerHTTPMOCK implements HttpCalloutMock  {
    public static HttpResponse respond(HTTPRequest request) {
        // Create a fake response
        HttpResponse response = new HttpResponse();
        response.setBody('{"kind": "youtube#searchListResponse","etag": "cpQsqQ1KxWR-uhXuXOv6-1PdlQ4"}');
        response.setStatusCode(200);
        return response;
    }
}