import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import axios from 'axios';
import encrypt from '../encrypt/encrypt';
import URL from '../secret/URL';

class AddAmount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secretUsername: '',
      userName: '',
      userMobile: '',
      userAmount: 0,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleRequestToAddAmount = async event => {
    event.preventDefault();
    //TODO: Add the transaction using the rest API;
    console.log(this.state);
    const { secretUsername, userName, userMobile, userAmount } = this.state;
    const userTransaction = {
      secretUsername: encrypt.encrypt(secretUsername),
      userName: userName,
      userMobile: userMobile,
      userAmount: userAmount,
    };
    const response = await axios.post(
      `${URL.url}/addLogisticsAmount`,
      userTransaction,
    );
    if (response.data.code === 200) {
      alert(`User Amount is Added`);
    } else {
      alert(`User Amount is NOT Added Successfully`);
    }
  };

  render() {
    return (
      <Page
        title="Amount"
        breadcrumbs={[{ name: 'tables', active: true }]}
        className="TablePage"
      >
        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader>{'Add Amount - Farmer'}</CardHeader>
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
                      Enter User Amount :
                      <input
                        type="text"
                        name="userAmount"
                        value={this.state.userAmount}
                        onChange={this.handleChange}
                      />
                      <br />
                      <input
                        type="button"
                        name="Submit"
                        value="Add Transaction"
                        onClick={e => this.handleRequestToAddAmount(e)}
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

export default AddAmount;
