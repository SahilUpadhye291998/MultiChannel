import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import axios from 'axios';
import encrypt from '../encrypt/encrypt';
import URL from '../secret/URL';

class AddTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secretUsername: '',
      userName: '',
      userMobile: '',
      callerName: '',
      callerMobile: '',
      reciverName: '',
      reciverMobile: '',
      dropLocation: '',
      pickUpLocation: '',
      productName: '',
      productQuantity: '',
      productPrice: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
    console.log(this.state);
  };

  handleRequestToAddTransaction = async event => {
    event.preventDefault();
    //TODO: Add the transaction using the rest API;
    console.log(this.state);
    const {
      secretUsername,
      userName,
      userMobile,
      callerName,
      callerMobile,
      reciverName,
      reciverMobile,
      pickUpLocation,
      dropLocation,
      productName,
      productQuantity,
    } = this.state;
    const userTransaction = {
      secretUsername: encrypt.encrypt(secretUsername),
      userName: userName,
      userMobile: userMobile,
      callerName: callerName,
      callerMobile: callerMobile,
      reciverName: reciverName,
      reciverMobile: reciverMobile,
      pickUpLocation: pickUpLocation,
      dropLocation: dropLocation,
      productName: productName,
      productQuantity: productQuantity,
    };
    const response = await axios.post(
      `${URL.url}/addProductLogisticsSupplier`,
      userTransaction,
    );
    if (response.data.code === 200) {
      alert(`Tranasction is done successfully`);
    } else {
      alert(`Tranasction is unsuccessfully`);
    }
  };

  render() {
    return (
      <Page
        title="Trans"
        breadcrumbs={[{ name: 'tables', active: true }]}
        className="TablePage"
      >
        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader>{'Add Transaction - Farmer'}</CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Card body>
                      Enter Secret Name :
                      <input
                        type="text"
                        name="secretUsername"
                        value={this.state.secretUsername}
                        onChange={this.handleChange}
                      />
                      Enter User Name :
                      <input
                        type="text"
                        name="userName"
                        value={this.state.userName}
                        onChange={this.handleChange}
                      />
                      Enter User Mobile :
                      <input
                        type="text"
                        name="userMobile"
                        value={this.state.userMobile}
                        onChange={this.handleChange}
                      />
                      Enter Caller Name :
                      <input
                        type="text"
                        name="callerName"
                        value={this.state.callerName}
                        onChange={this.handleChange}
                      />
                      Enter Caller Mobile :
                      <input
                        type="text"
                        name="callerMobile"
                        value={this.state.callerMobile}
                        onChange={this.handleChange}
                      />
                      Enter Reciver Name :
                      <input
                        type="text"
                        name="reciverName"
                        value={this.state.reciverName}
                        onChange={this.handleChange}
                      />
                      Enter Reciver Mobile :
                      <input
                        type="text"
                        name="reciverMobile"
                        value={this.state.reciverMobile}
                        onChange={this.handleChange}
                      />
                      Enter dropLocation Name :
                      <input
                        type="text"
                        name="dropLocation"
                        value={this.state.dropLocation}
                        onChange={this.handleChange}
                      />
                      Enter pickUp Location Name :
                      <input
                        type="text"
                        name="pickUpLocation"
                        value={this.state.pickUpLocation}
                        onChange={this.handleChange}
                      />
                      Enter Product Name :
                      <input
                        type="text"
                        name="productName"
                        value={this.state.productName}
                        onChange={this.handleChange}
                      />
                      Enter Product Quantity :
                      <input
                        type="text"
                        name="productQuantity"
                        value={this.state.productMobile}
                        onChange={this.handleChange}
                      />
                      <br />
                      <input
                        type="button"
                        name="Submit"
                        value="Add Transaction"
                        onClick={e => this.handleRequestToAddTransaction(e)}
                      />
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

export default AddTransaction;
