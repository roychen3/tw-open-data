import { unmountComponentAtNode } from 'react-dom'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library
import {
    getHoliday,
    getHolidaySuccess,
    getHolidayFailure,
} from '../../redux/actions'
import {
    GET_HOLIDAY,
    GET_HOLIDAY_SUCCESS,
    GET_HOLIDAY_FAILURE,
} from '../../constants/actionTypes'

import fakeApiData from './fakeData.json'

let container = null
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div')
    document.body.appendChild(container)
})

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container)
    container.remove()
    container = null
})

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('produce api result data', () => {
        const produceApiResultData = (data) => {
            const filterData = data.filter((item) => item.holidayCategory !== '星期六、星期日')

            return filterData.map((item) => ({
                id: item.date,
                date: item.date,
                name: item.name,
                isHoliday: item.isHoliday,
                holidayCategory: item.holidayCategory,
                description: item.description,
            }))
        }

        const fakeApiData = {
            success: true,
            result: {
                resource_id: '382000000A-000077-002',
                limit: 2000,
                total: 958,
                fields: [
                    {
                        type: 'text',
                        id: 'date'
                    },
                    {
                        type: 'text',
                        id: 'name'
                    },
                    {
                        type: 'text',
                        id: 'isHoliday'
                    },
                    {
                        type: 'text',
                        id: 'holidayCategory'
                    },
                    {
                        type: 'text',
                        id: 'description'
                    }
                ],
                records: [
                    {
                        date: '2020/1/1',
                        name: '中華民國開國紀念日',
                        isHoliday: '是',
                        holidayCategory: '放假之紀念日及節日',
                        description: '全國各機關學校放假一日。',
                    },
                    {
                        date: '2020/1/4',
                        name: '',
                        isHoliday: '是',
                        holidayCategory: '星期六、星期日',
                        description: '',
                    },
                    {
                        date: '2020/1/23',
                        name: '',
                        isHoliday: '是',
                        holidayCategory: '調整放假日',
                        description: '',
                    },
                    {
                        date: '2020/1/28',
                        name: '',
                        isHoliday: '是',
                        holidayCategory: '補假',
                        description: '',
                    },
                ]
            }
        }
        const fakeTableData = [
            {
                id: '2020/1/1',
                date: '2020/1/1',
                name: '中華民國開國紀念日',
                isHoliday: '是',
                holidayCategory: '放假之紀念日及節日',
                description: '全國各機關學校放假一日。',
            },
            {
                id: '2020/1/23',
                date: '2020/1/23',
                name: '',
                isHoliday: '是',
                holidayCategory: '調整放假日',
                description: '',
            },
            {
                id: '2020/1/28',
                date: '2020/1/28',
                name: '',
                isHoliday: '是',
                holidayCategory: '補假',
                description: '',
            },
        ]
        expect(produceApiResultData(fakeApiData.result.records)).toStrictEqual(fakeTableData)
    })

    it('produce holiday year list', () => {
        const produceHolidayYearList = (data) => {
            const yearKeys = {}
            data.forEach((item) => {
                const year = String(new Date(item.date).getFullYear())
                yearKeys[year] = year
            })
            return Object.keys(yearKeys).map((key) => ({ value: key, name: key }))
        }
        const fakeTableData = [
            {
                id: '2019/2/5',
                date: '2019/2/5',
                name: '春節',
                isHoliday: '是',
                holidayCategory: '放假之紀念日及節日',
                description: '全國各機關學校於二月五日至二月七日放假三日，其中二月七日適逢星期四，調整二月八日為放假日，並於一月十九日補行上班一日。'
            },
            {
                id: '2020/1/23',
                date: '2020/1/23',
                name: '',
                isHoliday: '是',
                holidayCategory: '調整放假日',
                description: ''
            },
            {
                id: '2021/12/31',
                date: '2021/12/31',
                name: '',
                isHoliday: '是',
                holidayCategory: '補假',
                description: '111年開國紀念日(一月一日)適逢星期六，於十二月三十一日補假。'
            }
        ]
        const fakeHolidayYearList = [
            {
                value: '2019',
                name: '2019'
            },
            {
                value: '2020',
                name: '2020'
            },
            {
                value: '2021',
                name: '2021'
            }
        ]
        expect(produceHolidayYearList(fakeTableData)).toStrictEqual(fakeHolidayYearList)
    })

    it('creates GET_HOLIDAY_SUCCESS when fetching holiday has been done', async () => {
        const store = mockStore({
            holidayYearList: [],
            holiday: [],
            holidayError: null,
            holidayLoading: false,
        })
        store.dispatch(getHoliday())

        const fakeHolidayYearList = [
            {
                value: '2019',
                name: '2019'
            },
            {
                value: '2020',
                name: '2020'
            },
            {
                value: '2021',
                name: '2021'
            }
        ]
        const fakeHoliday = [
            {
                date: '2020/1/1',
                name: '中華民國開國紀念日',
                isHoliday: '是',
                holidayCategory: '放假之紀念日及節日',
                description: '全國各機關學校放假一日。',
            },
            {
                date: '2020/1/23',
                name: '',
                isHoliday: '是',
                holidayCategory: '調整放假日',
                description: '',
            },
            {
                date: '2020/1/28',
                name: '',
                isHoliday: '是',
                holidayCategory: '補假',
                description: '',
            },
        ]
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeApiData)
            })
        )
        store.dispatch(getHolidaySuccess({
            holidayYearList: fakeHolidayYearList,
            holiday: fakeHoliday,
        }))
        const expectedActions = [
            { type: GET_HOLIDAY },
            {
                type: GET_HOLIDAY_SUCCESS,
                payload: {
                    holidayYearList: fakeHolidayYearList,
                    holiday: fakeHoliday,
                },
            }
        ]
        expect(store.getActions()).toEqual(expectedActions)

        // remove the mock to ensure tests are completely isolated
        global.fetch.mockRestore()
    })

    it('creates GET_HOLIDAY_FAILURE when fetching holiday has error', async () => {
        const store = mockStore({
            holidayYearList: [],
            holiday: [],
            holidayError: null,
            holidayLoading: false,
        })
        store.dispatch(getHoliday())

        const errorMessage = 'api error message'
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.reject(errorMessage)
            })
        )

        store.dispatch(getHolidayFailure(errorMessage))
        const expectedActions = [
            { type: GET_HOLIDAY },
            {
                type: GET_HOLIDAY_FAILURE,
                payload: errorMessage,
            }
        ]
        expect(store.getActions()).toEqual(expectedActions)

        // remove the mock to ensure tests are completely isolated
        global.fetch.mockRestore()
    })
})