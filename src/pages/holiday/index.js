import React, { useState, useEffect } from 'react'

import useHoliday from './useHoliday'

import MuiLabelSelect from '../../components/MuiLabelSelect'
import { MuiPageSpinner } from '../../components/muiCircularProgress'
import MuiModal from '../../components/MuiModal'

import HolidayTable from './HolidayTable'
import MessageModal from './MessageModal'

const index = () => {
    const thisYear = String(new Date().getFullYear())
    const [selectedYear, setSelectedYear] = useState(thisYear)

    const {
        allHolidayYearList,
        filteredholidayData,
        allHolidayDataError,
        allHolidayDataLoading,
        getHolidayApi,
        getFakeHoliday,
        filterHolidayData,
    } = useHoliday()

    const [messageModalIsOpen, setMessageModalIsOpen] = useState(false)
    const handaleMessageModalOpen = () => { setMessageModalIsOpen(true) }
    const handaleMessageModalClose = () => { setMessageModalIsOpen(false) }

    useEffect(() => {
        if (allHolidayYearList.length > 0 && selectedYear) {
            filterHolidayData(selectedYear)
        }
    }, [selectedYear, allHolidayYearList])

    useEffect(() => {
        if (allHolidayYearList.length === 0) {
            getHolidayApi()
        }
    }, [])

    // 因為 api 不支援跨網域，且來源只提共csv檔
    // 故多了此步驟
    useEffect(() => {
        if (allHolidayDataError !== null && allHolidayYearList.length === 0) {
            console.log('use fake data')
            getFakeHoliday()
            handaleMessageModalOpen()
        }
    }, [allHolidayDataError])

    return (
        <div>
            <div className="page-title">國定假日</div>
            {allHolidayDataLoading &&
                <MuiPageSpinner />
            }
            {allHolidayDataLoading === false && filteredholidayData.length > 0 &&
                <>
                    <MuiLabelSelect
                        labelId="year-select-label"
                        labelText="Year"
                        SelectId="year-select"
                        value={selectedYear}
                        setValue={setSelectedYear}
                        selectionItems={allHolidayYearList}
                    />
                    <div className="table-container">
                        <HolidayTable rows={filteredholidayData} />
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
