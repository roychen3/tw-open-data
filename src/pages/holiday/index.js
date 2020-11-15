import React, { useEffect } from 'react'
import MULabelSelect from '../../components/MULabelSelect'
import HolidayTable from './HolidayTable'
import holidayFakeData from './fakeData.json'

const yearKeys = {}

const filterData = holidayFakeData.result.records.filter((item) => {
    const year = String(new Date(item.date).getFullYear())
    yearKeys[year] = year
    return item.holidayCategory !== '星期六、星期日'
})

const yearList = Object.keys(yearKeys).map((key) => {
    return { value: key, name: key }
})

const tableData = filterData.map((item) => {
    return {
        id: item.date,
        date: item.date,
        name: item.name,
        isHoliday: item.isHoliday,
        holidayCategory: item.holidayCategory,
        description: item.description,
    }
})

const tableColumns = [
    {
        id: 'date',
        name: '日期',
    },
    {
        id: 'name',
        name: '放假名稱',
    },
    {
        id: 'holidayCategory',
        name: '類型',
    },
    {
        id: 'description',
        name: '其他資訊'
    },
]

const index = () => {
    const thisYear = String(new Date().getFullYear())
    const [year, setYear] = React.useState(thisYear)
    const [tableRows, setTableRows] = React.useState([])

    useEffect(() => {
        const showTableData = tableData.filter((item) => String(new Date(item.date).getFullYear()) === year)
        setTableRows(showTableData)
        return () => {

        }
    }, [year])

    return (
        <div>
            <div className="page-title">國定假日</div>
            <MULabelSelect
                labelId="year-select-label"
                labelText="Year"
                SelectId="year-select"
                value={year}
                setValue={setYear}
                selectionItems={yearList}
            />
            <div className="table-container">
                <HolidayTable columns={tableColumns} rows={tableRows} />
            </div>
        </div>
    )
}

index.propTypes = {

}

export default index
