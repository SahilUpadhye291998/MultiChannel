import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

const tempData = [
  {
    id: 1,
    name: "Sample Name 1",
    mobileNumber: "123567890",
    address: "Sample Address for User 1",
    isAuthenticated: false,
    typeOf:"Farmer",
  },
  {
    id: 2,
    name: "Sample Name 2",
    mobileNumber: "123567890",
    address: "Sample Address for User 2",
    isAuthenticated: false,
    typeOf:"Supplier",
  },
  {
    id: 3,
    name: "Sample Name 3",
    mobileNumber: "123567890",
    address: "Sample Address for User 3",
    isAuthenticated: false,
    typeOf:"Logistics",
  },
  {
    id: 4,
    name: "Sample Name 4",
    mobileNumber: "123567890",
    address: "Sample Address for User 4",
    isAuthenticated: false,
    typeOf:"Logistics",
  }
];

const handleRequestToAccept = (id) => {
  console.log(`Accept : ${id}`);
  // TODO: Add the get request

  // TODO: Decode and make the object in readable format

  // TODO: Make a create account from here after you get the userdata

  // TODO: Delete the user
}

const handleRequestToDecline = (id) => {
  console.log(`Decline : ${id}`);
  // TODO: Delete the user
}


const TablePage = () => {
  return (
    <Page
      title="Tables"
      breadcrumbs={[{ name: 'tables', active: true }]}
      className="TablePage"
    >
      <Row>
        <Col>
          <Card className="mb-3">
            <CardHeader>{'User Data'}</CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <Card body>
                    <Table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Mobile Number</th>
                          <th>Address</th>
                          <th>is Authorized</th>
                          <th>Type Of</th>
                          <th>Accept</th>
                          <th>Decline</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          tempData.map(data => (
                            <tr key={data.id}>
                              <td>{data.id}</td>
                              <td>{data.name}</td>
                              <td>{data.mobileNumber}</td>
                              <td>{data.address}</td>
                              <td>{`${data.isAuthenticated}`}</td>
                              <td>{data.typeOf}</td>
                              <td><button className="btn btn-success" onClick={(e) => handleRequestToAccept(data.id, e)} >Accept</button></td>
                              <td><button className="btn btn-danger" onClick={(e) => handleRequestToDecline(data.id, e)} >Decline</button></td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </Table>
                  </Card>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default TablePage;
