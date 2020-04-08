import React, { Component } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

export class AvatarView extends Component {
  render() {
    const { userDetails, userCounts, onCountClick } = this.props;
    return (
      <AvatarContainer>
        {userDetails &&
        <AvatarTooltip
          data-for={userDetails._id}
          data-tip
        >
          <div>
            <Avatar src={userDetails.avatar} />
            <ReactTooltip
              id={userDetails._id}
              place="bottom"
              type="info"
              effect="float"
            >
              Name: {userDetails.name}<br />
              Email: {userDetails.email}<br />
              LastActive: {userDetails.lastActiveDate}
            </ReactTooltip>
          </div>
        </AvatarTooltip>
        }
        {userCounts &&
        <AvatarTooltip
          data-for="avatarCount"
          data-tip
        >
          <div>
            <CountAvatar onClick={onCountClick}>+ {userCounts}</CountAvatar>
            <ReactTooltip
              id="avatarCount"
              place="bottom"
              type="info"
              effect="float"
            >
              Please click to get Users Details
            </ReactTooltip>
          </div>
        </AvatarTooltip>
        }
      </AvatarContainer>
    )
  }
}

AvatarView.propTypes = {
  userDetails: PropTypes.object,
  userCounts: PropTypes.number,
  onCountClick: PropTypes.func,
}

export default AvatarView

const AvatarContainer = styled.div`
  display: flex;
`

const AvatarTooltip = styled.div`
  display: flex;
`

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border: 2px solid #D3D3D3;
  border-radius: 50%;
  margin-right: -7px;
  cursor: pointer;
`
const CountAvatar = styled.div`
  width: 50px;
  height: 50px;
  border: 2px solid #D3D3D3;
  border-radius: 50%;
  margin-right: -7px;
  cursor: pointer;
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  background: darkgray;
  font-size: larger;
  color: aliceblue;
  font-weight: bold;
`
