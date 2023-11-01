import React, { Component } from 'react'
import { Card, CardBody, CardGroup, CardText, CardTitle } from 'react-bootstrap';

export default class collectiveProduct extends Component {
  render() {
    const {products} = this.props;
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      });
    return (
        <div>
            <CardGroup style={{marginLeft:'7%', marginRight:'5%'}}>
        {products.map((data,index)=>{
          return(
                <Card style={{border:'none',width:'194px', height:'178px'}} key={index}>
                    <CardBody>
                    <Card.Img style={{width:'194px', height:'178px'}} src={data.brand.image_url}/>
                    <CardTitle style={{fontSize:'12px',fontFamily:'Cambay'}}>
                    <br/>
                    <b>{data.name}</b>
                    <p></p>
                    <p style={{color:'#FFAC33'}}><b>{formatter.format(data.sale_price)}</b></p>
                    <p><b>5.0</b> (10) Terjual</p>
                    </CardTitle>
                    </CardBody>
                </Card>
        )})}
        </CardGroup>
      </div>
    )
  }
}
