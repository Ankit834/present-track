import React, { Component, Fragment } from 'react';
import AvatarView from './AvatarView';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UsersModal from './UsersModal';

export class PresenceTrack extends Component {
  state = {
    users: [],
    showModal: false
  }

  componentDidMount() {
    const { userId } = this.props;

    this.socket = io({
      query: {
        userId: userId
      }
    });

    this.socket.on('Active Users', data => {
      this.setState({ users: data });
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  showUsersModal = () => {
    this.setState({ showModal: true });
  }

  handleModalClose = () => {
    this.setState({ showModal: false });
  }

  render() {
    const { users } = this.state;
    return (
      <Fragment>
        <PresenceTrackContainer>
          {users.length && users.slice(0, 6).map(user => (
            <AvatarView key={user._id} userDetails={user} />
          ))}
          {users.length > 5 &&
            <AvatarView userCounts={users.length-5} onCountClick={this.showUsersModal} />
          }
        </PresenceTrackContainer>
        {this.state.showModal &&
        <UsersModal users={users} handleClose={this.handleModalClose} />
        }
      </Fragment>
    )
  }
}

PresenceTrack.propTypes = {
  userId: PropTypes.string
}

export default PresenceTrack

const PresenceTrackContainer = styled.div`
  display: flex;
  margin: 1% 0 1% 11%;
  width: fit-content;
`;