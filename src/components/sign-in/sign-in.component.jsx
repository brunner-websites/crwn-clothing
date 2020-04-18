import React, { Component } from 'react';
import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

// redux and sagas
import { googleSignInStart } from '../../redux/user/user.actions'
import { connect } from 'react-redux';

class SignIn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    }

    this.setState({
      email: '',
      password: ''
    })
  }

  handleChange = event => {
    // name = name of the input element
    // value = value of the input element
    const { value, name } = event.target;

    this.setState({
      [name]: value
    });

  }

  render() {

    const { email, password } = this.state;

    const { googleSignInStart } = this.props;

    return (
      <div className="sign-in">
        <h2>I arleady have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            handleChange={this.handleChange}
            required
            label="E-Mail" />

          <FormInput
            type="password"
            name="password"
            value={password}
            required
            handleChange={this.handleChange}
            label="Password" />

          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn={true} >Google Sign-In</CustomButton>
          </div>

        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    googleSignInStart: () => dispatch(googleSignInStart())
  }
}

export default connect(null, mapDispatchToProps)(SignIn);