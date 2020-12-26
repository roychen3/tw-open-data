import { renderHook, act } from '@testing-library/react-hooks'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import useHoliday from './useHoliday'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('useHoliday', () => {
    const store = mockStore({
        holiday: {
            holidayYearList: [],
            holiday: [],
            holidayError: null,
            holidayLoading: false,
        },
    })

    const { result } = renderHook(() => useHoliday(), {
        wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    })

    it('produce api result data', () => {
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
        expect(result.current.produceApiResultData(fakeApiData.result.records)).toStrictEqual(fakeTableData)
    })

    it('produce holiday year list', () => {
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
        expect(result.current.produceHolidayYearList(fakeTableData)).toStrictEqual(fakeHolidayYearList)
    })
})
