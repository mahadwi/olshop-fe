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
import ReactPaginate from 'react-paginate'
import { BeatLoader } from 'react-spinners';
import Pagination from '../../components/general/pagination'


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

export default class indexShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      perPage: 15,
      product : [],
      color : null,
      colorParam : null,
      brands: [],
      categories : [],
      headerBanner : "",
      itemChecked : [],
      hideFilter : true,
      itemCheckedBrand : [],
      price_min : '',
      loaderColor : 'black',
      loading : true
    }
  }

    async componentDidMount() {
       try {
        this.setState({loading:true})
        const response = await axios.get(GetProduct, {params : {color_id : this.state.colorParam,
          category_id:this.state.itemChecked,
          brand_id:this.state.itemCheckedBrand,
          page: this.state.page,
          itemPerpage: this.state.perPage
        }})
        setTimeout(() => {
            let produk = [];
            const datas = response.data.data
            datas.map((data)=>{
              produk.push(data)
            })
            this.setState({product:produk})
            this.handleDropDownDesign()
            this.handleDropDownCollective()
            this.handleGetBanner()
            this.handleCheckboxChange()
            this.handleCheckboxChangeBrand()
            this.handleMinPriceFilter()
            this.setState({loading:false})
        },1000)
       } catch (error) {
            console.log('error :',error)
       }
      }

      handleFetchData = async () =>{
        try {
          const response = await axios.get(GetProduct, {params : {color_id : this.state.colorParam,
            category_id:this.state.itemChecked,
            brand_id:this.state.itemCheckedBrand,
            page: this.state.page,
            itemPerpage: this.state.perPage
          }})
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
              this.handleCheckboxChange()
              this.handleCheckboxChangeBrand()
              this.handleMinPriceFilter()
          }
         } catch (error) {
              console.log('error :',error)
         }
      }

     handlePageChange = (page) => {
      this.setState({page:page}, this.handleFetchData())
      };

  handleColorFilter = async (data) => {
    try {
      await this.setState({colorParam:data})
      const response = await axios.get(GetProduct, {params : {color_id : this.state.colorParam,
        category_id:this.state.itemChecked,
        brand_id:this.state.itemCheckedBrand,
        price_min : this.state.price_min,
        price_max: 100000000,
      }})
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

  handleNewArrivalProd = async () => {
    try {
      this.handleCheckboxChange()
      this.handleCheckboxChangeBrand()
      const response = await axios.get(GetProduct, {params : {price_min : this.state.price_min,
        category_id:this.state.itemChecked,
        brand_id:this.state.itemCheckedBrand,
        price_max: 100000000,
        color_id : this.state.colorParam
      }})
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
      this.handleCheckboxChange()
      this.handleCheckboxChangeBrand()
      const response = await axios.get(GetProduct, {params : {color_id : this.state.colorParam,
        category_id:this.state.itemChecked,
        brand_id:this.state.itemCheckedBrand,
        price_min : this.state.price_min,
        price_max: 100000000
      }})
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
      this.handleCheckboxChange()
      this.handleCheckboxChangeBrand()
      const response = await axios.get(GetProduct, {params : {color_id : this.state.colorParam,
        category_id:this.state.itemChecked,
        brand_id:this.state.itemCheckedBrand,
        price_min : this.state.price_min,
        price_max: 100000000
      }})
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
      this.handleCheckboxChange()
      this.handleCheckboxChangeBrand()
      const response = await axios.get(GetProduct, {params : {color_id : this.state.colorParam,
        category_id:this.state.itemChecked,
        brand_id:this.state.itemCheckedBrand,
        price_min : this.state.price_min,
        price_max: 100000000
      }})
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
      this.handleCheckboxChange()
      this.handleCheckboxChangeBrand()
      const response = await axios.get(GetProduct, {params : {color_id : this.state.colorParam,
        category_id:this.state.itemChecked,
        brand_id:this.state.itemCheckedBrand,
        price_min : this.state.price_min,
        price_max: 100000000
      }})
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
      this.handleCheckboxChange()
      this.handleCheckboxChangeBrand()
      const response = await axios.get(GetProduct, {params : {color_id : this.state.colorParam,
        category_id:this.state.itemChecked,
        brand_id:this.state.itemCheckedBrand,
        price_min : this.state.price_min,
        price_max: 100000000
      }})
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
      this.handleCheckboxChange()
      this.handleCheckboxChangeBrand()
      const response = await axios.get(GetProduct, {params : {color_id : this.state.colorParam,
        category_id:this.state.itemChecked,
        brand_id:this.state.itemCheckedBrand,
        price_min : this.state.price_min,
        price_max: 100000000
      }})
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

  async handleDropDownDesign() {
    try {
     const response = await axios.get(GetBrand)
       this.setState({brands: response.data.data})
    } catch (error) {
       console.log(error)
    }
   }

   handleHideFilter = () => {
      this.setState({hideFilter:!this.state.hideFilter})
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

   handleCheckboxChange = async (e, itemId) => {
    try {
      const { checked } = e.target;
      await this.setState((prevState) => {
        let updatedItemChecked;
        if (checked) {
          // Add the item to the array if it's checked
          updatedItemChecked = [...prevState.itemChecked, itemId];
        } else {
          // Remove the item from the array if it's unchecked
          updatedItemChecked = prevState.itemChecked.filter((id) => id !== itemId);
        }
        return { itemChecked: updatedItemChecked };
      });
      const response = await axios.get(GetProduct, {params : {category_id: this.state.itemChecked.length<1 ? null : this.state.itemChecked,
        color_id : this.state.colorParam,
        brand_id : this.state.itemCheckedBrand
      }})
      {
          let produk = [];
          const datas = response.data && response.data.data
          datas.map((data)=>{
            produk.push(data)
          })
          this.setState({product:produk})
      }
     } catch (error) {
          console.log('error :',error)
     }
  };

  handleCheckboxChangeBrand = async (e, itemId) => {
    try {
      const { checked } = e.target;
      await this.setState((prevState) => {
        let updatedItemChecked;
        if (checked) {
          // Add the item to the array if it's checked
          updatedItemChecked = [...prevState.itemCheckedBrand, itemId];
        } else {
          // Remove the item from the array if it's unchecked
          updatedItemChecked = prevState.itemCheckedBrand.filter((id) => id !== itemId);
        }
        return { itemCheckedBrand: updatedItemChecked };
      });
      const response = await axios.get(GetProduct, {params : {brand_id: this.state.itemCheckedBrand.length<1 ? null : this.state.itemCheckedBrand,
        color_id : this.state.colorParam,
        brand_id : this.state.itemCheckedBrand
      }})
      {
          let produk = [];
          const datas = response.data && response.data.data
          datas.map((data)=>{
            produk.push(data)
          })
          this.setState({product:produk})
      }
     } catch (error) {
          console.log('error :',error)
     }
  };

  handleAfterChange = (value) => {
    // Fetch data when the slider value changes and the mouse is released
    this.handleMinPriceFilter(value)
  };

  handleMinPriceFilter = async (data) => {
    try {
      await this.setState({price_min:data})
      const response = await axios.get(GetProduct, {params : {price_min : this.state.price_min,
        price_max: 100000000,
        color_id : this.state.colorParam,
        category_id:this.state.itemChecked,
        brand_id:this.state.itemCheckedBrand,
        page: this.state.page,
        itemPerpage: this.state.perPage
      }})
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

  handlePageChange = () => {
  };


  render() {
    const {product, color, colorParam, headerBanner, loading, loaderColor} = this.state;
    console.log('data product check :',product)
    const banyakProduct = product.length
    const products = product;
    console.log('data loader:',loading)
    return (
    <>
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
            handleHideFilter={this.handleHideFilter}
            handleNewArrivalProd={this.handleNewArrivalProd}
            handlePriceLowToHigh={this.handlePriceLowToHigh}
            handleLowToHigh={this.handleLowToHigh}
            handleAtoZ={this.handleAtoZ}
            handleZtoA={this.handleZtoA}
            handleConditionNew={this.handleConditionNew}
            handleConditionLikeNew={this.handleConditionLikeNew}
            />
            <Row>
          {this.state.hideFilter===true ? (
          <Col>
          {this.state.hideFilter===true ? (
            <SideBarFilter
            handleCheckboxChange={this.handleCheckboxChange}
            handleCheckboxChangeBrand={this.handleCheckboxChangeBrand}
            itemChecked={this.state.itemChecked}
            hideFilter={this.state.hideFilter}
            handleMinPriceFilter={this.handleMinPriceFilter}
            handleAfterChange={this.handleAfterChange}
            />
            ):null}
          {this.state.hideFilter===true ? (
            <ColorPicker
            colorParam={colorParam}
            handleColorFilter={this.handleColorFilter}
            hideFilter={this.state.hideFilter}
            />
            ):null}
            </Col>
            ):null}
            <Col xs={this.state.hideFilter===true ? 9 : 12} 
            style={{marginLeft:this.state.hideFilter===true ? '0px' : '120px', marginBottom:'20px'}}>
              <ProductList
                products={products}
              />
            </Col>
            <Pagination
                 currentPage={this.state.page}
                 perPage={this.state.perPage}
                 total={banyakProduct|| 0}
                 onPageChange={this.handlePageChange}
              />
            </Row>
        </div>
        <IndexFooter/>
        </div>
    </>
    )
  }
}
