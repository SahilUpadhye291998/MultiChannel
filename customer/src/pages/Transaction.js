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
          name: 'Customer ID',
          selector: 'customerID',
        },
        {
          name: 'Product Name',
          selector: 'productName',
        },
        {
          name: 'Product Price',
          selector: 'productPrice',
        },
        {
          name: 'Product Quantity',
          selector: 'productQuantity',
        },
        {
          name: 'Supplier ID',
          selector: 'supplierID',
        },
      ],
    };
  }

  async componentDidMount() {
    console.log(`This is called for api calling`);
    //TODO: get all the information related to transaction here
    const cookie = new Cookie();
    const secretCustomerName = cookie.get('customerSecretUserName');
    const customerName = cookie.get('customerUserName');
    const customerMobile = cookie.get('customerMobileNumber');
    const userData = {
      secretUsername: secretCustomerName,
      userName: customerName,
      userMobile: customerMobile,
    };
    const response = await axios.post(`${URL.url}/getUser`, userData);
    console.log(response);
    this.setState({ transaction: response.data.customer_supplier });
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
