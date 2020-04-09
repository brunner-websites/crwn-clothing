import React, { Component } from 'react'
import './sign-up.styles.scss'

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createOrRetrieveUserProfileDocument } from '../../firebase/firebase.utils'

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      await createOrRetrieveUserProfileDocument(user, { displayName });

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })

      alert("successfully signed up");

    } catch (error) {
      console.error(error);
    }

  }

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({
      [name]: value
    })
  }

  render() {

    const { displayName, email, password, confirmPassword } = this.state;

    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign Up with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            required
            label="Name"
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange} />

          <FormInput
            required
            label="E-Mail"
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange} />

          <FormInput
            required
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange} />

          <FormInput
            required
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange} />

          <div className="buttons">
            <CustomButton type="submit">Sign Up</CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

export default SignUp;