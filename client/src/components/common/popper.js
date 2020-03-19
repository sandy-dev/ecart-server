import React from 'react'
import { Popper, Fade, Typography } from '@material-ui/core'

function popper(props) {
    const open = Boolean(props.anchorEl)
    const id = open ? 'transitions-popper' : undefined
    return (
        <Popper id={id} open={open} anchorEl={props.anchorEl} placement={'bottom'} transition>
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <div style={style.paper}>
                        <Typography variant="body1"> {props.text}</Typography>
                    </div>
                </Fade>
            )}
        </Popper>
    )
}
const style = {
    paper: {
        padding: 5,
        marginLeft: 10,
        backgroundColor: '#FFECB3',
    }
}
export default popper


