import React, { useEffect } from 'react'
import MULabelSelect from '../../components/MULabelSelect'
import MUDataGrid from '../../components/MUDataGrid'
import holidayFakeData from './fakeData.json'

const filterData = holidayFakeData.result.records.filter((item) => item.holidayCategory !== '星期六、星期日')

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

const yearList = [
    { value: 2021, name: 2021 },
    { value: 2020, name: 2020 },
    { value: 2019, name: 2019 },
    { value: 2018, name: 2018 },
]

const columns = [
    { field: 'date', headerName: '日期', width: 110 },
    { field: 'name', headerName: '放假名稱', width: 200 },
    { field: 'holidayCategory', headerName: '類型', width: 200 },
    { field: 'description', headerName: '其他資訊', width: 300 },
];

const index = () => {
    const [year, setYear] = React.useState(new Date().getFullYear());
    const [rows, setRows] = React.useState([]);

    useEffect(() => {
        const showTableData = tableData.filter((item) => new Date(item.date).getFullYear() === year)
        setRows(showTableData)
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
            <MUDataGrid rows={rows} columns={columns} />
        </div>
    )
}

index.propTypes = {

}

export default index
