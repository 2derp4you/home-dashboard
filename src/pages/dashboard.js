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

const Dashboard = () => {
    const [weather, setWeather] = useState(null);
    const [weatherChart, setWeatherChart] = useState([]);
    const [weatherCode, setWeatherCode] = useState(null);
    const [weatherDescription, setWeatherDescription] = useState(null);
    const [location, setLocation] = useState(null);

    const [time, setTime] = useState(null);
    const [day, setDay] = useState(null);
    const [month, setMonth] = useState(null);
    const [dayNumber, setDayNumber] = useState(null);
    const [year, setYear] = useState(null);
    const [canGetTime, setCanGetTime] = useState(true);

    const [nextDepartures, setNextDepartures] = useState(null);

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
                        tempWeatherChart.push(response.data.properties.timeseries[12].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[24].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[36].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[48].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[54].data.instant.details.air_temperature);
                        tempWeatherChart.push(response.data.properties.timeseries[56].data.instant.details.air_temperature);
                        setWeatherChart(tempWeatherChart);
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
            setMonth(new Date().toLocaleDateString('nb-NO', { month: 'long' }));
            setDayNumber(new Date().toLocaleDateString('nb-NO', { day: 'numeric' }));
            setYear(new Date().toLocaleDateString('nb-NO', { year: 'numeric' }));
        }
        const interval = setInterval(() => {
            setCanGetTime(false);
            setTime(new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1'));
            setDay(new Date().toLocaleDateString('nb-NO', { weekday: 'long' }));
            setMonth(new Date().toLocaleDateString('nb-NO', { month: 'long' }));
            setDayNumber(new Date().toLocaleDateString('nb-NO', { day: 'numeric' }));
            setYear(new Date().toLocaleDateString('nb-NO', { year: 'numeric' }));
        }, 1000);
        return () => clearInterval(interval);
    }, [canGetTime]);

    useEffect(() => {
        if(location) {
            const getStopData = async () => {
                axios.post('https://api.entur.io/journey-planner/v3/graphql', {
                    query: `# Avgangstavle - Kolbotn Krysset

                    {
                        stopPlace(id: "NSR:StopPlace:3494") {
                          id
                          name
                          estimatedCalls(timeRange: 72100, numberOfDepartures: 10) {     
                            realtime
                            aimedArrivalTime
                            aimedDepartureTime
                            expectedArrivalTime
                            expectedDepartureTime
                            actualArrivalTime
                            actualDepartureTime
                            date
                            forBoarding
                            forAlighting
                            destinationDisplay {
                              frontText
                            }
                            quay {
                              id
                            }
                            serviceJourney {
                              journeyPattern {
                                line {
                                  id
                                  name
                                  transportMode
                                }
                              }
                            }
                          }
                        }
                      }
                    `,
                    variables: {}
                }).then(res => {
                    if(res.data.data.stopPlace) {
                        setNextDepartures(res.data.data.stopPlace);
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
            getStopData();
            window.setInterval(() => {
                getStopData();
            }, 10000);
        }
    }, [location]);

    const data = {
        labels: ['now', '12h', '24h', '36h', '48h', '60h', '72h'],
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

    return (
        <div className="dashboard">
            {time && day && month && dayNumber && year && weatherCode && weatherDescription ?
                <div className="dashboard-main">
                    <div className="dashboard-main-time">
                        <div className="dashboard-main-time-time"><ion-icon name="time-outline"></ion-icon>&nbsp;{time}</div>
                        <div className="dashboard-main-time-date">{day} {dayNumber} {month} {year}</div>
                    </div>
                    <div className="dashboard-main-weather">
                        <h2>Weather</h2>
                        <div className="dashboard-main-weather-temp">{weather.properties.timeseries[0].data.instant.details.air_temperature}°C&nbsp;{weatherDescription}</div>
                        <div className="dashboard-main-weather-graph">
                            <Line data={data} options={options}></Line>
                        </div>
                    </div>
                </div> : <div className="dashboard-main-loading"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>}
            {nextDepartures ?
                <div className="dashboard-departures">
                    <div className="departures-title"><ion-icon name="bus-outline"></ion-icon>&nbsp;Departures</div>
                    <h2>{nextDepartures.name}</h2>
                    <div className="dashboard-departures-list">
                        {nextDepartures.estimatedCalls.map((departure, index) => {
                            if(index > 5) {
                                return null;
                            }
                            return (
                                <div className="dashboard-departures-list-item" key={index}>
                                    <div className="dashboard-departures-list-item-icon"><ion-icon name="caret-forward-outline"></ion-icon></div>
                                    <div className="dashboard-departures-list-item-time">{departure.expectedDepartureTime ? departure.expectedDepartureTime.substring(11, 16) : departure.aimedDepartureTime.substring(11, 16)}</div>
                                    <div className="dashboard-departures-list-item-line">{departure.serviceJourney.journeyPattern.line.id.split(":")[2]}</div>
                                    <div className="dashboard-departures-list-item-destination">{departure.destinationDisplay.frontText}</div>
                                    <div className="dashboard-departures-list-item-name">{departure.serviceJourney.journeyPattern.line.name}</div>
                                </div>
                            )
                        })}
                    </div>
                </div> : <div className="dashboard-departures-loading"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>}
        </div>
    );
}

export default Dashboard;