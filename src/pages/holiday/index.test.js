import { render, unmountComponentAtNode } from 'react-dom'
import { act } from "react-dom/test-utils"
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
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
import Holiday from './index'

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

    it('test', async () => {
        const store = mockStore({
            holiday: {
                holidayYearList: [],
                holiday: [],
                holidayError: null,
                holidayLoading: false,
            },
        })
        act(() => {
            render(<Provider store={store}><Holiday /></Provider>, container)
        })
    })
})