import React, { Component } from 'react';
import { Card, CardBody, CardGroup, CardTitle } from 'react-bootstrap';

export default class ProductList extends Component {
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
        <CardGroup style={{ display: 'flex', flexWrap: 'wrap' }}>
          {products.map((data, index) => (
            <div key={index} style={{ marginBottom: '1rem', flex: '1 0 21%' }}>
              <Card style={{ border: 'none' }}>
                <a style={{ cursor: 'pointer' }} onClick={() => this.handleDescProd(data.description)}>
                  <CardBody>
                    <Card.Img style={{ width: '158', height: '201' }} src={data.images} alt={data.name} />
                    <CardTitle style={{ fontSize: '12px', fontFamily: 'Cambay' }}>
                      <br />
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
            </div>
          ))}
        </CardGroup>
      </div>
    );
  }
}
