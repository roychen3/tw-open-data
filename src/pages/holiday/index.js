import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import {
    getHoliday,
    getHolidaySuccess,
    getHolidayFailure,
} from '../../redux/actions'

import MuiLabelSelect from '../../components/MuiLabelSelect'
import { MuiPageSpinner } from '../../components/muiCircularProgress'
import MuiModal from '../../components/MuiModal'

import HolidayTable from './HolidayTable'
import MessageModal from './MessageModal'
import holidayFakeData from './fakeData.json'

const index = () => {
    const dispatch = useDispatch()
    const holidayYearList = useSelector((state) => state.holiday.holidayYearList)
    const holidayData = useSelector((state) => state.holiday.holiday)
    const holidayDataError = useSelector((state) => state.holiday.holidayError)
    const holidayDataLoading = useSelector((state) => state.holiday.holidayLoading)

    const thisYear = String(new Date().getFullYear())
    const [selectedYear, setSelectedYear] = useState(thisYear)
    const [tableRows, setTableRows] = useState([])
    const [messageModalIsOpen, setMessageModalIsOpen] = useState(false)

    const handaleMessageModalOpen = () => { setMessageModalIsOpen(true) }
    const handaleMessageModalClose = () => { setMessageModalIsOpen(false) }

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
        const yearKeys = {}
        data.forEach((item) => {
            const year = String(new Date(item.date).getFullYear())
            yearKeys[year] = year
        })
        return Object.keys(yearKeys).map((key) => ({ value: key, name: key }))
    }

    const getHolidayApi = () => {
        dispatch(getHoliday())
        // 備用網頁，手動下載用：
        // https://data.ntpc.gov.tw/datasets/308DCD75-6434-45BC-A95F-584DA4FED251
        axios.get('https://cors-anywhere.herokuapp.com/http://data.ntpc.gov.tw/api/v1/rest/datastore/382000000A-000077-002')
            .then((resultData) => {
                const tableData = produceApiResultData(resultData.result.records)
                const yearList = produceHolidayYearList(tableData)
                dispatch(getHolidaySuccess({
                    holidayYearList: yearList,
                    holiday: tableData,
                }))
            })
            .catch((err) => {
                dispatch(getHolidayFailure(err))
            })
    }

    useEffect(() => {
        if (holidayData.length > 0 && selectedYear) {
            const showTableData = holidayData.filter((item) => String(new Date(item.date).getFullYear()) === selectedYear)
            setTableRows(showTableData)
        }
    }, [selectedYear, holidayData])

    useEffect(() => {
        if (holidayData.length === 0) {
            getHolidayApi()
        }
    }, [])

    // 因為 api 壞掉，所以用假資料代替，
    // 故多了此步驟
    useEffect(() => {
        if (holidayDataError !== null && holidayData.length === 0) {
            console.log('use fake data')
            const tableData = produceApiResultData(holidayFakeData.result.records)
            const yearList = produceHolidayYearList(tableData)
            dispatch(getHolidaySuccess({
                holidayYearList: yearList,
                holiday: tableData,
            }))
            handaleMessageModalOpen()
        }
    }, [holidayDataError])

    return (
        <div>
            <div className="page-title">國定假日</div>
            {holidayDataLoading &&
                <MuiPageSpinner />
            }
            {holidayDataLoading === false && tableRows.length > 0 &&
                <>
                    <MuiLabelSelect
                        labelId="year-select-label"
                        labelText="Year"
                        SelectId="year-select"
                        value={selectedYear}
                        setValue={setSelectedYear}
                        selectionItems={holidayYearList}
                    />
                    <div className="table-container">
                        <HolidayTable rows={tableRows} />
                    </div>
                </>
            }
            <MuiModal
                open={messageModalIsOpen}
                handaleClose={handaleMessageModalClose}
            >
                <MessageModal />
            </MuiModal>
        </div>
    )
}

index.propTypes = {

}

export default index
