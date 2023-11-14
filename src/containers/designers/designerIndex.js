import React, { Component } from 'react'
import DesginersComponent from '../../components/designersComponents/desginersComponent'
import axios from 'axios';
import { GetProduct, GetBrand, GetCategory, GetBanner } from '../../config/api';
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
      headerBanner : ""
    }
  }

    async componentDidMount() {
       try {
        const id = window.location.href.split('/')[4]
        const response = await axios.get(GetProduct,{params:{brand_id:[id]}})
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
    console.log('data banner designer : ', this.state.headerBanner)
    return (
      <div>
        <IndexNavbar
        brands={this.state.brands}
        handleBrandFilter={this.handleBrandFilter}
        categories={this.state.categories}
        />
        <DesignersBanner
        headerBanner={this.state.headerBanner}
        />
        <DesignersSearch
        products={products}
        />
        <DesginersComponent
         products={products}
        />
      </div>
    )
  }
}
