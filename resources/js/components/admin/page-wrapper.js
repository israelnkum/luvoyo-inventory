import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Outlet} from 'react-router'
import {Button, Card, Col, Row, Space} from 'antd'
import {FiArrowLeft, FiPlus} from 'react-icons/fi'
import {createGlobalStyle} from 'styled-components'
import TlaAddNew from '../../commons/tla-add-new'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import TlaImage from "../../commons/tla-image";
import PageCrumbs from "./page-crumbs";

const GlobalStyles = createGlobalStyle`
      .inner-card .ant-card-body {
        padding: 10px;
      }
      .inner-card .ant-card-head {
        padding: 0 10px ;
      }
      .inner-card .ant-card-head-title {
        padding: 10px 0;
      }
    `


function PageWrapper () {
    const [pageInfo, setPageInfo] = useState({});
    const [extra, setExtra] = useState(<></>);

    const PageTitle = (
        <Row align={'middle'} justify={'space-between'}>
            <Col span={12}>
                <Space>
                    {/*<Button icon={<FiArrowLeft/>}>Go Back</Button>*/}
                    <h3 className="text-title" style={{ fontSize: 18, paddingTop: 5 }}>{pageInfo.title}</h3>
                </Space>
            </Col>
            <Col span={12}>
                {
                    pageInfo.addLink &&
                    <div align={'right'}>
                        {
                            !pageInfo.modalLink ?
                                <TlaAddNew link={pageInfo.addLink} data={pageInfo?.extraInfo}>
                                    <Button size={'large'} className={'btn tla-btn-primary'} icon={<FiPlus/>}>&nbsp;Add {pageInfo.buttonText ?? pageInfo.title}</Button>
                                </TlaAddNew> :
                                <Link to={pageInfo.addLink}>
                                    <Button size={'large'} className={'btn tla-btn-primary'} icon={<FiPlus/>}>&nbsp;Add {pageInfo.buttonText ?? pageInfo.title}</Button>
                                </Link>
                        }

                    </div>
                }
                {
                    pageInfo.image && <div align={'right'}> <TlaImage size={40} src={'Avatar'}/></div>
                }
            </Col>
        </Row>
    )
    return (
        <>
            <GlobalStyles/>
            <Card size={'small'}>
                <PageCrumbs/> <br/>
                <Card className={'inner-card'}
                      title={PageTitle}>
                    <Row align={'middle'} justify={'space-between'}>
                        <Col span={12}>
                            {extra}
                        </Col>
                        <Col span={8}>
                            {/*<TlaSearch/>*/}
                        </Col>
                    </Row>
                    <Outlet context={{setPageInfo, setExtra }}/>
                </Card>
            </Card>
        </>
    )
}


PageWrapper.defaultProps = {
    pageInfo: {
        addLink: null
    }
}

PageWrapper.propTypes = {
    pageInfo: PropTypes.object
}

export default connect()(PageWrapper)
