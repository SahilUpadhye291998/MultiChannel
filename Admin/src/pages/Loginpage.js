import React, { Component } from 'react';
import './Loginpage.css';
import axios from 'axios';
import Cookies from 'universal-cookie';

export default class Loginpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleRequest = async e => {
    e.preventDefault();
    const { username, password } = this.state;
    console.log(username + '=' + password);
    //TODO: Add the login request
    const data = {
      userName: this.state.username,
      password: this.state.password,
    };
    const response = await axios.post(
      'http://localhost:3000/api/admin/login',
      data,
    );
    //TODO: USE cookie to store JWT token
    const token = response.data.token;
    const cookie = new Cookies();
    cookie.set('farmerToken', token);
    document.location.href = 'http://localhost:11001/';
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
                  <div className="row justify-content-center my-3 px-3">
                    {' '}
                    <button
                      type="submit"
                      className="btn-block btn-color"
                      onClick={this.handleRequest}
                    >
                      Login
                    </button>{' '}
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
