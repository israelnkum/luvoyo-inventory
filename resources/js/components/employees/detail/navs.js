import React from 'react'
import {Card, Image, List} from 'antd'
import {FiUser, FiPhoneCall, FiUsers} from "react-icons/fi";
import {BsBriefcase} from "react-icons/bs";
import {TbCertificate, TbReportAnalytics} from "react-icons/tb";
import {Link, useLocation} from "react-router-dom";
import styled, {createGlobalStyle} from "styled-components";
import Avatar from "../../../assets/img/profile/avata.svg";

const GlobalStyles = createGlobalStyle`
      .active-nav {
        background: var(--Primary-50);
        border-radius: 8px
      }

       .emp-profile-image {
            width: 100px;
            height: 100px;
            border: 4px solid #FFFFFF;
            box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);
            border-radius: 200px;
          }
    `
const AvatarContainer = styled.div`
  margin-top: -32px;
  justify-content: center;
  display: block;
  text-align: center;
  align-items: center;
  align-content: center;
  margin-bottom: 35px;
`
function Navs () {

    // const url = data.title.toLowerCase().replace(' ','-')
    const location = useLocation()

    const modules = [
        {
            title: 'Personal Details',
            icon: <FiUser/>,
        },
        {
            title: 'Contact Details',
            icon: <FiPhoneCall/>,
        },
        {
            title: 'Emergency Contacts',
            icon: <FiPhoneCall/>,
        },
        {
            title: 'Dependents',
            icon: <FiUsers/>,
        },
        {
            title: 'Job',
            icon: <BsBriefcase/>,
        },
        // {
        //     title: 'Salary',
        //     icon: <BiCoinStack/>,
        // },
        {
            title: 'Reports-to',
            icon: <TbReportAnalytics/>,
        },
        {
            title: 'Qualifications',
            icon: <TbCertificate/>,
        }
    ]
    function formatUrl (text) {
        return text.toLowerCase().replace(' ','-')
    }
    return (
        <Card>
            <GlobalStyles/>
            <AvatarContainer>
                <Image src={Avatar} preview={false} className={'emp-profile-image'}/>
                <h3 className={'text-md-medium profile-name'}>{'Amos Appiah Nkum'}</h3> <br/>
                <h4 className={'text-sm-normal profile-job-title'}>Product Designer</h4>
            </AvatarContainer>
            <List
                size="small"
                itemLayout="horizontal"
                dataSource={modules}
                renderItem={(item) => {
                    const to = formatUrl(item.title)
                    const match = location.pathname === `/pim/employees/single/${to}`
                    return <List.Item className={match ? 'active-nav' : ''}>
                        <List.Item.Meta
                            avatar={item.icon}
                            title={<Link to={to}>{item.title}</Link>}
                        />
                    </List.Item>
                }}
            />
        </Card>
    )
}

Navs.propTypes = {
}

export default Navs
