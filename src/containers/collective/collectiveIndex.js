import React, { Component } from 'react'
import axios from 'axios'
import { GetProduct, GetBrand, GetCategory } from '../../config/api';
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
    }
  }

    async componentDidMount() {
       try {
        const response = await axios.get(GetProduct, {params:
          {color_id:4}
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

  render() {
    const product = this.state;
    const products = product.product
    // console.log('product :',product)
    return (
      <div>
        <IndexNavbar
          brands={this.state.brands}
          categories={this.state.categories}
        />
        <BannerSlider/>
        <CollectiveSearch/>
        <CollectiveProduct
          products={products}
        />
      </div>
    )
  }
}
