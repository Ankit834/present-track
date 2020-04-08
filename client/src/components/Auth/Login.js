import React, { Component, Fragment } from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Redirect } from 'react-router-dom';
import store from '../../store';
import { login } from '../../store/actions/auth';


export class Login extends Component {
  state = {
    loginForm: {
      email: {
        type: 'email',
        placeholder: 'Email Address',
        value: ''
      },
      password: {
        type: 'password',
        placeholder: 'Password',
        value: ''
      }
    }
  }

  onInputChange = (event, inputIdentifier) => {
    const updatedLoginForm = { ...this.state.loginForm };
    const updatedFormElement = { ...updatedLoginForm[inputIdentifier] };

    updatedFormElement.value = event.target.value;
    updatedLoginForm[inputIdentifier] = updatedFormElement
    this.setState({ loginForm: updatedLoginForm});
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const formData = this.state.loginForm;
    const userCredentials = {
      email: formData['email'].value,
      password: formData['password'].value
    };
    await store.dispatch(login(userCredentials));
  }

  render() {
    const { isAuthenticated } = this.props;
    const loginFormElements = [];
    for(let key in this.state.loginForm) {
      loginFormElements.push({
        id: key,
        config: this.state.loginForm[key]
      })
    }
    return (
      <Fragment>
        {isAuthenticated ? <Redirect to='/home' /> :
        <LoginContainer>
          <SignupTitle>Log In</SignupTitle>
          <CreateAccount>
            <FontAwesomeIcon
              icon={faUser}
              size="1x"
            /> Sign Into Your Account
          </CreateAccount>
          <form onSubmit={this.onSubmit}>
            {loginFormElements.map(formElement => (
              <Input
                key={formElement.id}
                type={formElement.config.type}
                placeholder={formElement.config.placeholder}
                value={formElement.config.value}
                onChange={(event) => this.onInputChange(event, formElement.id)}
                required
              />
            ))}
            <Button type='submit'>Login</Button>
          </form>
          <ExistingAccount>
            Don't have an account <NavLink to='/register'>Sign Up</NavLink>
          </ExistingAccount>
        </LoginContainer>
        }
      </Fragment>
    )
  }
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
}

export function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(Login)

const LoginContainer = styled.div`
  margin: 5% 15%;
`

const Input = styled.input`
  outline: none;
  border: 1px solid #ccc;
  background-color: white;
  font: inherit;
  padding: 6px 10px;
  display: block;
  width: 50%;
  box-sizing: border-box;
  margin: 5px 0px;
  border-radius: 3px;
`;

const SignupTitle = styled.h1`
  font-size: 3rem;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #17a2b8;
`;

const CreateAccount = styled.div`
  display: flex;
  font-size: larger;
  padding-bottom: 5px;
`
const Button = styled.button`
  background-color: #17a2b8;
  border: none;
  color: white;
  outline: none;
  cursor: pointer;
  font: inherit;
  padding: 10px;
  margin: 10px 0px;
  border-radius: 3px;
  font-weight: bold;
`;

const ExistingAccount = styled.div`
  font-size: large;
`