import React, { Component } from 'react'
import { ErrorPage } from '_src/components/common/impImage'

class NotFound extends Component {

    render() {
        return (
            <div className='container-notFound'>
                <img src={ErrorPage} style={{ height: '35vmin', width: '35vmin' }} />
            </div>
        )
    }
}

export default NotFound
