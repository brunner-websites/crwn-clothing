import React, { useState } from 'react';
import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// redux and sagas
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions'
import { connect } from 'react-redux';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {

  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });

  const handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = userCredentials;

    emailSignInStart(email, password);

    setUserCredentials({ email: '', password: '' });

  }

  const handleChange = event => {
    // name = name of the input element
    // value = value of the input element
    const { value, name } = event.target;

    setUserCredentials({
      ...userCredentials,
      [name]: value
    });

  }

  return (
    <div className="sign-in">
      <h2>I arleady have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          handleChange={handleChange}
          label="E-Mail"
          type="email"
          name="email"
          value={userCredentials.email}
          required
        />

        <FormInput
          handleChange={handleChange}
          label="Password"
          type="password"
          name="password"
          value={userCredentials.password}
          required
        />

        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn={true} >Google Sign-In</CustomButton>
        </div>

      </form>
    </div>
  )

}

const mapDispatchToProps = dispatch => {
  return {
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
  }
}

export default connect(null, mapDispatchToProps)(SignIn);