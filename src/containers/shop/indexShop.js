import React, { Component } from 'react'
import IndexNavbar from '../../components/navbar/IndexNavbar'
import IndexFooter from '../../components/footer/indexFooter'
import ShopBanner from '../../components/shopComponents/banner'
import SearchComponent from '../../components/shopComponents/searchComponent'
import SideBarFilter from '../../components/shopComponents/sideBarFilter'
import ProductList from '../../components/shopComponents/productList'
import { Col, Row } from 'react-bootstrap'

export default class indexShop extends Component {
  render() {
    return (
    <>
        <IndexNavbar/>
        <div className='container-fluid'>
            <ShopBanner/>
            <SearchComponent/>
            <Row>
          <Col>
            <SideBarFilter/>
            </Col>
            <Col>
                <ProductList/>
            </Col>
            </Row>
        </div>
        <IndexFooter/>
    </>
    )
  }
}
