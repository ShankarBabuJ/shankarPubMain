import { LightningElement } from 'lwc';
import getYouTubeVideos from '@salesforce/apex/YouTubeAPIController.getYouTubeVideos';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import youtubeicon from '@salesforce/resourceUrl/youtubeicon';

export default class YouTubeSearchEngine extends LightningElement {
    searchKey = 'salesforce';
    imageUrl = youtubeicon;
    isVisible = true;
    uiRecordData = {};
    items = [];
    resultRecords = [];

    connectedCallback(){
        this.fetchYouTubeVideos();
    };
    handleKeyChange(event){
        this.searchKey = event.target.value;
    }
    async fetchYouTubeVideos(){
        await getYouTubeVideos({searchKey: this.searchKey})
        .then(result => {
            console.log('result --',result);
            if(result != null && result.error == undefined && result.items){ 
                this.resultRecords = result;
                this.items = result.items;
                console.log('result video--',result.items[0].id.videoId);
                this.viewURL = 'https://www.youtube.com/embed/'+result.items[0].id.videoId;
                console.log('viewURL',this.viewURL)
                this.uiRecordData = {
                    "title": result.items[0].snippet.title,
                    "description": result.items[0].snippet.description,
                    "imageUrl": result.items[0].snippet.thumbnails.default.url,
                    "channelTitle": result.items[0].snippet.channelTitle,
                    "viewURL": "https://www.youtube.com/embed/"+result.items[0].id.videoId
                }
                console.log('uiRecordData --',JSON.stringify(this.uiRecordData));
                this.isVisible = true;
            }else{
                this.isVisible = false;
                this.dispatchMessage('ERROR',result.error.errors[0].message,'error')
            } 
        })
        .catch(error => {
            this.dispatchMessage('ERROR',error.bosy.message,'error')
        })
    }
    watchVideo(event){
        console.log('value',event.target.dataset.id);
        console.log('this.resultRecords',this.resultRecords);
        this.resultRecords.items.forEach(element => {
            if(element.etag == event.target.dataset.id){
                console.log('element match found',element);
                this.uiRecordData = {
                    "title": element.snippet.title,
                    "description": element.snippet.description,
                    "imageUrl": element.snippet.thumbnails.default.url,
                    "channelTitle": element.snippet.channelTitle,
                    "viewURL": "https://www.youtube.com/embed/"+element.id.videoId
                }
            }
        });
        console.log('uiRecordData %%',JSON.stringify(this.uiRecordData));
    }
    dispatchMessage(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        }));
    }
}