import React, { Component, Fragment } from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../../store';
import { setAlert } from '../../store/actions/alert';
import { register } from '../../store/actions/auth';

export class Register extends Component {
  state = {
    registerForm: {
      name: {
        type: 'text',
        placeholder: 'Your Name',
        value: ''
      },
      email: {
        type: 'email',
        placeholder: 'Email Address',
        value: ''
      },
      password: {
        type: 'password',
        placeholder: 'Password',
        value: ''
      },
      confirmPassword: {
        type: 'password',
        placeholder: 'Confirm Password',
        value: ''
      },
    }
  }

  onInputChange = (event, inputIdentifier) => {
    const updatedRegisterForm = { ...this.state.registerForm };
    const updatedFormElement = { ...updatedRegisterForm[inputIdentifier] };

    updatedFormElement.value = event.target.value;
    updatedRegisterForm[inputIdentifier] = updatedFormElement
    this.setState({ registerForm: updatedRegisterForm});
  }

  onSubmit = (event) => {
    event.preventDefault();
    const formData = this.state.registerForm;
    if(formData['password'].value !== formData['confirmPassword'].value){
      store.dispatch(setAlert('Paswords do not match', 'danger'));
      return;
    }
    const userData = {
      name: formData['name'].value,
      email: formData['email'].value,
      password: formData['password'].value
    };
    store.dispatch(register(userData));
  }

  render() {
    const { isAuthenticated } = this.props;
    const registerFormElements = [];
    for(let key in this.state.registerForm) {
      registerFormElements.push({
        id: key,
        config: this.state.registerForm[key]
      })
    }
    return (
      <Fragment>
        {isAuthenticated ? <Redirect to='/home' /> :
        <RegisterContainer>
          <SignupTitle>Sign Up</SignupTitle>
          <CreateAccount>
            <FontAwesomeIcon
              icon={faUser}
              size="1x"
            /> Create Your Account
          </CreateAccount>
          <form onSubmit={this.onSubmit}>
            {registerFormElements.map(formElement => (
              <Input
                key={formElement.id}
                type={formElement.config.type}
                placeholder={formElement.config.placeholder}
                value={formElement.config.value}
                onChange={(event) => this.onInputChange(event, formElement.id)}
                required
              />
            ))}
            <Button type='submit'>Register</Button>
          </form>
          <ExistingAccount>
            Already have an Account <NavLink to='/login'>Sign In</NavLink>
          </ExistingAccount>
        </RegisterContainer>
        }
      </Fragment>
    )
  }
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
}

export function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(Register)

const RegisterContainer = styled.div`
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

  &:hover {
    opacity: 0.8;
  }
`;

const ExistingAccount = styled.div`
  font-size: large;
`