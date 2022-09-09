import React from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";

function Dashboard (props) {
    const {activeRoles} = props
    return (
        <>
           Dashboard
        </>
    )
}

Dashboard.propTypes = {
    activeRoles: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
    return {
        activeRoles : state.userReducer.activeRoles
    }
}

export default connect(mapStateToProps)(Dashboard)
