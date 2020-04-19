import React, { useState } from 'react'
import './sign-up.styles.scss'

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/user.actions';

const SignUp = ({ signUpStart }) => {

  const [userCredentials, setCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const { displayName, email, password, confirmPassword } = userCredentials;


  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      signUpStart({ email, password, displayName });

      setCredentials({
        ...userCredentials,
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })

    } catch (error) {
      console.error(error);
    }

  }

  const handleChange = event => {
    const { value, name } = event.target;

    setCredentials({
      ...userCredentials,
      [name]: value
    })
  }

  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account</h2>
      <span>Sign Up with your email and password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          required
          label="Name"
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange} />

        <FormInput
          required
          label="E-Mail"
          type="email"
          name="email"
          value={email}
          onChange={handleChange} />

        <FormInput
          required
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange} />

        <FormInput
          required
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange} />

        <div className="buttons">
          <CustomButton type="submit">Sign Up</CustomButton>
        </div>
      </form>
    </div>
  )

}

const mapDispatchToProps = dispatch => ({
  signUpStart: newUserInfo => dispatch(signUpStart(newUserInfo))
})

export default connect(null, mapDispatchToProps)(SignUp);