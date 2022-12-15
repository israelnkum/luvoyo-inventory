import React from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import ProfileBg from '../../assets/img/dashboard/profile-bg.svg'
import PropTypes from 'prop-types'
import TlaImage from "../tla-image";

const GlobalStyles = createGlobalStyle`

  .profile-image {
    width: 70px;
    height: 70px;
    border: 4px solid #FFFFFF;
    box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);
    border-radius: 200px;
  }
  .profile-name {
    color: var(--Gray-900);
    margin-top: 15px;
  }

  .dash-item{
    margin-bottom: 12px;
    text-align: left;
    margin-left: 20px;
    display: flex;
    align-items: center;
    align-content: center;
    height: 50px;
  }
  .supporting-text {
    padding-top: 8px;
    margin-bottom: -8px;
  }
`
const ProfileContainer = styled.div`
  background: url(${ProfileBg}) center center no-repeat;
  border-radius: 0 10px 0 0;
  height: 100px;
`
const AvatarContainer = styled.div`
  margin-top: -32px;
  justify-content: center;
  display: block;
  text-align: center;
  align-items: center;
  align-content: center;
  margin-bottom: 5px;
`
function Profile ({name, photo}) {
    return (
        <>
            <GlobalStyles/>
            <ProfileContainer/>
            <AvatarContainer>
                <TlaImage name={name} preview={false} size={70} src={photo}/>
                <h3 className={'text-md-medium profile-name'}>{name}</h3>
            </AvatarContainer>
        </>
    )
}
Profile.propTypes = {
    name: PropTypes.string,
    photo: PropTypes.string,
}


export default Profile
