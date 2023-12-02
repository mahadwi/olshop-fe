import React, { Component } from 'react'
import { Card, CardBody, CardGroup, CardText, CardTitle } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { IconStarFilled, IconHeart, IconHeartFilled } from '@tabler/icons-react';
import './collective-product.scoped.scss'
import NoPhotoProduct from './../../images/product-item/no-photo-product.png'

export default class collectiveProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favInfo: false,
        }
    }
    handleDescProd = (description) => {
        alert(`${description}`)
    }
    handleFavIcon = () => {
        const favstat = this.state.favInfo
        this.setState({ favInfo: !favstat })
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
                            <div style={{ marginBottom: '10rem', marginRight: '3rem' }}>
                                <Card style={{ border: 'none', width: '194px', height: '178px' }} key={index}>
                                    <CardBody>
                                        <div className='overlay'>
                                            <img className='' style={{ width: '194px', height: '178px' }} src={data.images ? data.images[0] : NoPhotoProduct} />
                                            <div className='icon-overlay'><IconHeart /></div>
                                        </div>
                                        <CardTitle style={{ fontFamily: 'Cambay' }}>
                                            <br />
                                            <b style={{ fontSize: '13px' }}>{data.name}</b>
                                            <p></p>
                                            <p style={{ color: '#FFAC33', fontSize: '13px' }}><b>{formatter.format(data.sale_price)}</b></p>
                                            <p style={{ fontSize: '13px' }}><b>5.0</b> <IconStarFilled style={{ color: '#FFAC33' }} size={12} /> (10) Terjual</p>
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
