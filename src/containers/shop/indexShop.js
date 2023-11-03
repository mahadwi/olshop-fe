import React, { Component } from 'react'
import IndexNavbar from '../../components/navbar/IndexNavbar'
import IndexFooter from '../../components/footer/indexFooter'
import ShopBanner from '../../components/shopComponents/banner'
import SearchComponent from '../../components/shopComponents/searchComponent'
import SideBarFilter from '../../components/shopComponents/sideBarFilter'
import ProductList from '../../components/shopComponents/productList'
import ColorPicker from '../../components/shopComponents/collorPicker/colorPicker'
import { Col, Row } from 'react-bootstrap'
import axios from 'axios'
import { GetProduct } from '../../config/api'

export default class indexShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product : []
    }
  }

    async componentDidMount() {
       try {
        const response = await axios.get(GetProduct)
        {
            let produk = [];
            const datas = response.data.data
            datas.map((data)=>{
              produk.push(data)
            })
            this.setState({product:produk})
        }
       } catch (error) {
            console.log('error :',error)
       }
      }
  render() {
    const product = this.state;
    const products = product.product
    return (
    <>
        <IndexNavbar/>
        <div className='container-fluid' style={{marginBottom:'5rem'}}>
            <ShopBanner/>
            <SearchComponent/>
            <Row>
          <Col>
            <SideBarFilter/>
            <ColorPicker/>
            </Col>
            <Col xs={9}>
              <ProductList
                products={products}
              />
            </Col>
            </Row>
        </div>
        <IndexFooter/>
    </>
    )
  }
}
