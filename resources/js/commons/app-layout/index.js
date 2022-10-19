import React, {useEffect, useState} from 'react'
import {Layout, Spin} from 'antd'
import PropTypes from 'prop-types'
import AppHeader from "./app-header";
import AppSidebar from "./app-sidebar";
import {connect} from "react-redux";
import {getActiveRoles} from "../../actions/users/UserAction";
import ChangePassword from "../change-password";

const AppLayout = (props) => {
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(true)

    const toggle = () => {
        setOpen(!open)
    }
    const { children, getRoles, authUser } = props
    useEffect(() => {
        setLoading(true)
        getRoles().then(() => {
            setLoading(false)
        })
    }, [])
    return (
        <Spin spinning={loading}>
            {
                (!loading && authUser.default_password !== null) ?
                    <ChangePassword/> :
                    <Layout>
                        <AppSidebar setCollapsed={toggle} collapsed={open}/>
                        <Layout>
                            <Layout.Content style={{ margin: '0 15px 50px' }}>
                                <AppHeader/>
                                {/*<PageCrumbs/>*/}
                                <div style={{ minHeight: '100vh', marginTop: 10 }}>
                                    {children}
                                </div>
                            </Layout.Content>
                        </Layout>
                    </Layout>
            }
        </Spin>
    )
}
AppLayout.propTypes = {
    children: PropTypes.any,
    authUser: PropTypes.object.isRequired,
    getRoles: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    authUser: state.userReducer.loggedInUser
})


const mapDispatchToProps = (dispatch) => ({
    getRoles: () => dispatch(getActiveRoles('21993de6-123a-54c68c0b-1044-41a9-b084-32bfafe6bc84-4ae1-8f09-67e9640df8d6'))
})

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout)
