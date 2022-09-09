import React from "react";
import { Breadcrumb } from 'antd'
import { FiHome } from 'react-icons/fi'
import { IoIosArrowForward } from 'react-icons/io'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import {capitalize} from "../../utils";

const PageCrumbs = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter((i) => i);

    return (
        <>
            <Breadcrumb separator={<IoIosArrowForward/>}>
                <Breadcrumb.Item style={{ fontSize: 16}}>
                    <Link to={'/'}>
                        <FiHome style={{ color: 'var(--Gray-500)', fontSize: 16}}/>
                    </Link>
                </Breadcrumb.Item>
                {
                    pathSnippets.map((_, index) => {
                        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
                        return (

                            <Breadcrumb.Item key={url} style={{ fontSize: index === 0 && 16}}>
                                {
                                    isNaN(parseInt(pathSnippets[index])) &&
                                        <Link to={url} style={{
                                            color: index === pathSnippets.length -1 && 'var(--Primary-700)',
                                            fontSize: 14
                                        }}>
                                            {
                                                    capitalize(decodeURIComponent(pathSnippets[index]).replace('-',' '))
                                            }
                                        </Link>
                                }

                            </Breadcrumb.Item>
                        );
                    })
                }
            </Breadcrumb>
        </>
    )
};

PageCrumbs.defaultProps = {

}

PageCrumbs.propTypes = {

}

export default PageCrumbs;
