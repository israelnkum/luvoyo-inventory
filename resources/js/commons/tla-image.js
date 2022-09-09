import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Image } from 'antd'
import { getInitials } from '../utils'

export default function TlaImage ({ src, size, name, preview }) {
    return (
        <>
            {
                src === null
                    ? <Avatar style={{ background: 'var(--Primary-400)' }} size={size} src={src}>{getInitials(name)}</Avatar>
                    : <Avatar style={{ background: 'var(--Primary-400)' }}
                              size={size}
                              src={preview ? <Image src={src} /> : src}>{getInitials(name)}
                    </Avatar>
            }
        </>
    )
}

TlaImage.propTypes = {
    src: PropTypes.string,
    size: PropTypes.number,
    name: PropTypes.string.isRequired,
    preview: PropTypes.bool
}
TlaImage.defaultProps = {
    size: 120,
    src: null,
    preview: false,
    name: 'Default User'
}
