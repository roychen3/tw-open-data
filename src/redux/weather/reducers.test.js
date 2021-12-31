import {
    GET_WEATHER,
    GET_WEATHER_SUCCESS,
    GET_WEATHER_FAILURE,
    RESET_WEATHER,
} from '../../constants/actionTypes'
import reducers from './reducers'

describe('weather reducers', () => {
    it('should return the initial state', () => {
        expect(reducers(undefined, {})).toEqual(
            {
                weatherCountyList: [],
                weatherAllLocation: [],
                weatherAllLocationError: null,
                weatherAllLocationLoading: false,
            }
        )
    })

    it('should handle get weather', () => {
        ``
        expect(
            reducers([], { type: GET_WEATHER })
        ).toEqual(
            {
                weatherAllLocationLoading: true,
            }
        )
    })

    it('should handle get weather success', () => {
        const fakeWeatherCountyList = [
            {
                value: '臺北市',
                name: '臺北市'
            },
            {
                value: '新北市',
                name: '新北市'
            },
        ]
        const fakeWeatherAllLocation = [
            {
                locationName: '臺北市',
                weatherElement: [
                    {
                        elementName: 'Wx',
                        time: [
                            {
                                startTime: '2021-12-31T12:00:00+08:00',
                                endTime: '2021-12-31T18:00:00+08:00',
                                parameter: {
                                    parameterName: '陰天',
                                    parameterValue: '7'
                                }
                            },
                            {
                                startTime: '2021-12-31T18:00:00+08:00',
                                endTime: '2022-01-01T06:00:00+08:00',
                                parameter: {
                                    parameterName: '陰天',
                                    parameterValue: '7'
                                }
                            },
                            {
                                startTime: '2022-01-01T06:00:00+08:00',
                                endTime: '2022-01-01T18:00:00+08:00',
                                parameter: {
                                    parameterName: '陰天',
                                    parameterValue: '7'
                                }
                            }
                        ]
                    },
                    {
                        elementName: 'MaxT',
                        time: [
                            {
                                startTime: '2021-12-31T12:00:00+08:00',
                                endTime: '2021-12-31T18:00:00+08:00',
                                parameter: {
                                    parameterName: '17',
                                    parameterUnit: 'C'
                                }
                            },
                            {
                                startTime: '2021-12-31T18:00:00+08:00',
                                endTime: '2022-01-01T06:00:00+08:00',
                                parameter: {
                                    parameterName: '16',
                                    parameterUnit: 'C'
                                }
                            },
                            {
                                startTime: '2022-01-01T06:00:00+08:00',
                                endTime: '2022-01-01T18:00:00+08:00',
                                parameter: {
                                    parameterName: '20',
                                    parameterUnit: 'C'
                                }
                            }
                        ]
                    },
                    {
                        elementName: 'MinT',
                        time: [
                            {
                                startTime: '2021-12-31T12:00:00+08:00',
                                endTime: '2021-12-31T18:00:00+08:00',
                                parameter: {
                                    parameterName: '16',
                                    parameterUnit: 'C'
                                }
                            },
                            {
                                startTime: '2021-12-31T18:00:00+08:00',
                                endTime: '2022-01-01T06:00:00+08:00',
                                parameter: {
                                    parameterName: '15',
                                    parameterUnit: 'C'
                                }
                            },
                            {
                                startTime: '2022-01-01T06:00:00+08:00',
                                endTime: '2022-01-01T18:00:00+08:00',
                                parameter: {
                                    parameterName: '15',
                                    parameterUnit: 'C'
                                }
                            }
                        ]
                    },
                    {
                        elementName: 'CI',
                        time: [
                            {
                                startTime: '2021-12-31T12:00:00+08:00',
                                endTime: '2021-12-31T18:00:00+08:00',
                                parameter: {
                                    parameterName: '稍有寒意'
                                }
                            },
                            {
                                startTime: '2021-12-31T18:00:00+08:00',
                                endTime: '2022-01-01T06:00:00+08:00',
                                parameter: {
                                    parameterName: '寒冷至稍有寒意'
                                }
                            },
                            {
                                startTime: '2022-01-01T06:00:00+08:00',
                                endTime: '2022-01-01T18:00:00+08:00',
                                parameter: {
                                    parameterName: '寒冷至稍有寒意'
                                }
                            }
                        ]
                    },
                    {
                        elementName: 'PoP',
                        time: [
                            {
                                startTime: '2021-12-31T12:00:00+08:00',
                                endTime: '2021-12-31T18:00:00+08:00',
                                parameter: {
                                    parameterName: '10',
                                    parameterUnit: '百分比'
                                }
                            },
                            {
                                startTime: '2021-12-31T18:00:00+08:00',
                                endTime: '2022-01-01T06:00:00+08:00',
                                parameter: {
                                    parameterName: '20',
                                    parameterUnit: '百分比'
                                }
                            },
                            {
                                startTime: '2022-01-01T06:00:00+08:00',
                                endTime: '2022-01-01T18:00:00+08:00',
                                parameter: {
                                    parameterName: '20',
                                    parameterUnit: '百分比'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                locationName: '新北市',
                weatherElement: [
                    {
                        elementName: 'Wx',
                        time: [
                            {
                                startTime: '2021-12-31T12:00:00+08:00',
                                endTime: '2021-12-31T18:00:00+08:00',
                                parameter: {
                                    parameterName: '陰天',
                                    parameterValue: '7'
                                }
                            },
                            {
                                startTime: '2021-12-31T18:00:00+08:00',
                                endTime: '2022-01-01T06:00:00+08:00',
                                parameter: {
                                    parameterName: '陰天',
                                    parameterValue: '7'
                                }
                            },
                            {
                                startTime: '2022-01-01T06:00:00+08:00',
                                endTime: '2022-01-01T18:00:00+08:00',
                                parameter: {
                                    parameterName: '陰天',
                                    parameterValue: '7'
                                }
                            }
                        ]
                    },
                    {
                        elementName: 'MaxT',
                        time: [
                            {
                                startTime: '2021-12-31T12:00:00+08:00',
                                endTime: '2021-12-31T18:00:00+08:00',
                                parameter: {
                                    parameterName: '18',
                                    parameterUnit: 'C'
                                }
                            },
                            {
                                startTime: '2021-12-31T18:00:00+08:00',
                                endTime: '2022-01-01T06:00:00+08:00',
                                parameter: {
                                    parameterName: '16',
                                    parameterUnit: 'C'
                                }
                            },
                            {
                                startTime: '2022-01-01T06:00:00+08:00',
                                endTime: '2022-01-01T18:00:00+08:00',
                                parameter: {
                                    parameterName: '20',
                                    parameterUnit: 'C'
                                }
                            }
                        ]
                    },
                    {
                        elementName: 'MinT',
                        time: [
                            {
                                startTime: '2021-12-31T12:00:00+08:00',
                                endTime: '2021-12-31T18:00:00+08:00',
                                parameter: {
                                    parameterName: '16',
                                    parameterUnit: 'C'
                                }
                            },
                            {
                                startTime: '2021-12-31T18:00:00+08:00',
                                endTime: '2022-01-01T06:00:00+08:00',
                                parameter: {
                                    parameterName: '15',
                                    parameterUnit: 'C'
                                }
                            },
                            {
                                startTime: '2022-01-01T06:00:00+08:00',
                                endTime: '2022-01-01T18:00:00+08:00',
                                parameter: {
                                    parameterName: '15',
                                    parameterUnit: 'C'
                                }
                            }
                        ]
                    },
                    {
                        elementName: 'CI',
                        time: [
                            {
                                startTime: '2021-12-31T12:00:00+08:00',
                                endTime: '2021-12-31T18:00:00+08:00',
                                parameter: {
                                    parameterName: '稍有寒意'
                                }
                            },
                            {
                                startTime: '2021-12-31T18:00:00+08:00',
                                endTime: '2022-01-01T06:00:00+08:00',
                                parameter: {
                                    parameterName: '寒冷至稍有寒意'
                                }
                            },
                            {
                                startTime: '2022-01-01T06:00:00+08:00',
                                endTime: '2022-01-01T18:00:00+08:00',
                                parameter: {
                                    parameterName: '寒冷至稍有寒意'
                                }
                            }
                        ]
                    },
                    {
                        elementName: 'PoP',
                        time: [
                            {
                                startTime: '2021-12-31T12:00:00+08:00',
                                endTime: '2021-12-31T18:00:00+08:00',
                                parameter: {
                                    parameterName: '10',
                                    parameterUnit: '百分比'
                                }
                            },
                            {
                                startTime: '2021-12-31T18:00:00+08:00',
                                endTime: '2022-01-01T06:00:00+08:00',
                                parameter: {
                                    parameterName: '20',
                                    parameterUnit: '百分比'
                                }
                            },
                            {
                                startTime: '2022-01-01T06:00:00+08:00',
                                endTime: '2022-01-01T18:00:00+08:00',
                                parameter: {
                                    parameterName: '20',
                                    parameterUnit: '百分比'
                                }
                            }
                        ]
                    }
                ]
            },
        ]
        expect(
            reducers([], {
                type: GET_WEATHER_SUCCESS,
                payload: {
                    weatherCountyList: fakeWeatherCountyList,
                    weatherAllLocation: fakeWeatherAllLocation,
                }
            })
        ).toEqual(
            {
                weatherCountyList: fakeWeatherCountyList,
                weatherAllLocation: fakeWeatherAllLocation,
                weatherAllLocationLoading: false,
            }
        )
    })

    it('should handle get weather failure', () => {
        const payload = 'api error message'

        expect(
            reducers([], {
                type: GET_WEATHER_FAILURE,
                payload,
            })
        ).toEqual(
            {
                weatherAllLocationError: payload,
                weatherAllLocationLoading: false,
            }
        )
    })

    it('should handle reset weather', () => {
        expect(
            reducers([], { type: RESET_WEATHER })
        ).toEqual(
            {
                weatherCountyList: [],
                weatherAllLocation: [],
                weatherAllLocationError: null,
                weatherAllLocationLoading: false,
            }
        )
    })
})