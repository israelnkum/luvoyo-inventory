import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";

function Qualifications (props) {
    return (
        <>Qualifications</>
    )
}

Qualifications.propTypes = {
    pageInfo: PropTypes.object,
}

export default connect()(Qualifications)
