import React from 'react'
import PropTypes from 'prop-types'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { WEB_COLOR_BLACK, WEB_COLOR_OXFORDBLUE, WEB_COLOR_ORANGEWEB, WEB_COLOR_PLATINUM, WEB_COLOR_WHITE, WEB_COLOR_DARK_HOVER } from '../../constants/color'

const theme = createMuiTheme({
    overrides: {
        MuiTable: {
            root: {
                minWidth: '812px',
                backgroundColor: WEB_COLOR_OXFORDBLUE,
                border: 'black 1px solid',
            },
        },
        MuiTableRow: {
            root: {
                '&.table-row-highlight': {
                    backgroundColor: WEB_COLOR_ORANGEWEB
                },
                '&:hover': {
                    backgroundColor: WEB_COLOR_DARK_HOVER,
                }
            },
            hover: {
                backgroundColor: WEB_COLOR_OXFORDBLUE,
            }

        },
        MuiTableCell: {
            root: {
                borderBottom: `1px solid ${WEB_COLOR_BLACK}`,
            },
            head: {
                color: WEB_COLOR_PLATINUM,
                backgroundColor: WEB_COLOR_BLACK,
            },
            body: {
                color: WEB_COLOR_WHITE,
            },
        },
    },
})

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
    const tableCellColumns = columns.map((column) => <TableCell key={column.id} align="center">{column.name}</TableCell>)

    const tableBadyRowList = rows.map((row, index) => (
        <TableRow key={index} className={row.isHoliday === '否' ? 'table-row-highlight' : ''}>
            <TableCell align="left">
                {`${row.date}`}
                <p>{new Date(row.date).toLocaleString(window.navigator.language, { weekday: 'long' })}</p>
            </TableCell>
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="left">{row.holidayCategory}</TableCell>
            <TableCell align="left">{row.description}</TableCell>
        </TableRow>))

    return (
        <ThemeProvider theme={theme}>
            <TableContainer component={Paper}>
                <Table aria-label="year-table">
                    <TableHead>
                        <TableRow>
                            {tableCellColumns}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableBadyRowList}
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
    )
}

HolidayTable.propTypes = {
    rows: PropTypes.instanceOf(Array).isRequired,
}

export default HolidayTable
