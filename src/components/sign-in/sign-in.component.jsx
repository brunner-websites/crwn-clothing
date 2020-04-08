import React, { Component } from 'react';
import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

class SignIn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = event => {
    event.preventDefault();

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

          <CustomButton type="submit">Sign In</CustomButton>
        </form>
      </div>
    )
  }
}

export default SignIn;