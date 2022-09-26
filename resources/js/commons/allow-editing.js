import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'antd'


function AllowEditing (props) {

    const { editing, setEditing } = props

    return (
        <Button onClick={() => {setEditing(!editing)}}>{editing ? 'Edit' : 'Cancel Editing'}</Button>
    )
}

AllowEditing.propTypes = {
    editing: PropTypes.bool,
    setEditing: PropTypes.func,
}

export default AllowEditing
