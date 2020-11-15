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
      transaction_farmer: [],
      transaction_customer: [],
      columnsForFarmer: [
        {
          name: 'Farmer ID',
          selector: 'farmerID',
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
      columnsForCustomer: [
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
    console.log(`This is called for api calling In the transaction`);
    //TODO: get all the information related to transaction here
    const cookie = new Cookie();
    const secretSupplierName = cookie.get('supplierSecretUserName');
    const supplierName = cookie.get('supplierUserName');
    const supplierMobile = cookie.get('supplierMobileNumber');
    const userData = {
      secretSupplierName: secretSupplierName,
      supplierName: supplierName,
      supplierMobile: supplierMobile,
      type: 'both',
    };
    const response = await axios.post(`${URL.url}/readSupplier`, userData);
    // console.log('Response : ' + response);
    if (response.data.code === 200) {
      this.setState({
        transaction_farmer: response.data.farmer.supplier_farmer,
        transaction_customer: response.data.supplier.supplier_customer,
      });
    }
  }

  render() {
    const {
      transaction_customer,
      transaction_farmer,
      columnsForFarmer,
      columnsForCustomer,
    } = this.state;
    return (
      <Page
        title="Trans"
        breadcrumbs={[{ name: 'tables', active: true }]}
        className="TablePage"
      >
        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader>{'Transaction of the Supplier-Farmer'}</CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Card body>
                      <DataTable
                        data={transaction_farmer}
                        title="Transaction"
                        columns={columnsForFarmer}
                      />
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card className="mb-3">
              <CardHeader>{'Transaction of the Supplier-Customer'}</CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Card body>
                      <DataTable
                        data={transaction_customer}
                        title="Transaction"
                        columns={columnsForCustomer}
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
