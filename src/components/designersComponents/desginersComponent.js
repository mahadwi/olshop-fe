import React, { Component } from 'react'
import { Card, CardBody, CardGroup, CardText, CardTitle } from 'react-bootstrap';
import { IconStarFilled, IconHeart, IconHeartFilled } from '@tabler/icons-react';
import './designers-product.scoped.scss'
import NoPhotoProduct from './../../images/product-item/no-photo-product.png'

export default class desginersComponent extends Component {
    handleDescProd = (description) => {
        alert(`${description}`)
    }
    render() {
        const { products } = this.props;
        const windowWidth = this.props.windowWidth
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        });
        return (
            <div> {windowWidth > 900 ? (
                <CardGroup style={{ marginLeft: '10%', marginRight: '5%' }}>
                    {products.map((data, index) => {
                        return (
                            <div style={{ marginBottom: '9rem', marginRight: '3rem' }}>
                                <Card style={{ border: 'none', width: '194px', height: '178px' }} key={index}>
                                    <CardBody>
                                        <div className='overlay'>
                                            <img className='' style={{ width: '194px', height: '178px' }} src={data.images ? data.images[0] : NoPhotoProduct} />
                                            <div className='icon-overlay'><IconHeart /></div>
                                        </div>
                                        <CardTitle style={{ fontSize: '12px', fontFamily: 'Cambay' }}>
                                            <br />
                                            <b>{data.name}</b>
                                            <p></p>
                                            <p style={{ color: '#FFAC33' }}><b>{formatter.format(data.sale_price)}</b></p>
                                            <p><b>5.0</b> <IconStarFilled style={{ color: '#FFAC33' }} size={12} /> (10) Terjual</p>
                                        </CardTitle>
                                    </CardBody>
                                </Card>
                            </div>
                        )
                    })}
                </CardGroup>
            ) : null}
            </div>
        )
    }
}
