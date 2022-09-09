import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";

function Salary (props) {
    return (
        <>Salary</>
    )
}

Salary.propTypes = {
    pageInfo: PropTypes.object,
}

export default connect()(Salary)
