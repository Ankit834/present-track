import React, { Component } from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

export class UsersModal extends Component {
  render() {
    const { users, handleClose } = this.props
    return (
      <ModalContainer>
        <Modal>
          <CloseButton onClick={handleClose}>X</CloseButton>
          {users.map(user => (
            <Card key={user._id}>
              <UserImage src={user.avatar} />
              <UserData>
                <h3>{user.name}</h3><br />
                <Email>{user.email}</Email><br />
                <p style={{ color: 'grey', fontSize: '12px'}}>Last Active</p>
                <Date>{this.formatDate(user.lastActiveDate)}</Date>
              </UserData>
            </Card>
          ))}
        </Modal>
      </ModalContainer>
    )
  }

  formatDate = (date) => {
    return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');
  }
}

UsersModal.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  handleClose: PropTypes.func
}

export default UsersModal

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const Modal = styled.div`
  position:fixed;
  background: white;
  width: 80%;
  height: 80%;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: fixed;
  height: 8%;
  width: 4%;
  border-radius: 50%;
  border: 1px solid #D3D3D3;
  float: right;
  right: 0;
  cursor: pointer;

  &:hover {
    background: red;
  }
`

const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 20%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: arial;
  margin: 1%;
`;

const UserData = styled.div`
  padding: 2px 16px;
`;

const Date = styled.p`
  font-size: 12px;
`;

const Email = styled.p`
  color: grey;
  font-size: 10px;
`

const UserImage = styled.img`
  width: 80px;
  height: 80px;
`;
