import React, { Component, Fragment } from 'react'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../../store';
import { logout } from '../../store/actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboard, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import AvatarView from '../Home/AvatarView';

export class Navbar extends Component {

  onLogoutClick = () => {
    store.dispatch(logout());
  }

  render() {
    const { isAuthenticated, loading, user } = this.props.auth;
    return (
      <Nav>
        <Link to='/home'>
          <Title>
            <FontAwesomeIcon
              icon={faChalkboard}
              size="2x"
            />
            PresenceTrack
          </Title>
        </Link>
        { !loading &&
          <Fragment>
            {isAuthenticated ?
            <LinkList>
              {user && <li>
                  <LinkName>
                    <AvatarView userDetails={user} />
                    <Username>{user.name}</Username>
                  </LinkName>
              </li>}
              <li>
                <Link onClick={this.onLogoutClick} to='/'>
                  <LinkName>
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      size="1x"
                    />
                    Logout
                  </LinkName>
                </Link>
              </li>
            </LinkList> :
            <LinkList>
              <li>
                <Link to='/register'>
                  <LinkName>Register</LinkName>
                </Link>
              </li>
              <li>
                <Link to='/login'>
                  <LinkName>Login</LinkName>
                </Link>
              </li>
            </LinkList>
            }
          </Fragment>
        }
      </Nav>
    )
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
}

export function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Navbar)

const Nav = styled.nav`
  display: flex;
  align-items: center;
  z-index: 1;
  width: 100%;
  top: 0;
  border-bottom: solid 1px #17a2b8;
  opacity: 0.9;
  background-color: #343a40;
  justify-content: space-between;
`;

const Link = styled(NavLink)`
  color: #fff;
  padding: 0.45rem;
  margin: 0 0.25rem;
  text-decoration: none;

  &:hover {
    color: #17a2b8;
  }
`;

const Username = styled.div`
  margin: 17px;
  color: white;
`

const LinkList = styled.ul`
  list-style: none;
  display: flex;
`;

const LinkName = styled.h4`
  display: flex;
  padding-right: 1.5rem;
`;

const Title = styled.div`
  font-size: large;
`;

