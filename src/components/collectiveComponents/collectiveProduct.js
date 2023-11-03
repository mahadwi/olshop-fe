import React, { Component } from 'react'
import { Card, CardBody, CardGroup, CardText, CardTitle } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default class collectiveProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favInfo :  false,
    }
  }
  handleDescProd = (description) =>{
    alert(`${description}`)
  }
  handleFavIcon = () => {
    const favstat = this.state.favInfo
    this.setState({favInfo:!favstat})
  }
  render() {
    const {products} = this.props;
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      });
    return (
        <div>
            <CardGroup style={{marginLeft:'10%', marginRight:'5%'}}>
        {products.map((data,index)=>{
          return(
            <div style={{marginBottom:'8rem', marginRight:'3rem'}}>
                <Card style={{border:'none',width:'194px', height:'178px'}} key={index}>
                    <CardBody>
                    <Card.Img style={{width:'194px', height:'178px'}} src={data.images}/>
                    <CardTitle style={{fontSize:'12px',fontFamily:'Cambay'}}>
                    <a onClick={this.handleFavIcon}>
                      {this.state.favInfo === false ? (<FontAwesomeIcon icon={faHeart} style={{color: "#ff0000",}} />) :(<FontAwesomeIcon icon={faHeart} />) }
                    </a>
                    <br/>
                    <b>{data.name}</b>
                    <p></p>
                    <p style={{color:'#FFAC33'}}><b>{formatter.format(data.sale_price)}</b></p>
                    <p><b>5.0</b> (10) Terjual</p>
                    </CardTitle>
                    </CardBody>
                </Card>
                </div>
        )})}
        </CardGroup>
      </div>
    )
  }
}
