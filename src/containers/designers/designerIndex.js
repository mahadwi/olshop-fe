import React, { Component } from 'react'
import DesginersComponent from '../../components/designersComponents/desginersComponent'
import axios from 'axios';
import { GetProduct, GetBrand, GetCategory, GetBanner } from '../../config/api';
import IndexNavbar from '../../components/navbar/IndexNavbar';
import DesignersBanner from '../../components/designersComponents/designersBanner';
import DesignersSearch from '../../components/designersComponents/designersSearch';
import { BeatLoader } from 'react-spinners';

const override = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // You can adjust the background color and transparency
};


export default class designerIndex extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      product : [],
      brands : [],
      categories : [],
      headerBanner : "",
      filterCategory : [],
      loaderColor : 'black',
      loading : true
    }
  }

    async componentDidMount() {
       try {
        const id = window.location.href.split('/')[4]
        const response = await axios.get(GetProduct, {params:
          {brand_id:[id],
          category_id:this.state.filterCategory
          }
        })
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
            await this.setState({loading:false})
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

      handleFilterCategory = async (data) => {
        await this.setState({filterCategory : data})
        try {
          const id = window.location.href.split('/')[4]
          const response = await axios.get(GetProduct, {params:
            {brand_id:[id],
            category_id:[this.state.filterCategory]
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
          const id = window.location.href.split('/')[4]
          const response = await axios.get(GetProduct, {params:
            {brand_id:[id]
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

       handleNewArrivalProd = async () => {
        try {
          const id = window.location.href.split('/')[4]
          const response = await axios.get(GetProduct, {params:
            {brand_id:[id],
            category_id:[this.state.filterCategory]
            }
          })
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
          const id = window.location.href.split('/')[4]
          const response = await axios.get(GetProduct, {params:
            {brand_id:[id],
            category_id:[this.state.filterCategory]
            }
          })
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
          const id = window.location.href.split('/')[4]
          const response = await axios.get(GetProduct, {params:
            {brand_id:[id],
            category_id:[this.state.filterCategory]
            }
          })
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
          const id = window.location.href.split('/')[4]
          const response = await axios.get(GetProduct, {params:
            {brand_id:[id],
            category_id:[this.state.filterCategory]
            }
          })
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
          const id = window.location.href.split('/')[4]
          const response = await axios.get(GetProduct, {params:
            {brand_id:[id],
            category_id:[this.state.filterCategory]
            }
          })
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
          const id = window.location.href.split('/')[4]
          const response = await axios.get(GetProduct, {params:
            {brand_id:[id],
            category_id:[this.state.filterCategory]
            }
          })
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
          const id = window.location.href.split('/')[4]
          const response = await axios.get(GetProduct, {params:
            {brand_id:[id],
            category_id:[this.state.filterCategory]
            }
          })
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
    const {loading, loaderColor} = this.state
    const products = product.product
    const banyakProduct = products.length
    console.log('data banner designer : ', this.state.headerBanner)
    return (
      <div>
        {loading && (
        <BeatLoader
          color={loaderColor}
          loading={loading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    <div style={{ display: loading ? 'none' : 'block' }}>
      <div>
        <IndexNavbar
        brands={this.state.brands}
        categories={this.state.categories}
        />
        <DesignersBanner
        headerBanner={this.state.headerBanner}
        />
        <DesignersSearch
        banyakProduct={banyakProduct}
        products={products}
        categories={this.state.categories}
        handleFilterCategory={this.handleFilterCategory}
        handleNonFilter={this.handleNonFilter}
        handleNewArrivalProd={this.handleNewArrivalProd}
        handlePriceLowToHigh={this.handlePriceLowToHigh}
        handleLowToHigh={this.handleLowToHigh}
        handleAtoZ={this.handleAtoZ}
        handleZtoA={this.handleZtoA}
        handleConditionNew={this.handleConditionNew}
        handleConditionLikeNew={this.handleConditionLikeNew}
        />
        <DesginersComponent
         products={products}
        />
      </div>
      </div>
      </div>
    )
  }
}
