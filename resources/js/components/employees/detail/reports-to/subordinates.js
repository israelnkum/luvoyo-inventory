import React from 'react'
import {Table, Space, Button, Tag, Typography} from 'antd'
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
        method: 'Direct',
        phone: '0544513074',
        key: 'name',
    },
    {
        id: 2,
        name: 'Devon Lane',
        method: 'Direct',
        phone: "0544513074",
        key: 'name',
    },
    {
        id: 3,
        name: 'Cameron Williamson',
        method: 'Indirect',
        phone: "0544513074",
        key: 'name',
    },
    {
        id: 4,
        name: 'Darrell Steward',
        method: 'Indirect',
        phone: '0544513074',
        key: 'name',
    }
];
function Subordinates () {
    return (
        <>
            <TlaTableWrapper extra={<Typography.Text>SUBORDINATES</Typography.Text>} callbackFunction={() => {}} data={test}>
                <Column title="Name" dataIndex={'name'}/>
                <Column title="Reporting Method" dataIndex={'method'}/>
            </TlaTableWrapper>
        </>
    )
}

Subordinates.propTypes = {
}

export default connect()(Subordinates)
