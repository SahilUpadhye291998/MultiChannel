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
      supplierName: '',
      supplierMobile: '',
      customerName: '',
      customerMobile: '',
      productName: '',
      productQuantity: '',
      productPrice: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
    console.log(this.state);
  };

  handleRequestToAddTransactionWithFarmer = async event => {
    event.preventDefault();
    //TODO: Add the transaction using the rest API;
    console.log(this.state);
    const {
      secretUsername,
      userName,
      userMobile,
      supplierName,
      supplierMobile,
      productName,
      productQuantity,
      productPrice,
    } = this.state;
    const userTransaction = {
      secretUsername: encrypt.encrypt(secretUsername),
      farmerName: userName,
      farmerMobile: userMobile,
      supplierName: supplierName,
      supplierMobile: supplierMobile,
      productName: productName,
      productQuantity: productQuantity,
      productPrice: productPrice,
    };
    const response = await axios.post(
      `${URL.url}/addProductFarmerSupplier`,
      userTransaction,
    );
    if (response.data.code === 200) {
      alert(`Tranasction is done successfully`);
    } else {
      alert(`Tranasction is unsuccessfully`);
    }
  };

  handleRequestToAddTransactionWithCustomer = async event => {
    event.preventDefault();
    //TODO: Add the transaction using the rest API;
    console.log('Customer' + this.state.customerName);
    console.log('Customer' + this.state.customerMobile);
    const {
      secretUsername,
      supplierName,
      supplierMobile,
      customerName,
      customerMobile,
      productName,
      productQuantity,
      productPrice,
    } = this.state;
    const userTransaction = {
      secretUsername: encrypt.encrypt(secretUsername),
      userName: customerName,
      userMobile: customerMobile,
      supplierName: supplierName,
      supplierMobile: supplierMobile,
      productName: productName,
      productQuantity: productQuantity,
      productPrice: productPrice,
      type: 'supplier',
    };
    console.log(userTransaction);
    const response = await axios.post(
      `${URL.url}/addProductCustomerSupplier`,
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
                      Enter Supplier Name :
                      <input
                        type="text"
                        name="supplierName"
                        value={this.state.supplierName}
                        onChange={this.handleChange}
                      />
                      Enter Supplier Mobile :
                      <input
                        type="text"
                        name="supplierMobile"
                        value={this.state.supplierMobile}
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
                      Enter Product Price :
                      <input
                        type="number"
                        name="productPrice"
                        value={this.state.productPrice}
                        onChange={this.handleChange}
                      />
                      <br />
                      <input
                        type="button"
                        name="Submit"
                        value="Add Transaction"
                        onClick={e =>
                          this.handleRequestToAddTransactionWithFarmer(e)
                        }
                      />
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader>{'Add Transaction - Customer'}</CardHeader>
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
                      Enter Supplier Name :
                      <input
                        type="text"
                        name="supplierName"
                        value={this.state.supplierName}
                        onChange={this.handleChange}
                      />
                      Enter Supplier Mobile :
                      <input
                        type="text"
                        name="supplierMobile"
                        value={this.state.supplierMobile}
                        onChange={this.handleChange}
                      />
                      Enter Customer Name :
                      <input
                        type="text"
                        name="customerName"
                        value={this.state.customerName}
                        onChange={this.handleChange}
                      />
                      Enter Customer Mobile :
                      <input
                        type="text"
                        name="customerMobile"
                        value={this.state.customerMobile}
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
                      Enter Product Price :
                      <input
                        type="number"
                        name="productPrice"
                        value={this.state.productPrice}
                        onChange={this.handleChange}
                      />
                      <br />
                      <input
                        type="button"
                        name="Submit"
                        value="Add Transaction"
                        onClick={e =>
                          this.handleRequestToAddTransactionWithCustomer(e)
                        }
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
