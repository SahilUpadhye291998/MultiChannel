import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Cookie from 'universal-cookie';
import URL from '../secret/URL';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
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
    const secretFarmerName = cookie.get('farmerSecretUserName');
    const farmerName = cookie.get('farmerUserName');
    const farmerMobile = cookie.get('farmerMobileNumber');
    const userData = {
      secretFarmerName: secretFarmerName,
      farmerName: farmerName,
      farmerMobile: farmerMobile,
    };
    const response = await axios.post(`${URL.url}/readFarmerHistory`, userData);
    console.log(response.data);
    const dataForTable = response.data.map(data => {
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
    this.setState({ history: dataForTable });
  }

  render() {
    const { history, coloumn } = this.state;
    return (
      <Page
        title="History"
        breadcrumbs={[{ name: 'tables', active: true }]}
        className="TablePage"
      >
        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader>{'History of the user'}</CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Card body>
                      <DataTable
                        data={history}
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
