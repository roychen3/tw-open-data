import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const StyledTable = styled(Table)`
min-width: 700px;
background-color: ${({ theme }) => theme.mainBackground};
border: 1px solid ${({ theme }) => theme.secondBackground};
`
const StyledTableHead = styled(TableHead)`
background-color: ${({ theme }) => theme.secondBackground};
`
const StyledTableRow = styled(TableRow)`
&.table-row-highlight {
    background-color: ${({ theme }) => theme.highlight};
}

:hover {
    background-color: ${({ theme }) => theme.hover};
}
`
const StyledTableCellHeader = styled(TableCell)`
color: ${({ theme }) => theme.mainText} !important;
border-bottom: 1px solid ${({ theme }) => theme.secondBackground} !important;
white-space: nowrap;
`
const StyledTableCell = styled(TableCell)`
color: ${({ theme }) => theme.mainText} !important;
border-bottom: 1px solid ${({ theme }) => theme.secondBackground} !important;
`

const columns = [
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


const HolidayTable = ({ rows }) => {
    const tableCellColumns = columns.map((column) => <StyledTableCellHeader key={column.id} align="center">{column.name}</StyledTableCellHeader>)

    const tableBadyRowList = rows.map((row, index) => (
        <StyledTableRow key={index} className={row.isHoliday === '否' ? 'table-row-highlight' : ''}>
            <StyledTableCell align="left">
                {`${row.date}`}
                <p>{new Date(row.date).toLocaleString(window.navigator.language, { weekday: 'long' })}</p>
            </StyledTableCell>
            <StyledTableCell align="left">{row.name}</StyledTableCell>
            <StyledTableCell align="left">{row.holidayCategory}</StyledTableCell>
            <StyledTableCell align="left">{row.description}</StyledTableCell>
        </StyledTableRow>))

    return (
        <TableContainer>
            <StyledTable aria-label="year-table">
                <StyledTableHead>
                    <TableRow>
                        {tableCellColumns}
                    </TableRow>
                </StyledTableHead>
                <TableBody>
                    {tableBadyRowList}
                </TableBody>
            </StyledTable>
        </TableContainer>
    )
}

HolidayTable.propTypes = {
    rows: PropTypes.instanceOf(Array).isRequired,
}

export default HolidayTable
