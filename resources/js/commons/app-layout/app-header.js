import React, {useState} from 'react'
import Logo from '../../components/Logo'
import {Affix, Button, Col, Layout, Row} from 'antd'
import PoweroffOutlined from '@ant-design/icons/lib/icons/PoweroffOutlined'
import {useDispatch} from 'react-redux'
import {logout} from '../../actions/logout/LogoutAction'

export default function AppHeader () {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const handleLogout = () => {
    setLoading(true)
    dispatch(logout()).then(() => {
      window.location.reload()
      window.location.replace('/login')
      setLoading(false)
    })
  }

  return (
        <Affix offsetTop={2}>
            <Layout.Header style={{ borderRadius: '10px', backgroundColor: '#fff', marginTop: 5, borderBottom: 'solid #d9d9d9 1px' }}>
                <div className="logo" align={'center'}>
                    <Logo/>
                </div>
                <Row justify="space-around" align="middle">
                    <Col className={'mobileHidden'} span={17} xs={10} sm={18}>

                    </Col>
                    <Col span={6} xs={24} sm={6}>
                        <div align={'right'} >
                            <Button loading={loading} title={'Logout'} onClick={() => handleLogout()} icon={<PoweroffOutlined size={'small'}/>} type={'default'}/>
                        </div>
                    </Col>
                </Row>
            </Layout.Header>
        </Affix>
  )
}
