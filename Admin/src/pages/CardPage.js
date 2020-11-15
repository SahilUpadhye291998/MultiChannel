import user1Image from 'assets/img/users/100_1.jpg';
import { UserCard } from 'components/Card';
import Page from 'components/Page';
import React from 'react';
import {
  Col,
  Row,
} from 'reactstrap';

const CardPage = () => {
  return (
    <Page title="Cards" breadcrumbs={[{ name: 'cards', active: true }]}>
      <Row>
        <Col md={5}>
          <UserCard
            avatar={user1Image}
            title="Admin"
            subtitle="admin@gmail.com"
            text="I will be adding the user to the blockchain"
            style={{
              height: 300,
            }}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default CardPage;
