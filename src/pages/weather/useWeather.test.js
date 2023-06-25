import { renderHook } from '@testing-library/react-hooks';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import useWeather from './useWeather';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('useWeather', () => {
  it('test \'determineDayDescription\' function', () => {
    const store = mockStore({
      weather: {
        weatherCountyList: [],
        weatherAllLocation: [],
        weatherAllLocationError: null,
        weatherAllLocationLoading: false,
      },
    });

    const { result } = renderHook(() => useWeather(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const testTheDayBeforeYesterdayDate = new Date();
    testTheDayBeforeYesterdayDate.setDate(
      testTheDayBeforeYesterdayDate.getDate() - 2
    );
    expect(
      result.current.determineDayDescription(testTheDayBeforeYesterdayDate)
    ).toStrictEqual('前天');

    const testYesterdayDate = new Date();
    testYesterdayDate.setDate(testYesterdayDate.getDate() - 1);
    expect(
      result.current.determineDayDescription(testYesterdayDate)
    ).toStrictEqual('昨天');

    const testTodayDate = new Date();
    expect(result.current.determineDayDescription(testTodayDate)).toStrictEqual(
      '今天'
    );

    const testTomorrowDate = new Date();
    testTomorrowDate.setDate(testTomorrowDate.getDate() + 1);
    expect(
      result.current.determineDayDescription(testTomorrowDate)
    ).toStrictEqual('明天');

    const testTheDayAfterTomorrowDate = new Date();
    testTheDayAfterTomorrowDate.setDate(
      testTheDayAfterTomorrowDate.getDate() + 2
    );
    expect(
      result.current.determineDayDescription(testTheDayAfterTomorrowDate)
    ).toStrictEqual('後天');
  });

  it('test \'determineTimeDescription\' function', () => {
    const store = mockStore({
      weather: {
        weatherCountyList: [],
        weatherAllLocation: [],
        weatherAllLocationError: null,
        weatherAllLocationLoading: false,
      },
    });

    const { result } = renderHook(() => useWeather(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.determineTimeDescription(6)).toStrictEqual('早上');
    expect(result.current.determineTimeDescription(9)).toStrictEqual('早上');

    expect(result.current.determineTimeDescription(12)).toStrictEqual('下午');
    expect(result.current.determineTimeDescription(15)).toStrictEqual('下午');

    expect(result.current.determineTimeDescription(18)).toStrictEqual('晚上');
    expect(result.current.determineTimeDescription(21)).toStrictEqual('晚上');

    expect(result.current.determineTimeDescription(0)).toStrictEqual('凌晨');
    expect(result.current.determineTimeDescription(3)).toStrictEqual('凌晨');
  });

  it('test \'creatWeatherCardList\' function', () => {
    const mockDate = new Date(2021, 11, 31);
    jest.useFakeTimers('modern');
    jest.setSystemTime(mockDate);

    const store = mockStore({
      weather: {
        weatherCountyList: [
          {
            value: '臺北市',
            name: '臺北市',
          },
          {
            value: '新北市',
            name: '新北市',
          },
          {
            value: '桃園市',
            name: '桃園市',
          },
        ],
        weatherAllLocation: [
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
                      parameterValue: '7',
                    },
                  },
                  {
                    startTime: '2021-12-31T18:00:00+08:00',
                    endTime: '2022-01-01T06:00:00+08:00',
                    parameter: {
                      parameterName: '陰天',
                      parameterValue: '7',
                    },
                  },
                  {
                    startTime: '2022-01-01T06:00:00+08:00',
                    endTime: '2022-01-01T18:00:00+08:00',
                    parameter: {
                      parameterName: '陰天',
                      parameterValue: '7',
                    },
                  },
                ],
              },
              {
                elementName: 'MaxT',
                time: [
                  {
                    startTime: '2021-12-31T12:00:00+08:00',
                    endTime: '2021-12-31T18:00:00+08:00',
                    parameter: {
                      parameterName: '17',
                      parameterUnit: 'C',
                    },
                  },
                  {
                    startTime: '2021-12-31T18:00:00+08:00',
                    endTime: '2022-01-01T06:00:00+08:00',
                    parameter: {
                      parameterName: '16',
                      parameterUnit: 'C',
                    },
                  },
                  {
                    startTime: '2022-01-01T06:00:00+08:00',
                    endTime: '2022-01-01T18:00:00+08:00',
                    parameter: {
                      parameterName: '20',
                      parameterUnit: 'C',
                    },
                  },
                ],
              },
              {
                elementName: 'MinT',
                time: [
                  {
                    startTime: '2021-12-31T12:00:00+08:00',
                    endTime: '2021-12-31T18:00:00+08:00',
                    parameter: {
                      parameterName: '16',
                      parameterUnit: 'C',
                    },
                  },
                  {
                    startTime: '2021-12-31T18:00:00+08:00',
                    endTime: '2022-01-01T06:00:00+08:00',
                    parameter: {
                      parameterName: '15',
                      parameterUnit: 'C',
                    },
                  },
                  {
                    startTime: '2022-01-01T06:00:00+08:00',
                    endTime: '2022-01-01T18:00:00+08:00',
                    parameter: {
                      parameterName: '15',
                      parameterUnit: 'C',
                    },
                  },
                ],
              },
              {
                elementName: 'CI',
                time: [
                  {
                    startTime: '2021-12-31T12:00:00+08:00',
                    endTime: '2021-12-31T18:00:00+08:00',
                    parameter: {
                      parameterName: '稍有寒意',
                    },
                  },
                  {
                    startTime: '2021-12-31T18:00:00+08:00',
                    endTime: '2022-01-01T06:00:00+08:00',
                    parameter: {
                      parameterName: '寒冷至稍有寒意',
                    },
                  },
                  {
                    startTime: '2022-01-01T06:00:00+08:00',
                    endTime: '2022-01-01T18:00:00+08:00',
                    parameter: {
                      parameterName: '寒冷至稍有寒意',
                    },
                  },
                ],
              },
              {
                elementName: 'PoP',
                time: [
                  {
                    startTime: '2021-12-31T12:00:00+08:00',
                    endTime: '2021-12-31T18:00:00+08:00',
                    parameter: {
                      parameterName: '10',
                      parameterUnit: '百分比',
                    },
                  },
                  {
                    startTime: '2021-12-31T18:00:00+08:00',
                    endTime: '2022-01-01T06:00:00+08:00',
                    parameter: {
                      parameterName: '20',
                      parameterUnit: '百分比',
                    },
                  },
                  {
                    startTime: '2022-01-01T06:00:00+08:00',
                    endTime: '2022-01-01T18:00:00+08:00',
                    parameter: {
                      parameterName: '20',
                      parameterUnit: '百分比',
                    },
                  },
                ],
              },
            ],
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
                      parameterValue: '7',
                    },
                  },
                  {
                    startTime: '2021-12-31T18:00:00+08:00',
                    endTime: '2022-01-01T06:00:00+08:00',
                    parameter: {
                      parameterName: '陰天',
                      parameterValue: '7',
                    },
                  },
                  {
                    startTime: '2022-01-01T06:00:00+08:00',
                    endTime: '2022-01-01T18:00:00+08:00',
                    parameter: {
                      parameterName: '陰天',
                      parameterValue: '7',
                    },
                  },
                ],
              },
              {
                elementName: 'MaxT',
                time: [
                  {
                    startTime: '2021-12-31T12:00:00+08:00',
                    endTime: '2021-12-31T18:00:00+08:00',
                    parameter: {
                      parameterName: '18',
                      parameterUnit: 'C',
                    },
                  },
                  {
                    startTime: '2021-12-31T18:00:00+08:00',
                    endTime: '2022-01-01T06:00:00+08:00',
                    parameter: {
                      parameterName: '16',
                      parameterUnit: 'C',
                    },
                  },
                  {
                    startTime: '2022-01-01T06:00:00+08:00',
                    endTime: '2022-01-01T18:00:00+08:00',
                    parameter: {
                      parameterName: '20',
                      parameterUnit: 'C',
                    },
                  },
                ],
              },
              {
                elementName: 'MinT',
                time: [
                  {
                    startTime: '2021-12-31T12:00:00+08:00',
                    endTime: '2021-12-31T18:00:00+08:00',
                    parameter: {
                      parameterName: '16',
                      parameterUnit: 'C',
                    },
                  },
                  {
                    startTime: '2021-12-31T18:00:00+08:00',
                    endTime: '2022-01-01T06:00:00+08:00',
                    parameter: {
                      parameterName: '15',
                      parameterUnit: 'C',
                    },
                  },
                  {
                    startTime: '2022-01-01T06:00:00+08:00',
                    endTime: '2022-01-01T18:00:00+08:00',
                    parameter: {
                      parameterName: '15',
                      parameterUnit: 'C',
                    },
                  },
                ],
              },
              {
                elementName: 'CI',
                time: [
                  {
                    startTime: '2021-12-31T12:00:00+08:00',
                    endTime: '2021-12-31T18:00:00+08:00',
                    parameter: {
                      parameterName: '稍有寒意',
                    },
                  },
                  {
                    startTime: '2021-12-31T18:00:00+08:00',
                    endTime: '2022-01-01T06:00:00+08:00',
                    parameter: {
                      parameterName: '寒冷至稍有寒意',
                    },
                  },
                  {
                    startTime: '2022-01-01T06:00:00+08:00',
                    endTime: '2022-01-01T18:00:00+08:00',
                    parameter: {
                      parameterName: '寒冷至稍有寒意',
                    },
                  },
                ],
              },
              {
                elementName: 'PoP',
                time: [
                  {
                    startTime: '2021-12-31T12:00:00+08:00',
                    endTime: '2021-12-31T18:00:00+08:00',
                    parameter: {
                      parameterName: '10',
                      parameterUnit: '百分比',
                    },
                  },
                  {
                    startTime: '2021-12-31T18:00:00+08:00',
                    endTime: '2022-01-01T06:00:00+08:00',
                    parameter: {
                      parameterName: '20',
                      parameterUnit: '百分比',
                    },
                  },
                  {
                    startTime: '2022-01-01T06:00:00+08:00',
                    endTime: '2022-01-01T18:00:00+08:00',
                    parameter: {
                      parameterName: '20',
                      parameterUnit: '百分比',
                    },
                  },
                ],
              },
            ],
          },
        ],
        weatherAllLocationError: null,
        weatherAllLocationLoading: false,
      },
    });

    const { result } = renderHook(() => useWeather(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    const selectedTaipeiWeather = result.current.weatherAllLocation.find(
      (item) => item.locationName === '臺北市'
    );
    expect(
      result.current.creatWeatherCardList(selectedTaipeiWeather)
    ).toStrictEqual([
      {
        weatherDescriptionName: '陰天',
        weatherDescriptionCode: '7',
        weatherPeriodTime: '今天下午 至 今天晚上',
        maximumTemperature: '17°C',
        minimumTemperature: '16°C',
        probabilityOfPrecipitation: '10%',
      },
      {
        weatherDescriptionName: '陰天',
        weatherDescriptionCode: '7',
        weatherPeriodTime: '今天晚上 至 明天早上',
        maximumTemperature: '16°C',
        minimumTemperature: '15°C',
        probabilityOfPrecipitation: '20%',
      },
      {
        weatherDescriptionName: '陰天',
        weatherDescriptionCode: '7',
        weatherPeriodTime: '明天早上 至 明天晚上',
        maximumTemperature: '20°C',
        minimumTemperature: '15°C',
        probabilityOfPrecipitation: '20%',
      },
    ]);

    const selectedNewTaipeiCityWeather = result.current.weatherAllLocation.find(
      (item) => item.locationName === '新北市'
    );
    expect(
      result.current.creatWeatherCardList(selectedNewTaipeiCityWeather)
    ).toStrictEqual([
      {
        weatherDescriptionName: '陰天',
        weatherDescriptionCode: '7',
        weatherPeriodTime: '今天下午 至 今天晚上',
        maximumTemperature: '18°C',
        minimumTemperature: '16°C',
        probabilityOfPrecipitation: '10%',
      },
      {
        weatherDescriptionName: '陰天',
        weatherDescriptionCode: '7',
        weatherPeriodTime: '今天晚上 至 明天早上',
        maximumTemperature: '16°C',
        minimumTemperature: '15°C',
        probabilityOfPrecipitation: '20%',
      },
      {
        weatherDescriptionName: '陰天',
        weatherDescriptionCode: '7',
        weatherPeriodTime: '明天早上 至 明天晚上',
        maximumTemperature: '20°C',
        minimumTemperature: '15°C',
        probabilityOfPrecipitation: '20%',
      },
    ]);
    jest.useRealTimers();
  });
});
