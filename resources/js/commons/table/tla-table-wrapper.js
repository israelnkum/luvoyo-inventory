import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {Table} from 'antd'
import { connect } from 'react-redux'
import TlaPagination from "./TlaPagination";

function TlaTableWrapper ({ meta, data, callbackFunction, children, numberColumn, numberColumnTitle, hasSelection, fetchId, extra }) {
    const [loading, setLoading] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    return (

        <TlaPagination extra={extra} meta={meta} loadData={(pageNumber) => {
            const params = fetchId ? ([fetchId, pageNumber]) : [pageNumber]
            setLoading(true);

            (callbackFunction(...params)).then(() => {
                    setLoading(false)
                }
            )}}>
            {
                data.length > 0 ?
                    <Table rowSelection={hasSelection ? rowSelection : null} pagination={false} loading={loading} dataSource={data} scroll={{ x: 50 }} rowKey={'id'}>
                        {
                            numberColumn &&
                            <Table.Column width={50} title={numberColumnTitle} render={(text, record, index) => {
                                let number = index + meta.from
                                return <>{`${number++}.`}</>
                            }}/>
                        }

                        {children}
                    </Table> :
                    <div align={'center'} style={{ padding: 150 }}>Oops! No data found</div>
            }
        </TlaPagination>
    )
}


TlaTableWrapper.defaultProps = {
    meta: {
        from: 1,
        to: 10,
        total: 500
    },
    data: [],
    numberColumnTitle: '#',
    numberColumn: true,
    hasSelection: false,
    fetchId: null
}

TlaTableWrapper.propTypes = {
    meta: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    callbackFunction: PropTypes.func,
    children: PropTypes.any,
    hasSelection: PropTypes.bool,
    fetchId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    numberColumnTitle: PropTypes.string,
    numberColumn: PropTypes.bool,
    extra: PropTypes.any,
}

const mapStateToProps = () => {
    return {
    }
}

export default connect(mapStateToProps)(TlaTableWrapper)
