import React, { Component } from 'react';
import styled from 'styled-components';
import PresenceTrack from './PresenceTrack';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TitleContainer, Title, Info } from '../ui-templates';

export class Home extends Component {
  render() {
    const { user } = this.props;
    return (
      <HomeContainer>
        {user && <PresenceTrack userId={user._id} />}
        <HomePageContent>
          <TitleContainer style={{ color: 'black' }}>
            <Title> Presence Tracker </Title>
            <Info>This Application just loads the active User currntly active to this specific page.</Info>
          </TitleContainer>
        </HomePageContent>
      </HomeContainer>
    )
  }
}

const HomeContainer = styled.div`
`
const HomePageContent = styled.div`
  display: flex;
  flex-direction: column;
  margin
`

Home.propTypes = {
  user: PropTypes.object
}

export function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Home)

