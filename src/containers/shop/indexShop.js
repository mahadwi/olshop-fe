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
import { GetProduct, GetBrand, GetCategory, GetBanner } from '../../config/api'

export default class indexShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product : [],
      color : null,
      colorParam : null,
      brands: [],
      categories : [],
      headerBanner : ""
    }
  }

    async componentDidMount() {
       try {
        const response = await axios.get(GetProduct, {params : {color_id : this.state.colorParam}})
        {
            let produk = [];
            const datas = response.data.data
            datas.map((data)=>{
              produk.push(data)
            })
            this.setState({product:produk})
            this.handleDropDownDesign()
            this.handleDropDownCollective()
            this.handleGetBanner()
        }
       } catch (error) {
            console.log('error :',error)
       }
      }

  handleColorFilter = async (data) => {
    try {
      const response = await axios.get(GetProduct, {params : {color_id : data}})
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

  async handleDropDownDesign() {
    try {
     const response = await axios.get(GetBrand)
       this.setState({brands: response.data.data})
    } catch (error) {
       console.log(error)
    }
   }

   async handleDropDownCollective(){
    try {
      const response = await axios.get(GetCategory)
      this.setState({categories: response.data.data})
    } catch (error) {
      console.log(error) 
    }
   }

   async handleGetBanner() {
    try {
      const response = await axios.get(GetBanner)
      this.setState({headerBanner: response.data.data[2].images[0]})
    } catch (error) {
      console.log(error)
    }
   }



  render() {
    const {product, color, colorParam, headerBanner} = this.state;
    const banyakProduct = product.length
    const products = product;
    return (
    <>
        <IndexNavbar
        brands={this.state.brands}
        categories={this.state.categories}
        />
        <div className='container-fluid' style={{marginBottom:'5rem'}}>
            <ShopBanner
            headerBanner={headerBanner}
            />
            <SearchComponent
            banyakProduct={banyakProduct}
            />
            <Row>
          <Col>
            <SideBarFilter
            />
            <ColorPicker
            colorParam={colorParam}
            handleColorFilter={this.handleColorFilter}
            />
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
