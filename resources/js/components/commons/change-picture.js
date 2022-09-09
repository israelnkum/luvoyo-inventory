import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
    Upload,
    Modal
} from 'antd'
import ImgCrop from 'antd-img-crop'
export default function ChangePicture (props) {
    const {selectedFile} = props
    const [preview, setPreview] = useState({
        image: '',
        visible: false,
        title: ''
    })
    function getBase64 (file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }
    const onPreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setPreview({
            image: file.url || file.preview,
            visible: true,
            title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        })
    }
    useEffect(() => {
    }, [])
    return (
        <div align={'center'}>
            <ImgCrop rotate>
                <Upload {...props.uploadProps} onPreview={onPreview}>
                    {selectedFile == null ? 'Select' : 'Change'} Image
                </Upload>
            </ImgCrop>
            <Modal
                width={400}
                visible={preview.visible}
                title={preview.title}
                footer={null}
                onCancel={() => { setPreview({ visible: false }) }}>
                <img alt="Profile Picture" style={{ width: '100%' }} src={preview.image} />
            </Modal>
        </div>
    )
}
ChangePicture.propTypes = {
    uploadProps: PropTypes.object.isRequired,
    selectedFile: PropTypes.any
}
