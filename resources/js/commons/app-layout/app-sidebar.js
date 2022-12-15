import React from 'react'
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
import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
    .ant-menu.ant-menu-dark, .ant-menu-dark .ant-menu-sub, .ant-menu.ant-menu-dark .ant-menu-sub {
        color: rgba(255, 255, 255, 0.65);
        background: #ffffff;
    }
`
function AppSidebar (props) {
    const {authUser} = props

    return (
        <Layout.Sider
            theme={'light'}
            breakpoint="lg"
            collapsedWidth="80"
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <GlobalStyles/>
            <div align={'center'}>
                <SideProfile name={authUser.name} photo={authUser.photo}/>
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
