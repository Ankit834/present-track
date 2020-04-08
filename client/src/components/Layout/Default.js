import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import BackgroundImage from '../../assets/img/WebTech.jpeg';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TitleContainer, Title, Info } from '../ui-templates';

export class Default extends Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <Fragment>
        {isAuthenticated ? <Redirect to='/home' /> :
        <DefaultContainer>
          <TitleContainer>
            <Title> Presence Tracker </Title>
            <Info>Application with component to track Present Live Users</Info>
            <ButtonContainer>
              <Link to='/register'>
                <Button style={{ background: '#17a2b8' }}>Sign Up</Button>
              </Link>
              <Link to='/login'>
                <Button style={{ background: '#f4f4f4' }}>Login</Button>
              </Link>
            </ButtonContainer>
          </TitleContainer>
        </DefaultContainer>
        }
      </Fragment>
    )
  }
}

Default.propTypes = {
  isAuthenticated: PropTypes.bool
}

export function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(Default)

const DefaultContainer = styled.section`
  position: relative;
  background: url(${BackgroundImage}) no-repeat center center/cover;
  height: calc(100vh - 55px);
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  display: inline-block;
  color: #333;
  padding: 0.4rem 1.3rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: opacity 0.2s ease-in;
  outline: none;
`;
