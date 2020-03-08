import React from 'react'
import { Paper, Typography } from '@material-ui/core'

export const footer = (props) => {
    return (
        <Paper sm={12} style={style.footer}>
            <Typography variant="caption" noWrap={false}> Contacts: confik.lab@gmail.com </Typography>
            {/* <Typography variant="caption" noWrap={false}> © Copyright 2019 Confik Lab - All Rights Reserved</Typography> */}
        </Paper >
    )
}
const style = {
    footer: {
        height: 50,
        width: '100%',
        backgroundColor: '#e8eaf6',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
    }
}
export default footer




