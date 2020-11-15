import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import DataTable from 'react-data-table-component';
import Cookie from 'universal-cookie';
import axios from 'axios';
import URL from '../secret/URL';

class TablePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: [],
      columns: [
        {
          name: 'Caller ID',
          selector: 'callerID',
        },
        {
          name: 'Reciver ID',
          selector: 'reciverID',
        },
        {
          name: 'Drop Location',
          selector: 'dropLocation',
        },
        {
          name: 'Pick Up Location',
          selector: 'pickUpLocation',
        },

        {
          name: 'Product Name',
          selector: 'productName',
        },
        {
          name: 'Product Quantity',
          selector: 'productQuantity',
        },
      ],
    };
  }

  async componentDidMount() {
    console.log(`This is called for api calling`);
    //TODO: get all the information related to transaction here
    const cookie = new Cookie();
    const secretUsername = cookie.get('logisticsSecretUserName');
    const userName = cookie.get('logisticsUserName');
    const userMobile = cookie.get('logisticsMobileNumber');
    const userData = {
      secretUsername: secretUsername,
      userName: userName,
      userMobile: userMobile,
    };
    const response = await axios.post(`${URL.url}/getUser`, userData);
    console.log('output:' + response.data);
    this.setState({ transaction: response.data.logisticsData });
  }

  render() {
    const { transaction, columns } = this.state;
    console.log(transaction);
    return (
      <Page
        title="Trans"
        breadcrumbs={[{ name: 'tables', active: true }]}
        className="TablePage"
      >
        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader>{'Transaction of the user'}</CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Card body>
                      <DataTable
                        data={transaction}
                        title="Transaction"
                        columns={columns}
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

export default TablePage;
