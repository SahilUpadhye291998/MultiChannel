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
    };
  }

  async componentDidMount() {
    console.log(`This is called for api calling`);
    //TODO: get all the information related to transaction here
    const cookie = new Cookie();
    const secretFarmerName = cookie.get('farmerSecretUserName');
    const farmerName = cookie.get('farmerUserName');
    const farmerMobile = cookie.get('farmerMobileNumber');
    const userData = {
      secretFarmerName: secretFarmerName,
      farmerName: farmerName,
      farmerMobile: farmerMobile,
    };
    const response = await axios.post(`${URL.url}/readFarmer`, userData);
    console.log(response);
    this.setState({ transaction: response.data.farmer_supplier });
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
