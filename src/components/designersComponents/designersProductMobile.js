import React, { Component } from 'react';
import { Card, CardBody, CardGroup, CardTitle, Col, Row } from 'react-bootstrap';

export default class CollectiveProductMobile extends Component {
  handleDescProd = (description) => {
    alert(`${description}`);
  };

  render() {
    const { products } = this.props;
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });

    return (
      <div>
        <Row>
          {products.map((data, index) => (
            // <Col key={index} style={{ marginBottom: '1rem', flex:'50%' }}>
              <Card key={index} style={{ border: 'none', width: '100%', flex:'50%'}}>
                <a style={{ cursor: 'pointer' }} onClick={() => this.handleDescProd(data.description)}>
                  <CardBody>
                    <Card.Img style={{ width: '158px', height: '201px' }} src={data.images[0] || 'no image'} alt={data.name} />
                    <CardTitle style={{ width: '158px', height: '201px', fontSize: '12 px', fontFamily: 'Cambay', marginTop: '10px' }}>
                      <b>{data.name}</b>
                      <p></p>
                      <p style={{ color: '#FFAC33' }}>
                        <b>{formatter.format(data.sale_price)}</b>
                      </p>
                      <p>
                        <b>5.0</b> (10) Terjual
                      </p>
                    </CardTitle>
                  </CardBody>
                </a>
              </Card>
            // </Col>
          ))}
        </Row>
      </div>
    );
  }
}
