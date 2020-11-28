import {
    GET_HOLIDAY,
    GET_HOLIDAY_SUCCESS,
    GET_HOLIDAY_FAILURE,
    RESET_HOLIDAY,
} from '../../constants/actionTypes'
import {
    getHoliday,
    getHolidaySuccess,
    getHolidayFailure,
    resetHoliday,
} from './actions'

describe('actions', () => {
    it('should create an action to get holiday', () => {
        const payload = undefined
        const expectedAction = {
            type: GET_HOLIDAY,
            payload
        }
        expect(getHoliday()).toEqual(expectedAction)
    })

    it('should create an action to get holiday success', () => {
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
        const payload = fakeHoliday
        const expectedAction = {
            type: GET_HOLIDAY_SUCCESS,
            payload
        }
        expect(getHolidaySuccess(payload)).toEqual(expectedAction)
    })

    it('should create an action to get holiday failure', () => {
        const payload = 'api error message'
        const expectedAction = {
            type: GET_HOLIDAY_FAILURE,
            payload
        }
        expect(getHolidayFailure(payload)).toEqual(expectedAction)
    })

    it('should create an action to reset holiday', () => {
        const payload = undefined
        const expectedAction = {
            type: RESET_HOLIDAY,
            payload
        }
        expect(resetHoliday()).toEqual(expectedAction)
    })
})
