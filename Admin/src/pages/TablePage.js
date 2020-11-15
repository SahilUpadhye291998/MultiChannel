import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';

const encrypt = require('../encrypt/encrypt');

class TablePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempData: [
        {
          id: 1,
          name: 'Sample Name 1',
          mobileNumber: '123567890',
          address: 'Sample Address for User 1',
          isAuthenticated: false,
          typeOf: 'Farmer',
        },
        {
          id: 2,
          name: 'Sample Name 2',
          mobileNumber: '123567890',
          address: 'Sample Address for User 2',
          isAuthenticated: false,
          typeOf: 'Supplier',
        },
        {
          id: 3,
          name: 'Sample Name 3',
          mobileNumber: '123567890',
          address: 'Sample Address for User 3',
          isAuthenticated: false,
          typeOf: 'Logistics',
        },
        {
          id: 4,
          name: 'Sample Name 4',
          mobileNumber: '123567890',
          address: 'Sample Address for User 4',
          isAuthenticated: false,
          typeOf: 'Logistics',
        },
      ],
      users: [],
      columns: [],
    };
  }

  componentDidMount() {
    const cookie = new Cookies();
    const farmerToken = cookie.get('farmerToken');
    axios
      .get('http://localhost:3000/api/user/get', {
        headers: {
          Authorization: `Bearer ${farmerToken}`,
        },
      })
      .then(response => {
        const responseUsers = response.data.users;
        const userData = responseUsers.map(responseUser => {
          return {
            _id: responseUser._id,
            name: encrypt.decrypt(responseUser.name),
            mobileNumber: encrypt.decrypt(responseUser.mobileNumber),
            address: encrypt.decrypt(responseUser.address),
            typeOf: responseUser.typeOf,
            isAuthenticated: responseUser.isAuthenticated,
          };
        });
        this.setState({ users: userData });
        console.log(this.state.users);
      })
      .catch(error => console.log(error));
  }

  handleRequestToAccept = async id => {
    console.log(`Accept : ${id}`);
    // TODO: COOKIE retirve
    const cookie = new Cookies();
    const farmerToken = cookie.get('farmerToken');

    // TODO: Add the get request
    // TODO: Decode and make the object in readable format
    let response = await axios.get(`http://localhost:3000/api/user/get/${id}`, {
      headers: {
        Authorization: `Bearer ${farmerToken}`,
      },
    });
    let userData = {};
    let registeringUser = {};
    console.log(userData);
    if (response.data.user.typeOf === 'farmer') {
      const responseUser = response.data.user;
      userData = {
        secretFarmerName: responseUser.secret,
        farmerName: encrypt.decrypt(responseUser.name),
        farmerAddress: encrypt.decrypt(responseUser.address),
        farmerMobile: encrypt.decrypt(responseUser.mobileNumber),
        farmerSecret: responseUser.password,
        farmerAmount: '100000',
      };
      registeringUser = {
        secretFarmerName: responseUser.secret,
        orgName: 'org1',
      };
      let responseFromBlockchainServer = await axios.post(
        'http://localhost:5000/api/farmer/registerFarmer',
        registeringUser,
      );
      if (responseFromBlockchainServer.data.code === 200) {
        let responseFromBlockchainServerForSignup = await axios.post(
          'http://localhost:5000/api/farmer/signup',
          userData,
        );
        console.log(responseFromBlockchainServerForSignup);
        if (responseFromBlockchainServerForSignup.data.code === 200) {
          alert('OK Farmer Signup successful');
        } else {
          alert('Please contact the web Master and Signup Again');
        }
      } else {
        alert('Please contact the web Master and Signup Again');
      }
    } else if (response.data.user.typeOf === 'supplier') {
      const responseUser = response.data.user;
      userData = {
        secretSupplierName: responseUser.secret,
        supplierName: encrypt.decrypt(responseUser.name),
        supplierAddress: encrypt.decrypt(responseUser.address),
        supplierMobile: encrypt.decrypt(responseUser.mobileNumber),
        supplierSecret: responseUser.password,
        supplierAmount: '100000',
        type: 'both',
      };
      registeringUser = {
        secretSupplierName: responseUser.secret,
        orgName: 'org2',
      };
      let responseFromBlockchainServer = await axios.post(
        'http://localhost:5000/api/supplier/registerSupplier',
        registeringUser,
      );
      if (responseFromBlockchainServer.data.code === 200) {
        let responseFromBlockchainServerForSignup = await axios.post(
          'http://localhost:5000/api/supplier/signup',
          userData,
        );
        console.log(responseFromBlockchainServerForSignup);
        if (responseFromBlockchainServerForSignup.data.code === 200) {
          alert('OK Supplier Signup successful');
        } else {
          alert('Please contact the web Master and Signup Again');
        }
      } else {
        alert('Please contact the web Master and Signup Again');
      }
    } else if (response.data.user.typeOf === 'customer') {
      const responseUser = response.data.user;
      userData = {
        secretUsername: responseUser.secret,
        userName: encrypt.decrypt(responseUser.name),
        userAddress: encrypt.decrypt(responseUser.address),
        userMobile: encrypt.decrypt(responseUser.mobileNumber),
        userSecret: responseUser.password,
        userAmount: '100000',
      };
      registeringUser = {
        secretUsername: responseUser.secret,
        orgName: 'org3',
      };
      let responseFromBlockchainServer = await axios.post(
        'http://localhost:5000/api/customer/registerUser',
        registeringUser,
      );
      if (responseFromBlockchainServer.data.code === 200) {
        let responseFromBlockchainServerForSignup = await axios.post(
          'http://localhost:5000/api/customer/signup',
          userData,
        );
        console.log(responseFromBlockchainServerForSignup);
        if (responseFromBlockchainServerForSignup.data.code === 200) {
          alert('OK Customer Signup successful');
        } else {
          alert('Please contact the web Master and Signup Again');
        }
      } else {
        alert('Please contact the web Master and Signup Again');
      }
    } else if (response.data.user.typeOf === 'logistics') {
      const responseUser = response.data.user;
      userData = {
        secretUsername: responseUser.secret,
        userName: encrypt.decrypt(responseUser.name),
        userAddress: encrypt.decrypt(responseUser.address),
        userMobile: encrypt.decrypt(responseUser.mobileNumber),
        userSecret: responseUser.password,
        userAmount: '100000',
      };
      registeringUser = {
        secretUsername: responseUser.secret,
        orgName: 'org4',
      };
      let responseFromBlockchainServer = await axios.post(
        'http://localhost:5000/api/logistics/registerLogistics',
        registeringUser,
      );
      if (responseFromBlockchainServer.data.code === 200) {
        let responseFromBlockchainServerForSignup = await axios.post(
          'http://localhost:5000/api/logistics/signup',
          userData,
        );
        console.log(responseFromBlockchainServerForSignup);
        if (responseFromBlockchainServerForSignup.data.code === 200) {
          alert('OK Logistics Signup successful');
        } else {
          alert('Please contact the web Master and Signup Again');
        }
      } else {
        alert('Please contact the web Master and Signup Again');
      }
    }

    // TODO: Make a create account from here after you get the userdata
    //      TODO: register the user
    //      TODO: signup the user

    // TODO: Delete the user
    console.log(farmerToken);
    response = await axios.get(`http://localhost:3000/api/user/update/${id}`, {
      headers: {
        Authorization: `Bearer ${farmerToken}`,
      },
    });

    axios
      .get('http://localhost:3000/api/user/get', {
        headers: {
          Authorization: `Bearer ${farmerToken}`,
        },
      })
      .then(response => {
        const responseUsers = response.data.users;
        const userData = responseUsers.map(responseUser => {
          return {
            _id: responseUser._id,
            name: encrypt.decrypt(responseUser.name),
            mobileNumber: encrypt.decrypt(responseUser.mobileNumber),
            address: encrypt.decrypt(responseUser.address),
            typeOf: responseUser.typeOf,
            isAuthenticated: responseUser.isAuthenticated,
          };
        });
        this.setState({ users: userData });
        console.log(this.state.users);
      })
      .catch(error => console.log(error));
    this.handleRequestToDecline(id);
  };

  handleRequestToDecline = async id => {
    console.log(`Decline : ${id}`);
    // TODO: COOKIE retirve
    const cookie = new Cookies();
    const farmerToken = cookie.get('farmerToken');
    // TODO: Delete the user
    let response = await axios.delete(
      `http://localhost:3000/api/user/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${farmerToken}`,
        },
      },
    );
    if (response.status === 200) {
      axios
        .get('http://localhost:3000/api/user/get', {
          headers: {
            Authorization: `Bearer ${farmerToken}`,
          },
        })
        .then(response => {
          const responseUsers = response.data.users;
          const userData = responseUsers.map(responseUser => {
            return {
              _id: responseUser._id,
              name: encrypt.decrypt(responseUser.name),
              mobileNumber: encrypt.decrypt(responseUser.mobileNumber),
              address: encrypt.decrypt(responseUser.address),
              typeOf: responseUser.typeOf,
              isAuthenticated: responseUser.isAuthenticated,
            };
          });
          this.setState({ users: userData });
          console.log(this.state.users);
        })
        .catch(error => console.log(error));
    }
  };

  getRequest;

  render() {
    const { users } = this.state;
    console.log(users);
    return (
      <Page
        title="Tables"
        breadcrumbs={[{ name: 'tables', active: true }]}
        className="TablePage"
      >
        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader>{'User Data'}</CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Card body>
                      <Table>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Mobile Number</th>
                            <th>Address</th>
                            <th>is Authorized</th>
                            <th>Type Of</th>
                            <th>Accept</th>
                            <th>Decline</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map(data => (
                            <tr key={data._id}>
                              <td>{data._id}</td>
                              <td>{data.name}</td>
                              <td>{data.mobileNumber}</td>
                              <td>{data.address}</td>
                              <td>{`${data.isAuthenticated}`}</td>
                              <td>{data.typeOf}</td>
                              <td>
                                <button
                                  className="btn btn-success"
                                  onClick={e =>
                                    this.handleRequestToAccept(data._id, e)
                                  }
                                >
                                  Accept
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={e =>
                                    this.handleRequestToDecline(data._id, e)
                                  }
                                >
                                  Decline
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default TablePage;
