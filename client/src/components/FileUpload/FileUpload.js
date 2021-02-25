import React, { Fragment, useState } from 'react'
import axios from 'axios';
import { Button } from '@material-ui/core';
import Message from './Message';
import Progress from './Progress';

function FileUpload() {

    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose Gif');
    // eslint-disable-next-line no-unused-vars
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setuploadPercentage] = useState(0);

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart-form-data'
                },
                onUploadProgress: ProgressEvent => {
                    setuploadPercentage(parseInt(Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)))

                    //clear percentage
                    setTimeout(() => setuploadPercentage(0), 10000);
                }


            });
            const { fileName, filePath } = res.data;

            setUploadedFile({ fileName, filePath });

            setMessage('File Uploaded!');
        } catch (error) {
            if (error.response.status === 500) {
                setMessage("there was a problem with server")
            } else {
                setMessage(error.response.data.msg);
            }
        }
    }

    return (
        <Fragment>
            { message ? <Message msg={message} /> : null}

            <form>
                <div>
                    <input type="file" id="customFile" accept="image/gif" onChange={onChange} />
                    <label for="customFile">{filename}</label>

                    <Progress percentage={uploadPercentage} />

                    <Button onClick={onSubmit} >Submit</Button>
                </div>
            </form>
        </Fragment>
    )
}

export default FileUpload