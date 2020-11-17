import React, { Component } from 'react';
import './Loginpage.css';
import axios from 'axios';

export default class Loginpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      mobileNumber: '',
      secret: '',
      address: '',
      isAuthenticated: false,
      typeOf: '',
    };
  }
  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleRequest = async e => {
    e.preventDefault();
    const {
      username,
      password,
      mobileNumber,
      secret,
      address,
      typeOf,
    } = this.state;
    //TODO: Add the signup request
    const user = {
      name: username,
      password: password,
      mobileNumber: mobileNumber,
      secret: secret,
      address: address,
      typeof: typeOf,
    };
    const response = await axios.post(
      'http://localhost:3000/api/user/create',
      user,
    );
    console.log(response);
    if (response.data.code === 200) {
      alert('Record has been added! Review in process');
    } else {
      alert('Some error has occuerd');
    }
  };

  render() {
    return (
      <div className="container px-4 py-5 mx-auto">
        <div className="card card0">
          <div className="d-flex flex-lg-row flex-column-reverse">
            <div className="card card1">
              <div className="row justify-content-center my-auto">
                <div className="col-md-8 col-10 my-5">
                  <div className="row justify-content-center px-3 mb-3">
                    {' '}
                    <img
                      id="logo"
                      src="https://i.imgur.com/PSXxjNY.png"
                      alt="test"
                    />{' '}
                  </div>
                  <h3 className="mb-5 text-center heading">We are A Company</h3>
                  <h6 className="msg-info">Please login to your account</h6>
                  <div className="form-group">
                    {' '}
                    <label className="form-control-label text-muted">
                      Username
                    </label>{' '}
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Enter the username here"
                      className="form-control"
                      value={this.state.username}
                      onChange={this.handleChange}
                    />{' '}
                  </div>
                  <div className="form-group">
                    {' '}
                    <label className="form-control-label text-muted">
                      Password
                    </label>{' '}
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      className="form-control"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />{' '}
                  </div>
                  <div className="form-group">
                    {' '}
                    <label className="form-control-label text-muted">
                      Mobile Number
                    </label>{' '}
                    <input
                      type="text"
                      id="mobileNumber"
                      name="mobileNumber"
                      placeholder="Enter your mobileNumber"
                      className="form-control"
                      value={this.state.mobileNumber}
                      onChange={this.handleChange}
                    />{' '}
                  </div>
                  <div className="form-group">
                    {' '}
                    <label className="form-control-label text-muted">
                      Secret
                    </label>{' '}
                    <input
                      type="password"
                      id="secret"
                      name="secret"
                      placeholder="Enter your secret"
                      className="form-control"
                      value={this.state.secret}
                      onChange={this.handleChange}
                    />{' '}
                  </div>
                  <div className="form-group">
                    {' '}
                    <label className="form-control-label text-muted">
                      Address
                    </label>{' '}
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Enter your address"
                      className="form-control"
                      value={this.state.address}
                      onChange={this.handleChange}
                    />{' '}
                  </div>
                  <div className="form-group">
                    {' '}
                    <label className="form-control-label text-muted">
                      isAuthenticated
                    </label>{' '}
                    <input
                      type="text"
                      id="isAuthenticated"
                      name="isAuthenticated"
                      placeholder="Enter your isAuthenticated"
                      className="form-control"
                      value={this.state.isAuthenticated}
                      onChange={this.handleChange}
                      readOnly
                    />{' '}
                  </div>
                  <div className="form-group">
                    {' '}
                    <label className="form-control-label text-muted">
                      typeOf
                    </label>{' '}
                    <input
                      type="text"
                      id="typeOf"
                      name="typeOf"
                      placeholder="Enter your typeOf"
                      className="form-control"
                      value={this.state.typeOf}
                      onChange={this.handleChange}
                    />{' '}
                  </div>
                  <div className="row justify-content-center my-3 px-3">
                    {' '}
                    <button
                      type="submit"
                      className="btn-block btn-color"
                      onClick={this.handleRequest}
                    >
                      Sign Up
                    </button>{' '}
                  </div>
                  <div className="row justify-content-center my-3 px-3">
                    <a href="http://localhost:11004/login">Log in</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="card card2">
              <div className="my-auto mx-md-5 px-md-5 right">
                <h3 className="text-white">We are more than just a company</h3>{' '}
                <small className="text-white">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
