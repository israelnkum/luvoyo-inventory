import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {handleGetBusinessDetail} from "../../actions/businesses/BusinessAction";
import ViewAllWrapper from "../../commons/view-all-wrapper";
import Statistics from "./statistics";

function Dashboard (props) {
    const { getBusinessDetail } = props
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getBusinessDetail().then(() => setLoading(false))
    })

    return (
            <ViewAllWrapper loading={loading} noData={false}>
                <div style={{ padding: 10 }}>
                    <Statistics/>
                </div>
            </ViewAllWrapper>
    )
}

Dashboard.propTypes = {
    activeRoles: PropTypes.array.isRequired,
    getBusinessDetail: PropTypes.func.isRequired,
    authUser: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        activeRoles : state.userReducer.activeRoles,
        authUser: state.userReducer.loggedInUser
    }
}

const mapDispatchDispatchToProps = (dispatch) => ({
    getBusinessDetail: () => dispatch(handleGetBusinessDetail())
})

export default connect(mapStateToProps, mapDispatchDispatchToProps)(Dashboard)
