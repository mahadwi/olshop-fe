import React, { Component } from 'react'
import DesginersComponent from '../../components/designersComponents/desginersComponent'
import axios from 'axios';
import { GetProduct, GetBrand, GetCategory } from '../../config/api';
import IndexNavbar from '../../components/navbar/IndexNavbar';
import DesignersBanner from '../../components/designersComponents/designersBanner';
import DesignersSearch from '../../components/designersComponents/designersSearch';


export default class designerIndex extends Component { 
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
        const response = await axios.get(GetProduct)
        {
            let produk = [];
            const datas = response.data.data
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

       handleBrandFilter = async (data) => {
        try {
          const response = await axios.get(GetProduct, {params : {brand_id : data}})
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
      <div>
        <IndexNavbar
        brands={this.state.brands}
        handleBrandFilter={this.handleBrandFilter}
        categories={this.state.categories}
        />
        <DesignersBanner/>
        <DesignersSearch/>
        <DesginersComponent
         products={products}
        />
      </div>
    )
  }
}
