import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import {
    getHoliday,
    getHolidaySuccess,
    getHolidayFailure,
} from '../../redux/actions'

import holidayFakeData from './fakeData.json'

const useHoliday = () => {
    const dispatch = useDispatch()

    const allHolidayData = useSelector((state) => state.holiday.holiday)
    const allHolidayDataError = useSelector((state) => state.holiday.holidayError)
    const allHolidayDataLoading = useSelector((state) => state.holiday.holidayLoading)
    const allHolidayYearList = useSelector((state) => state.holiday.holidayYearList)

    const [filteredholidayData, setFilteredHolidayData] = useState([])

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

    const produceHolidayYearList = (data) => {
        const yearList = new Set([])
        data.forEach((item) => {
            const year = String(new Date(item.date).getFullYear())
            yearList.add(year)
        })
        return Array.from(yearList).map((year) => ({ value: year, name: year }))
    }

    const filterHolidayData = (selectedYear) => {
        if (allHolidayData.length > 0 && selectedYear) {
            const showTableData = allHolidayData.filter((item) => String(new Date(item.date).getFullYear()) === selectedYear)
            setFilteredHolidayData(showTableData)
        }
    }

    const getHolidayApi = async () => {
        dispatch(getHoliday())
        // 備用網頁，手動下載用：
        // https://data.ntpc.gov.tw/datasets/308DCD75-6434-45BC-A95F-584DA4FED251
        const httpClient = axios.create()
        httpClient.defaults.timeout = 3000
        return await httpClient.get('https://cors-anywhere.herokuapp.com/http://data.ntpc.gov.tw/api/v1/rest/datastore/382000000A-000077-002')
            .then((resultData) => {
                const tableData = produceApiResultData(resultData.result.records)
                const yearList = produceHolidayYearList(tableData)
                dispatch(getHolidaySuccess({
                    holidayYearList: yearList,
                    holiday: tableData,
                }))
                const thisYear = String(new Date().getFullYear())
                filterHolidayData(thisYear)
            })
            .catch((err) => {
                dispatch(getHolidayFailure(err))
            })
    }

    // 因為 api 壞掉，所以用假資料代替，
    // 故多了此 function
    const getFakeHoliday = () => {
        const tableData = produceApiResultData(holidayFakeData.result.records)
        const yearList = produceHolidayYearList(tableData)
        dispatch(getHolidaySuccess({
            holidayYearList: yearList,
            holiday: tableData,
        }))
    }

    return {
        allHolidayYearList,
        filteredholidayData,
        allHolidayDataError,
        allHolidayDataLoading,
        getHolidayApi,
        getFakeHoliday,
        filterHolidayData,
        produceApiResultData,
        produceHolidayYearList,
    }
}

useHoliday.propTypes = {

}

export default useHoliday
