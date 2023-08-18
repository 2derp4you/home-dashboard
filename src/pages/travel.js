import axios from 'axios';
import { useEffect, useState } from 'react';

const Travel = () => {
    const [nextDepartures1, setNextDepartures1] = useState(null);
    const [nextDepartures2, setNextDepartures2] = useState(null);
    const [nextDepartures3, setNextDepartures3] = useState(null);

    const [location, setLocation] = useState(null);
    const [firstPageLoad, setFirstPageLoad] = useState(true);
    const [time, setTime] = useState(null);
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
        if(location) {
            const getStopData = async () => {
              if(!firstPageLoad) {
                axios.post('https://api.entur.io/journey-planner/v3/graphql', {
                    query: `# Avgangstavle

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
                        setNextDepartures1(res.data.data.stopPlace);
                    }
                }).catch(err => {
                    console.log(err);
                })
              }
                setTimeout(() => {
                    axios.post('https://api.entur.io/journey-planner/v3/graphql', {
                    query: `# Avgangstavle

                    {
                        stopPlace(id: "NSR:StopPlace:3515") {
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
                            setNextDepartures2(res.data.data.stopPlace);
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                }, firstPageLoad ? 10000 : 0);
                setTimeout(() => {
                    axios.post('https://api.entur.io/journey-planner/v3/graphql', {
                    query: `# Avgangstavle

                    {
                        stopPlace(id: "NSR:StopPlace:58853") {
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
                            setNextDepartures3(res.data.data.stopPlace);
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                }, firstPageLoad ? 20000 : 0);
                setFirstPageLoad(false);
            }
            getStopData();
            window.setInterval(() => {
                getStopData();
            }, 30000);
        }
    }, [location, firstPageLoad]);

    useEffect(() => {
      if(canGetTime) {
          setTime(new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1'));
      }
      const interval = setInterval(() => {
          setCanGetTime(false);
          setTime(new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1'));
      }, 1000);
      return () => clearInterval(interval);
  }, [canGetTime]);

    return (
        <div className="travel">
            <div className="travel-main">
                <div className="travel-main-header">
                    {time ? time : null}
                </div>
                <div className="travel-main-content">
                    <div className="travel-main-content-item">
                        <div className="travel-main-content-item-header">
                            <ion-icon name="bus-outline"></ion-icon>
                            {nextDepartures1 ? nextDepartures1.name : null}
                        </div>
                        <div className="travel-main-content-item-departure-list">
                          {nextDepartures1 ? nextDepartures1.estimatedCalls.map((departure, index) => {
                            if(index > 4) {
                              return null;
                            }
                            return (
                              <div key={index} className="travel-main-content-item-departure-list-item">
                                <div className="travel-main-content-item-departure-list-item-time">{departure.expectedDepartureTime ? departure.expectedDepartureTime.substring(11, 16) : departure.aimedDepartureTime.substring(11, 16)}</div>
                                <div className="travel-main-content-item-departure-list-item-line">{departure.serviceJourney.journeyPattern.line.id.split(":")[2]}</div>
                                <div className="travel-main-content-item-departure-list-item-destination">{departure.destinationDisplay.frontText}</div>
                                <div className="travel-main-content-item-departure-list-item-name">{departure.serviceJourney.journeyPattern.line.name}</div>
                              </div>
                            )
                          }) : <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
                        </div>
                    </div>
                    <div className="travel-main-content-item">
                      <div className="travel-main-content-item-header">
                          <ion-icon name="bus-outline"></ion-icon>
                          {nextDepartures2 ? nextDepartures2.name : null}
                      </div>
                      <div className="travel-main-content-item-departure-list">
                        {nextDepartures2 ? nextDepartures2.estimatedCalls.map((departure, index) => {
                          if(index > 4) {
                            return null;
                          }
                          return (
                            <div key={index} className="travel-main-content-item-departure-list-item">
                              <div className="travel-main-content-item-departure-list-item-time">{departure.expectedDepartureTime ? departure.expectedDepartureTime.substring(11, 16) : departure.aimedDepartureTime.substring(11, 16)}</div>
                              <div className="travel-main-content-item-departure-list-item-line">{departure.serviceJourney.journeyPattern.line.id.split(":")[2]}</div>
                              <div className="travel-main-content-item-departure-list-item-destination">{departure.destinationDisplay.frontText}</div>
                              <div className="travel-main-content-item-departure-list-item-name">{departure.serviceJourney.journeyPattern.line.name}</div>
                            </div>
                          )
                        }) : <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
                      </div>
                    </div>
                    <div className="travel-main-content-item">
                      <div className="travel-main-content-item-header">
                          <ion-icon name="bus-outline"></ion-icon>
                          {nextDepartures3 ? nextDepartures3.name : null}
                      </div>
                      <div className="travel-main-content-item-departure-list">
                        {nextDepartures3 ? nextDepartures3.estimatedCalls.map((departure, index) => {
                          if(index > 4) {
                            return null;
                          }
                          return (
                            <div key={index} className="travel-main-content-item-departure-list-item">
                              <div className="travel-main-content-item-departure-list-item-time">{departure.expectedDepartureTime ? departure.expectedDepartureTime.substring(11, 16) : departure.aimedDepartureTime.substring(11, 16)}</div>
                              <div className="travel-main-content-item-departure-list-item-line">{departure.serviceJourney.journeyPattern.line.id.split(":")[2]}</div>
                              <div className="travel-main-content-item-departure-list-item-destination">{departure.destinationDisplay.frontText}</div>
                              <div className="travel-main-content-item-departure-list-item-name">{departure.serviceJourney.journeyPattern.line.name}</div>
                            </div>
                          )
                        }) : <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
                      </div>
                    </div>
                  </div>
            </div>
        </div>
    )
}

export default Travel;