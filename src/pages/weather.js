import axios from 'axios';
import { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
);

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [weatherChart, setWeatherChart] = useState([]);
    const [rainChart, setRainChart] = useState([]);
    const [weatherCode, setWeatherCode] = useState(null);
    const [weatherDescription, setWeatherDescription] = useState(null);
    const [location, setLocation] = useState(null);

    const [time, setTime] = useState(null);
    const [day, setDay] = useState(null);
    const [canGetTime, setCanGetTime] = useState(true);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            });
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    }, []);

    useEffect(() => {
        const getWeather = () => {
            if(location) {
                axios.get('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=' + location.latitude + '&lon=' + location.longitude)
                    .then((response) => {
                        setWeather(response.data);
                        let tempWeatherChart = [];
                        tempWeatherChart.push(response.data.properties.timeseries[0].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[2].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[4].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[6].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[8].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[10].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[12].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[14].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[16].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[18].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[20].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[22].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[24].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[26].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[28].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[30].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[32].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[34].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[36].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[38].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[40].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[42].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[44].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[46].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[48].data.instant.details.air_temperature);
                        setWeatherChart(tempWeatherChart);

                        let tempRainChart = [];
                        tempRainChart.push(response.data.properties.timeseries[0].data.next_1_hours.details.precipitation_amount);
                        tempRainChart.push(response.data.properties.timeseries[2].data.next_1_hours.details.precipitation_amount);
                        tempRainChart.push(response.data.properties.timeseries[4].data.next_1_hours.details.precipitation_amount);
                        tempRainChart.push(response.data.properties.timeseries[6].data.next_1_hours.details.precipitation_amount);
                        tempRainChart.push(response.data.properties.timeseries[8].data.next_1_hours.details.precipitation_amount);
                        tempRainChart.push(response.data.properties.timeseries[10].data.next_1_hours.details.precipitation_amount);
                        tempRainChart.push(response.data.properties.timeseries[12].data.next_1_hours.details.precipitation_amount);
                        tempRainChart.push(response.data.properties.timeseries[14].data.next_1_hours.details.precipitation_amount);
                        tempRainChart.push(response.data.properties.timeseries[16].data.next_1_hours.details.precipitation_amount);
                        tempRainChart.push(response.data.properties.timeseries[18].data.next_1_hours.details.precipitation_amount);
                        tempRainChart.push(response.data.properties.timeseries[20].data.next_1_hours.details.precipitation_amount);
                        tempRainChart.push(response.data.properties.timeseries[22].data.next_1_hours.details.precipitation_amount);
                        tempRainChart.push(response.data.properties.timeseries[24].data.next_1_hours.details.precipitation_amount);
                        setRainChart(tempRainChart);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
        getWeather();
        window.setInterval(() => {
            getWeather();
        }, 10000);
    }, [location]);

    useEffect(() => {
        if(weather) {
            switch (weather.properties.timeseries[0].data.next_1_hours.summary.symbol_code) {
                case 'clearsky_day':
                    setWeatherCode('sunny-outline');
                    setWeatherDescription('Sol');
                    break;
                case 'clearsky_night':
                    setWeatherCode('moon-outline');
                    setWeatherDescription('Klar himmel');
                    break;
                case 'fair_day':
                    setWeatherCode('sunny-outline');
                    setWeatherDescription('Sol');
                    break;
                case 'fair_night':
                    setWeatherCode('moon-outline');
                    setWeatherDescription('Klar himmel');
                    break;
                case 'partlycloudy_day':
                    setWeatherCode('partly-sunny-outline');
                    setWeatherDescription('Delvis skyet');
                    break;
                case 'partlycloudy_night':
                    setWeatherCode('cloudy-night-outline');
                    setWeatherDescription('Delvis skyet');
                    break;
                case 'cloudy':
                    setWeatherCode('cloudy-outline');
                    setWeatherDescription('Overskyet');
                    break;
                case 'lightrainshowers_day':
                    setWeatherCode('rainy-outline');
                    setWeatherDescription('Lette regnbyger');
                    break;
                case 'lightrainshowers_night':
                    setWeatherCode('rainy-outline');
                    setWeatherDescription('Lette regnbyger');
                    break;
                case 'rainshowers_day':
                    setWeatherCode('rainy-outline');
                    setWeatherDescription('Regnbyger');
                    break;
                case 'rainshowers_night':
                    setWeatherCode('rainy-outline');
                    setWeatherDescription('Regnbyger');
                    break;
                case 'heavyrainshowers_day':
                    setWeatherCode('rainy-outline');
                    setWeatherDescription('Kraftige regnbyger');
                    break;
                case 'heavyrainshowers_night':
                    setWeatherCode('rainy-outline');
                    setWeatherDescription('Kraftige regnbyger');
                    break;
                case 'lightrainshowersandthunder_day':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Lette regnbyger og torden');
                    break;
                case 'lightrainshowersandthunder_night':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Lette regnbyger og torden');
                    break;
                case 'rainshowersandthunder_day':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Regnbyger og torden');
                    break;
                case 'rainshowersandthunder_night':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Regnbyger og torden');
                    break;
                case 'heavyrainshowersandthunder_day':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Kraftige regnbyger og torden');
                    break;
                case 'heavyrainshowersandthunder_night':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Kraftige regnbyger og torden');
                    break;
                case 'lightsleetshowers_day':
                    setWeatherCode('snow-outline');
                    setWeatherDescription('Lette sluddbyger');
                    break;
                case 'lightsleetshowers_night':
                    setWeatherCode('snow-outline');
                    setWeatherDescription('Lette sluddbyger');
                    break;
                case 'lightsleetshowersandthunder_day':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Lette sluddbyger og torden');
                    break;
                case 'lightsleetshowersandthunder_night':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Lette sluddbyger og torden');
                    break;
                case 'sleetshowersandthunder_day':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Sluddbyger og torden');
                    break;
                case 'sleetshowersandthunder_night':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Sluddbyger og torden');
                    break;
                case 'heavysleetshowersandthunder_day':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Kraftige sluddbyger og torden');
                    break;
                case 'heavysleetshowersandthunder_night':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Kraftige sluddbyger og torden');
                    break;
                case 'lightsnowshowers_day':
                    setWeatherCode('snow-outline');
                    setWeatherDescription('Lette snøbyger');
                    break;
                case 'lightsnowshowers_night':
                    setWeatherCode('snow-outline');
                    setWeatherDescription('Lette snøbyger');
                    break;
                case 'snowshowers_day':
                    setWeatherCode('snow-outline');
                    setWeatherDescription('Snøbyger');
                    break;
                case 'snowshowers_night':
                    setWeatherCode('snow-outline');
                    setWeatherDescription('Snøbyger');
                    break;
                case 'heavysnowshowers_day':
                    setWeatherCode('snow-outline');
                    setWeatherDescription('Kraftige snøbyger');
                    break;
                case 'heavysnowshowers_night':
                    setWeatherCode('snow-outline');
                    setWeatherDescription('Kraftige snøbyger');
                    break;
                case 'lightsnowshowersandthunder_day':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Lette snøbyger og torden');
                    break;
                case 'lightsnowshowersandthunder_night':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Lette snøbyger og torden');
                    break;
                case 'snowshowersandthunder_day':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Snøbyger og torden');
                    break;
                case 'snowshowersandthunder_night':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Snøbyger og torden');
                    break;
                case 'heavysnowshowersandthunder_day':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Kraftige snøbyger og torden');
                    break;
                case 'heavysnowshowersandthunder_night':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Kraftige snøbyger og torden');
                    break;
                case 'lightrain':
                    setWeatherCode('rainy-outline');
                    setWeatherDescription('Lett regn');
                    break;
                case 'rain':
                    setWeatherCode('rainy-outline');
                    setWeatherDescription('Regn');
                    break;
                case 'heavyrain':
                    setWeatherCode('rainy-outline');
                    setWeatherDescription('Kraftig regn');
                    break;
                case 'lightrainandthunder':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Lett regn og torden');
                    break;
                case 'rainandthunder':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Regn og torden');
                    break;
                case 'heavyrainandthunder':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Kraftig regn og torden');
                    break;
                case 'lightsleet':
                    setWeatherCode('snow-outline');
                    setWeatherDescription('Lett sludd');
                    break;
                case 'sleet':
                    setWeatherCode('snow-outline');
                    setWeatherDescription('Sludd');
                    break;
                case 'heavysleet':
                    setWeatherCode('snow-outline');
                    setWeatherDescription('Kraftig sludd');
                    break;
                case 'lightsleetandthunder':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Lett sludd og torden');
                    break;
                case 'sleetandthunder':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Sludd og torden');
                    break;
                case 'heavysleetandthunder':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Kraftig sludd og torden');
                    break;
                case 'lightsnow':
                    setWeatherCode('snow-outline');
                    setWeatherDescription('Lett snø');
                    break;
                case 'snow':
                    setWeatherCode('snow-outline');
                    setWeatherDescription('Snø');
                    break;
                case 'heavysnow':
                    setWeatherCode('snow-outline');
                    setWeatherDescription('Kraftig snø');
                    break;
                case 'lightsnowandthunder':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Lett snø og torden');
                    break;
                case 'snowandthunder':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Snø og torden');
                    break;
                case 'heavysnowandthunder':
                    setWeatherCode('thunderstorm-outline');
                    setWeatherDescription('Kraftig snø og torden');
                    break;
                case 'fog':
                    setWeatherCode('cloudy-outline');
                    setWeatherDescription('Tåke');
                    break;
                default:
                    setWeatherCode('cloudy-outline');
                    setWeatherDescription('Ukjent værtype');
                    break;
            }
        }
    }, [weather]);

    useEffect(() => {
        if(canGetTime) {
            setTime(new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1'));
            setDay(new Date().toLocaleDateString('nb-NO', { weekday: 'long' }));
        }
        const interval = setInterval(() => {
            setCanGetTime(false);
            setTime(new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1'));
            setDay(new Date().toLocaleDateString('nb-NO', { weekday: 'long' }));
        }, 1000);
        return () => clearInterval(interval);
    }, [canGetTime]);

    const data = {
        labels: ['now', '2h', '4h', '6h', '8h', '10h', '12h', '14h', '16h', '18h', '20h', '22h', '24h', '26h', '28h', '30h', '32h', '34h', '36h', '38h', '40h', '42h', '44h', '46h', '48h', ],
        datasets: [
            {
                label: 'Temperatur',
                data: weatherChart,
                fill: false,
                backgroundColor: 'transparent',
                borderColor: '#3e69f6',
                pointBorderColor: 'transparent',
                pointBorderWidth: 4,
                tension: 0.4,
            },
        ],
    };

    const data2 = {
        labels: ['now', '2h', '4h', '6h', '8h', '10h', '12h', '14h', '16h', '18h', '20h', '22h', '24h' ],
        datasets: [
            {
                label: 'Temperatur',
                data: rainChart,
                fill: false,
                backgroundColor: 'transparent',
                borderColor: '#3e69f6',
                pointBorderColor: 'transparent',
                pointBorderWidth: 4,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        interaction: {
            intersect: false,
        },
        scales: {
            x: {
                display: true,
                grid: {
                    display: false,
                },
            },
            y: {
                display: true,
                grid: {
                    display: false,
                },
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return context.parsed.y + '°C';
                    },
                },
            },
          },
    };

    const options2 = {
        responsive: true,
        interaction: {
            intersect: false,
        },
        scales: {
            x: {
                display: true,
                grid: {
                    display: false,
                },
            },
            y: {
                display: true,
                suggestedMin: 0,
                suggestedMax: 30,
                grid: {
                    display: false,
                },
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return context.parsed.y + 'mm';
                    },
                },
            },
        },
    };


    return (
        <div className="weather">
            {weather && weatherChart.length > 0 && weatherCode && weatherDescription ? <div className="weather-main">
                <div className="weather-main-temp">
                    <div className="weather-main-title">
                        <ion-icon name="cloud-outline"></ion-icon>
                        Weather Today
                    </div>
                    <div className="weather-main-temp-icon">
                        <ion-icon name="thermometer-outline"></ion-icon>
                        Temperature in °C
                    </div>
                    <Line data={data} options={options}></Line>
                </div>
                <div className="weather-main-rain">
                    <div className="weather-main-rain-icon">
                        <ion-icon name="water-outline"></ion-icon>
                        Rain Today (mm)
                    </div>
                    <Line data={data2} options={options2}></Line>
                </div>
                <div className="weather-main-info">
                    <div className="weather-main-info-time">
                        <div className="weather-main-info-weather-icon">
                            <ion-icon name={weatherCode}></ion-icon>
                        </div>
                        <div className="weather-main-info-time-time">{time}</div>
                        <div className="weather-main-info-time-day">{day}</div>
                    </div>
                    <div className="weather-main-info-weather">
                        <div className="weather-main-info-weather-temp">{weather.properties.timeseries[0].data.instant.details.air_temperature} °C</div>
                        <div className="weather-main-info-weather-description">{weatherDescription}</div>
                    </div>
                </div>
            </div> : <div className="weather-main-loading"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>}
        </div>
    )
}

export default Weather;