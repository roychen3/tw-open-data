import React from 'react'
import PropTypes from 'prop-types'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

import { WEB_COLOR_WHITE } from '../constants/color'
import '../assets/css/globalMUDataGrid.scss'

const theme = createMuiTheme({
    overrides: {
        MuiDataGrid: {
            root: {
                color: WEB_COLOR_WHITE,
            },
        },
    },
});

const MUDataGrid = ({ rows, columns }) => {
    return (
        <ThemeProvider theme={theme}>
            <div style={{ height: "300px", width: "100%" }}>
                <DataGrid rows={rows} columns={columns} loading={false} hideFooter={true} />
            </div>
        </ThemeProvider>
    )
}

MUDataGrid.propTypes = {
    rows: PropTypes.instanceOf(Array).isRequired,
    columns: PropTypes.instanceOf(Array).isRequired,
}

export default MUDataGrid
