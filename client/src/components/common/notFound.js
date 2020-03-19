import React, { Component } from 'react'
import { ErrorPage } from '_src/components/common/impImage'

class NotFound extends Component {

    render() {
        return (
            <div style={style.container}>
                <img src={ErrorPage} style={{ height: '35vmin', width: '35vmin' }} />
            </div>
        )
    }
}

export default NotFound
const style = {
    container: {
        height: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
}
