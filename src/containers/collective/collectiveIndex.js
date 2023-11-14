import React, { Component } from 'react'
import axios from 'axios'
import { GetProduct, GetBrand, GetCategory, GetBanner } from '../../config/api';
import CollectiveSearch from '../../components/collectiveComponents/collectiveSearch';
import IndexNavbar from '../../components/navbar/IndexNavbar';
import BannerSlider from '../../components/collectiveComponents/headerBanner/bannerSlider';
import CollectiveProduct from '../../components/collectiveComponents/collectiveProduct';

export default class collectiveIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product : [],
      brands : [],
      categories : [],
      headerBanner : "",
    }
  }

    async componentDidMount() {
       try {
        const id = window.location.href.split('/')[4]
        const response = await axios.get(GetProduct, {params:
          {category_id:[id]}
        })
        {
            let produk = [];
            const datas = response.data.data
            console.log('datas:',datas)
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

      async handleGetBanner() {
        try {
          const response = await axios.get(GetBanner)
          this.setState({headerBanner: response.data.data[2].images[0]})
        } catch (error) {
          console.log(error)
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

  render() {
    const product = this.state;
    const products = product.product
    const banyakProduct = products.length
    console.log('banyak product container :',banyakProduct)
    return (
      <div>
        <IndexNavbar
          brands={this.state.brands}
          categories={this.state.categories}
        />
        <BannerSlider
        headerBanner={this.state.headerBanner}
        />
        <CollectiveSearch
        banyakProduct={banyakProduct}
        />
        <CollectiveProduct
          products={products}
        />
      </div>
    )
  }
}
