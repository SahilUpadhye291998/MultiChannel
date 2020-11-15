import Page from 'components/Page';
import {
  chartjs,
} from 'demos/dashboardPage';
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';

class DashboardPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {

    return (
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        <Row>
          <Col lg="8" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                Total Revenue{' '}
                <small className="text-muted text-capitalize">This year</small>
              </CardHeader>
              <CardBody>
                <Line data={chartjs.line.data} options={chartjs.line.options} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}
export default DashboardPage;
