import React, { Component } from 'react'
import { default as ProductImage } from '../../images/productBag.svg'
import { default as NoDataImg } from '../../images/nodataimg.png'
import { Card, CardBody, CardGroup, CardText, CardTitle } from 'react-bootstrap';
// import './productList.css'

export default class productList extends Component {
  handleDescProd = (description) =>{
    alert(`${description}`)
  }
  render() {
    const {products} = this.props;
    const windowWidth = this.props.windowWidth
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      });
    return (
        <div>{windowWidth > 900 ? (
              <CardGroup style={{marginLeft:'0%', marginRight:'5%'}}>
        {products.map((data,index)=>{
          return(
            <div style={{marginBottom:'8rem', marginRight:'3rem'}}>
                <Card style={{border:'none',width:'194px', height:'178px'}} key={index}>
                  <a style={{cursor:"pointer"}} onClick={()=> this.handleDescProd(data.description)}>
                    <CardBody>
                    <Card.Img style={{width:'194px', height:'178px'}} src={data.images}/>
                    <CardTitle style={{fontSize:'12px',fontFamily:'Cambay'}}>
                    <br/>
                    <b>{data.name}</b>
                    <p></p>
                    <p style={{color:'#FFAC33'}}><b>{formatter.format(data.sale_price)}</b></p>
                    <p><b>5.0</b> (10) Terjual</p>
                    </CardTitle>
                    </CardBody>
                    </a>
                </Card>
              </div>
        )})}
        </CardGroup>
        ):null}
        </div>
    )
  }
}
