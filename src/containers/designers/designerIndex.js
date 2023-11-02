import React, { Component } from 'react'
import DesginersComponent from '../../components/designersComponents/desginersComponent'
import axios from 'axios';
import { GetProduct } from '../../config/api';
import IndexNavbar from '../../components/navbar/IndexNavbar';
import DesignersBanner from '../../components/designersComponents/designersBanner';
import DesignersSearch from '../../components/designersComponents/designersSearch';


export default class designerIndex extends Component { 
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
            const datas = response.data.data[0]
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
        <IndexNavbar/>
        <DesignersBanner/>
        <DesignersSearch/>
        <DesginersComponent
         products={products}
        />
      </div>
    )
  }
}
