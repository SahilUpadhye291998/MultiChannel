import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Cookie from 'universal-cookie';
import URL from '../secret/URL';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history_farmer: [],
      history_customer: [],
      coloumn: [
        {
          name: 'ID',
          selector: 'id',
        },
        {
          name: 'Type Of',
          selector: 'typeOf',
        },
        {
          name: 'Name',
          selector: 'name',
        },
        {
          name: 'Mobile',
          selector: 'mobile',
        },
        {
          name: 'Amount',
          selector: 'amount',
        },
        {
          name: 'Seconds',
          selector: 'seconds',
        },
        {
          name: 'nanos',
          selector: 'nanos',
        },
      ],
    };
  }

  async componentDidMount() {
    //TODO: Request to get all the history
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
    const response = await axios.post(
      `${URL.url}/readSupplierHistory`,
      userData,
    );
    console.log(response.data);
    const dataForTableFarmer = response.data.farmer.map(data => {
      const outputElement = {
        id: data.Value.id,
        typeOf: data.Value.docType,
        name: data.Value.name,
        mobile: data.Value.mobile,
        amount: data.Value.amount,
        seconds: data.Timestamp.seconds,
        nanos: data.Timestamp.nanos,
      };
      return outputElement;
    });
    const dataForTableCustomer = response.data.customer.map(data => {
      const outputElement = {
        id: data.Value.id,
        typeOf: data.Value.docType,
        name: data.Value.name,
        mobile: data.Value.mobile,
        amount: data.Value.amount,
        seconds: data.Timestamp.seconds,
        nanos: data.Timestamp.nanos,
      };
      return outputElement;
    });
    if (response.data.code === 200) {
      this.setState({
        history_farmer: dataForTableFarmer,
        history_customer: dataForTableCustomer,
      });
    }
  }

  render() {
    const { history_farmer, history_customer, coloumn } = this.state;
    return (
      <Page
        title="History"
        breadcrumbs={[{ name: 'tables', active: true }]}
        className="TablePage"
      >
        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader>{'History of the Farmer'}</CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Card body>
                      <DataTable
                        data={history_farmer}
                        columns={coloumn}
                        title={`History`}
                      />
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card className="mb-3">
              <CardHeader>{'History of the Customer'}</CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Card body>
                      <DataTable
                        data={history_customer}
                        columns={coloumn}
                        title={`History`}
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

export default History;
