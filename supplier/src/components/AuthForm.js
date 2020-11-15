import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

class AuthForm extends React.Component {
  
  handleSubmit = event => {
    event.preventDefault();
    const {usernameInputProps, passwordInputProps} = this.props;
    console.log(`Login username : ${usernameInputProps}`);
    console.log(`Login password : ${passwordInputProps}`);
    
  };

  render() {
    return (
      <h1>Hello</h1>
    );
  }
}

export default AuthForm;
