import {
    GET_HOLIDAY,
    GET_HOLIDAY_SUCCESS,
    GET_HOLIDAY_FAILURE,
    RESET_HOLIDAY,
} from '../../constants/actionTypes'
import reducers from './reducers'

describe('holiday reducers', () => {
    it('should return the initial state', () => {
        expect(reducers(undefined, {})).toEqual(
            {
                holidayYearList: [],
                holiday: [],
                holidayError: null,
                holidayLoading: false,
            }
        )
    })

    it('should handle get holiday', () => {
        expect(
            reducers([], {
                type: GET_HOLIDAY,
                payload: undefined,
            })
        ).toEqual(
            {
                holidayLoading: true,
            }
        )
    })

    it('should handle get holiday success', () => {
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
        ];
        const fakeHoliday = [
            {
                date: "2020/1/1",
                name: "中華民國開國紀念日",
                isHoliday: "是",
                holidayCategory: "放假之紀念日及節日",
                description: "全國各機關學校放假一日。",
            },
            {
                date: "2020/1/4",
                name: "",
                isHoliday: "是",
                holidayCategory: "星期六、星期日",
                description: "",
            },
            {
                date: "2020/1/23",
                name: "",
                isHoliday: "是",
                holidayCategory: "調整放假日",
                description: "",
            },
            {
                date: "2020/1/28",
                name: "",
                isHoliday: "是",
                holidayCategory: "補假",
                description: "",
            },
        ];
        expect(
            reducers([], {
                type: GET_HOLIDAY_SUCCESS,
                payload: {
                    holidayYearList: fakeHolidayYearList,
                    holiday: fakeHoliday,
                }
            })
        ).toEqual(
            {
                holidayYearList: fakeHolidayYearList,
                holiday: fakeHoliday,
                holidayLoading: false,
            }
        )
    })

    it('should handle get holiday failure', () => {
        const payload = 'api error message'

        expect(
            reducers([], {
                type: GET_HOLIDAY_FAILURE,
                payload,
            })
        ).toEqual(
            {
                holidayError: payload,
                holidayLoading: false,
            }
        )
    })

    it('should handle reset holiday', () => {
        expect(
            reducers([], {
                type: RESET_HOLIDAY,
                payload: undefined,
            })
        ).toEqual(
            {
                holidayYearList: [],
                holiday: [],
                holidayError: null,
                holidayLoading: false,
            }
        )
    })
})