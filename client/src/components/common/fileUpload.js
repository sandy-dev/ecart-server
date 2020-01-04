import React, { Component } from 'react'
import axios from 'axios'

var _validFileExtensions = [".jpg", ".jpeg", ".png"]

export default class FileUpload extends Component {

    constructor(props) {
        super(props)

        this.state = {
            file: '',
            filename: '',
            uploadedFile: '',
            message: '',
        }
    }

    onChange(e) {

        let uploadFile = e.target.files[0]
        let uploadFileName = e.target.files[0].name
        var Extension = uploadFileName.substring(uploadFileName.lastIndexOf('.') + 1).toLowerCase()

        if (Extension == "jpg" || Extension == "png" || Extension == "jpeg") {
            this.setState({
                file: e.target.files[0],
                filename: e.target.files[0].name,
            })
        }
        else {
            document.getElementById(e.target.id).value = ""
            this.setState({ message: 'Only jpeg or png' })
        }
    }

    onSubmit(e) {

        e.preventDefault()
        if (this.state.file == '') {
            this.setState({ message: 'Please select an image' })
            return false
        }


        const formData = new FormData()
        formData.append('file', this.state.file)

        try {

            fetch('/upload', {
                method: 'post',
                headers: {
                },
                body: formData
            })
                .then(data => data.json())
                .then(json => {

                    const { fileName, filePath } = json

                    this.setState({
                        uploadedFile: filePath,
                        message: ''
                    })

                    this.props.onClick(fileName)
                })
                .catch(function (error) {
                    console.log(error)
                })

        } catch (err) {

            if (err.response.status === 500) {
                this.setState({ message: 'There was a problem with the server' })
            } else {
                this.setState({ message: err.response.data.msg })
            }
        }
    }

    render() {

        return (

            <div className='container-fileupload'>

                <div>

                    <input type='file' id='customFile' onChange={(event) => this.onChange(event)} />

                    <input type='submit' value='Upload' onClick={(e) => this.onSubmit(e)} />

                </div>

                {
                    this.state.message ? <span style={{ fontSize: 14 }}>{this.state.message}</span> : null
                }


                <div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <h3>{this.state.uploadedFile.fileName}</h3>
                        <img src={this.state.uploadedFile} alt='' />
                    </div>
                </div>

            </div >
        )
    }

}