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
      filterBrand :'',
    }
  }

    async componentDidMount() {
       try {
        const id = window.location.href.split('/')[4]
        const response = await axios.get(GetProduct, {params:
          {category_id:[id],
          brand_id:this.state.filterBrand
          }
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

        handleFilterBrand = async (data) => {
        await this.setState({filterBrand : data})
        try {
          const id = window.location.href.split('/')[4]
          const response = await axios.get(GetProduct, {params:
            {category_id:[id],
            brand_id:[this.state.filterBrand]
            }
          })
          {
              let produk = [];
              const datas = response.data.data
              console.log('datas:',datas)
              datas.map((data)=>{
                produk.push(data)
              })
              this.setState({product:produk})
          }
         } catch (error) {
              console.log('error :',error)
         }
       }

       handleNonFilter = async () => {
        try {
          const response = await axios.get(GetProduct)
          {
              let produk = [];
              const datas = response.data.data
              console.log('datas:',datas)
              datas.map((data)=>{
                produk.push(data)
              })
              this.setState({product:produk})
          }
         } catch (error) {
              console.log('error :',error)
         }
       }

       handleNewArrivalProd = async () => {
        try {
          const response = await axios.get(GetProduct)
          {
              let produk = [];
              const newArrival = response.data.data
              const datas = newArrival.filter(data => data.is_new_arrival === true)
              datas.map((data)=>{
                produk.push(data)
              })
              this.setState({product:produk})
          }
         } catch (error) {
              console.log('error :',error)
         }
      }

      handleConditionNew = async () => {
        try {
          const response = await axios.get(GetProduct)
          {
              let produk = [];
              const newArrival = response.data.data
              const datas = newArrival.filter(data => data.condition === "New")
              datas.map((data)=>{
                produk.push(data)
              })
              this.setState({product:produk})
          }
         } catch (error) {
              console.log('error :',error)
         }
      }
    
      handleConditionLikeNew = async () => {
        try {
          const response = await axios.get(GetProduct)
          {
              let produk = [];
              const newArrival = response.data.data
              const datas = newArrival.filter(data => data.condition === "Like New")
              datas.map((data)=>{
                produk.push(data)
              })
              this.setState({product:produk})
          }
         } catch (error) {
              console.log('error :',error)
         }
      }
    
      handlePriceLowToHigh = async () => {
        try {
          const response = await axios.get(GetProduct)
          {
              let produk = [];
              const datas = response.data.data
              const sortPrice = datas.sort((a,b) => a.sale_price  - b.sale_price)
              sortPrice.map((data)=>{
                produk.push(data)
              })
              this.setState({product:produk})
          }
         } catch (error) {
              console.log('error :',error)
         }
      }
    
      handleLowToHigh = async () => {
        try {
          const response = await axios.get(GetProduct)
          {
              let produk = [];
              const datas = response.data.data
              const sortPrice = datas.sort((a,b) => b.sale_price  - a.sale_price)
              sortPrice.map((data)=>{
                produk.push(data)
              })
              this.setState({product:produk})
          }
         } catch (error) {
              console.log('error :',error)
         }
      }
    
      handleAtoZ = async () => {
        try {
          const response = await axios.get(GetProduct)
          {
              let produk = [];
              const datas = response.data.data
              const sortPrice = datas.sort((a,b) => a.name.localeCompare(b.name))
              sortPrice.map((data)=>{
                produk.push(data)
              })
              this.setState({product:produk})
          }
         } catch (error) {
              console.log('error :',error)
         }
      }
    
      handleZtoA = async () => {
        try {
          const response = await axios.get(GetProduct)
          {
              let produk = [];
              const datas = response.data.data
              const sortPrice = datas.sort((a,b) => b.name.localeCompare(a.name))
              sortPrice.map((data)=>{
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
    const banyakProduct = products.length
    console.log('filter id brand :',this.state.filterBrand)
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
        brands={this.state.brands}
        handleFilterBrand={this.handleFilterBrand}
        filterBrand={this.state.filterBrand}
        handleNonFilter={this.handleNonFilter}
        handleNewArrivalProd={this.handleNewArrivalProd}
        handlePriceLowToHigh={this.handlePriceLowToHigh}
        handleLowToHigh={this.handleLowToHigh}
        handleAtoZ={this.handleAtoZ}
        handleZtoA={this.handleZtoA}
        handleConditionNew={this.handleConditionNew}
        handleConditionLikeNew={this.handleConditionLikeNew}
        />
        <CollectiveProduct
          products={products}
        />
      </div>
    )
  }
}
