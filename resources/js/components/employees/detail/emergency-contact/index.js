import React from 'react'
import {Table, Space, Button, Tag} from 'antd'
import {connect} from "react-redux";
import TlaTableWrapper from "../../../../commons/table/tla-table-wrapper";
import TlaAddNew from "../../../../commons/tla-add-new";
import TlaEdit from "../../../../commons/tla-edit";
import TlaConfirm from "../../../../commons/TlaConfirm";

const { Column } = Table
const test = [
    {
        id: 1,
        name: 'Darrell Steward',
        relationship: '766360',
        phone: '0544513074',
        key: 'name',
    },
    {
        id: 2,
        name: 'Devon Lane',
        relationship: '766360',
        phone: "0544513074",
        key: 'name',
    },
    {
        id: 3,
        name: 'Cameron Williamson',
        relationship: '766360',
        phone: "0544513074",
        key: 'name',
    },
    {
        id: 4,
        name: 'Darrell Steward',
        relationship: '766360',
        phone: '0544513074',
        key: 'name',
    },
    {
        id: 5,
        name: 'Darrell Steward',
        relationship: '766360',
        phone: '0544513074',
        key: 'name',
    },
    {
        id: 6,
        name: 'Darrell Steward',
        relationship: '766360',
        phone: '0544513074',
        key: 'name',
    },
    {
        id: 7,
        name: 'Darrell Steward',
        relationship: '766360',
        phone: '0544513074',
        key: 'name',
    },
    {
        id: 8,
        name: 'Darrell Steward',
        relationship: '766360',
        phone: '0544513074',
        key: 'name',
    },
];
function EmergencyContacts () {
    return (
       <>
           <TlaTableWrapper extra={
               <TlaAddNew link={'#'}>
                   <Button>Add Contact</Button>
               </TlaAddNew>
           } callbackFunction={() => {}} data={test}>
               <Column title="Phone" render={({name, relationship}) => (
                   <Space size={0} direction={'vertical'}>
                       {name}
                       <Tag>{relationship}</Tag>
                   </Space>
               )}/>
               <Column title="Phone" render={({phone}) => (
                   <Space size={0} direction={'vertical'}>
                       {phone}
                       {phone}
                   </Space>
               )}/>
               <Column title="Email" dataIndex={'phone'}/>
               <Column title="Action" render={() => (
                   <Space size={0}>
                       <TlaEdit icon data={{}} link={'#'} type={'text'}/>
                       <TlaConfirm title={'Dependant'} callBack={()=>{}}/>
                   </Space>
               )}/>
           </TlaTableWrapper>
       </>
    )
}

EmergencyContacts.propTypes = {
}

export default connect()(EmergencyContacts)
