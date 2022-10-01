import React from 'react'
import {isMobile} from 'react-device-detect'
import {Layout} from 'antd'
import MenuHelper from "../menu-helper";
import {SidebarMenus} from "../../utils";
import {FiHome, FiUser,FiSettings} from "react-icons/fi";
import {BsTruck} from "react-icons/bs";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import SideProfile from "./side-profile";
import {IoBusinessOutline} from "react-icons/io5";
import {RiProductHuntLine} from "react-icons/ri";
import {GoListUnordered} from "react-icons/go";
import {TbCash} from "react-icons/tb";
import {SiExpensify} from "react-icons/si";

function AppSidebar (props) {
    const {authUser, collapsed, setCollapsed} = props

    return (
        <Layout.Sider theme={'light'} className={'sideBar'}  collapsed={collapsed} onCollapse={setCollapsed}
                      breakpoint="lg" collapsedWidth={isMobile ? 0 : 80}
                      style={isMobile ? { height: '100vh', zIndex: 1, position: 'fixed', left: 0 } : {height: '100vh', position: 'fixed', left: 8, top: 5 }}
        >
            <div align={'center'}>
                <SideProfile name={authUser.name}/>
            </div>
            <MenuHelper disabled={authUser.default_password !== null} icons={{
                home: <FiHome/>,
                pim: <FiUser/>,
                config: <FiSettings/>,
                trucks: <BsTruck/>,
                businesses: <IoBusinessOutline/>,
                product: <RiProductHuntLine/>,
                'dispatch-order': <GoListUnordered/>,
                'cash-up': <TbCash/>,
                'expenses': <SiExpensify/>,
            }} menus={SidebarMenus} direction={'inline'}/>
        </Layout.Sider>
    )
}

AppSidebar.defaultProps = {
    collapsed: true,
    setCollapsed: ()=>{},
}
AppSidebar.propTypes = {
    authUser: PropTypes.object.isRequired,
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func,
}
const mapStateToProps = (state) => ({
    authUser : state.userReducer.loggedInUser,
})

export default connect(mapStateToProps)(AppSidebar)
