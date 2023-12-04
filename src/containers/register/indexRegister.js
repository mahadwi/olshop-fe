import React, { Component } from 'react'
import RegisterIndex from '../../components/register/registerIndex'
import IndexNavbar from '../../components/navbar/IndexNavbar'
import FooterComponent from '../../components/footer/FooterComponent'
import axios from 'axios'
import { GetProduct, GetBrand, GetCategory, GetBanner } from '../../config/api';
import NavbarComponent from '../../components/homeComponents/navbar/NavbarComponent'
import ScreenContainerComponent from '../../components/general/screen-container/ScreenContainerComponent'
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            brands: [],
            categories: [],
            headerBanner: "",
            filterBrand: '',
        }
    }

    async componentDidMount() {
        try {
            const id = window.location.href.split('/')[4]
            const response = await axios.get(GetProduct, {
                params:
                {
                    category_id: [id],
                    brand_id: this.state.filterBrand
                }
            })
            {
                let produk = [];
                const datas = response.data.data
                console.log('datas:', datas)
                datas.map((data) => {
                    produk.push(data)
                })
                this.setState({ product: produk })
                this.handleDropDownDesign()
                this.handleDropDownCollective()
                this.handleGetBanner()
            }
        } catch (error) {
            console.log('error :', error)
        }
    }

    async handleDropDownDesign() {
        try {
            const response = await axios.get(GetBrand)
            this.setState({ brands: response.data.data })
        } catch (error) {
            console.log(error)
        }
    }

    async handleDropDownCollective() {
        try {
            const response = await axios.get(GetCategory)
            this.setState({ categories: response.data.data })
        } catch (error) {
            console.log(error)
        }
    }



    render() {
        return (
            <div>
                {/* <IndexNavbar
          brands={this.state.brands}
          categories={this.state.categories}
        /> */}
                <NavbarComponent />
                <ScreenContainerComponent>
                    <RegisterIndex />
                    <br />
                    <br />
                    <br />
                    <FooterComponent />
                </ScreenContainerComponent>
            </div>
        )
    }
}
