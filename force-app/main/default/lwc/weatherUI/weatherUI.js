import { LightningElement, track } from 'lwc';
import getCurrentWeather from '@salesforce/apex/WeatherAPI.getCurrentWeather';
export default class WeatherUI extends LightningElement {
    coordinates = {
        latitude: undefined,
        longitude: undefined
    }
    @track weatherRecord = {}
    handleChangeValue(event){
        this.coordinates[event.target.name] = event.target.value;
    }
    handleSubmit(event){
        console.log('coordinates --',this.coordinates);
        console.log('coordinates latitude--',this.coordinates.latitude);
        console.log('coordinates longitude--',this.coordinates.longitude);
        if(this.coordinates.latitude != undefined && this.coordinates.longitude != undefined){
            getCurrentWeather({params: this.coordinates}).then(result =>{
                console.log('result --',result)
                this.weatherRecord['name'] = result.name;
                this.weatherRecord['currentTemp'] = (result.main.temp - 273.15).toFixed(2) +'°c';
                this.weatherRecord['maxTemp'] = (result.main.temp_max - 273.15).toFixed(2) +'°c';
                this.weatherRecord['minTemp'] = (result.main.temp_min - 273.15).toFixed(2) + '°c';
                this.weatherRecord['sunrise'] = new Date(result.sys.sunrise * 1000);
                this.weatherRecord['sunset'] = new Date(result.sys.sunset * 1000);
            }).catch(error =>{
                alert(error.body.message)
            })
        }else{
            alert('Latitude and Longitude are required.')
        }
    }
}