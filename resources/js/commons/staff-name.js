import React from 'react'
import {Space, Typography} from 'antd'
import TlaImage from "./tla-image";
import PropTypes from "prop-types";

function StaffName (props) {
    const { photo, name } = props

    return (
        <Space>
            <TlaImage size={30} preview={false} src={photo} name={name}/>
            <Typography.Text>{name}</Typography.Text>
        </Space>
    )
}

StaffName.propTypes = {
    photo: PropTypes.string,
    name: PropTypes.string,
}


export default StaffName
