import React, { Component } from 'react'
import DesginersComponent from '../../components/designersComponents/desginersComponent'
import axios from 'axios';
import { GetProduct, GetBrand, GetCategory, GetBanner } from '../../config/api';
import IndexNavbar from '../../components/navbar/IndexNavbar';
import DesignersBanner from '../../components/designersComponents/designersBanner';
import DesignersSearch from '../../components/designersComponents/designersSearch';
import { BeatLoader } from 'react-spinners';
import Pagination from '../../components/general/pagination';
import DesignersProductMobile from '../../components/designersComponents/designersProductMobile';
import DesignerSearchMobile from '../../components/designersComponents/designersSearchMobile';
import NavbarComponent from '../../components/homeComponents/navbar/NavbarComponent';
import BreadCrumb from '../../components/general/breadcrumb/BreadCrumb';
import PaginationComponent from '../../components/pages/shop/index/pagination/PaginationComponent';
import ScreenContainerComponent from '../../components/general/screen-container/ScreenContainerComponent';

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
            page: 0,
            perPage: 18,
            product: [],
            brands: [],
            categories: [],
            headerBanner: "",
            filterCategory: [],
            loaderColor: 'rgba(228, 169, 81, 1)',
            loading: true,
            windowWidth: window.innerWidth,
            breadcrumbs: [],
        }
        this.handleResize = this.handleResize.bind(this);
    }

    async componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.loadBreadcrumbs()
        try {
            const id = window.location.href.split('/')[4]
            this.setState({ loading: true })
            const response = await axios.get(GetProduct, {
                params:
                {
                    brand_id: [id],
                    category_id: this.state.filterCategory
                }
            })
            setTimeout(() => {
                let produk = [];
                const datas = response.data.data;
                console.log('datas:', datas);
                datas.map((data) => {
                    produk.push(data);
                });
                this.setState({ product: produk });
                this.handleDropDownDesign();
                this.handleDropDownCollective();
                this.handleGetBanner();
                this.setState({ loading: false });
            }, 1000);
        } catch (error) {
            console.log('error :', error)
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    loadBreadcrumbs = () => {
        this.setState({
            breadcrumbs: [
                {
                    label: 'Home',
                    url: '/',
                },
                {
                    label: 'Designers',
                },
            ],
        });
    };

    handleResize() {
        this.setState({
            windowWidth: window.innerWidth,
        });
    }



    handlePageChange = (page) => {
        this.setState({ page: page })
    };


    async handleGetBanner() {
        try {
            const response = await axios.get(GetBanner)
            this.setState({ headerBanner: response.data.data[4].images[0] })
        } catch (error) {
            console.log(error)
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

    handleBrandFilter = async (data) => {
        try {
            const response = await axios.get(GetProduct, { params: { brand_id: data } })
            {
                let produk = [];
                const datas = response.data.data
                datas.map((data) => {
                    produk.push(data)
                })
                this.setState({ product: produk })
            }
        } catch (error) {
            console.log('error :', error)
        }
    }

    handleFilterCategory = async (data) => {
        await this.setState({ filterCategory: data })
        try {
            const id = window.location.href.split('/')[4]
            const response = await axios.get(GetProduct, {
                params:
                {
                    brand_id: [id],
                    category_id: [this.state.filterCategory]
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
            }
        } catch (error) {
            console.log('error :', error)
        }
    }

    handleNonFilter = async () => {
        try {
            const id = window.location.href.split('/')[4]
            const response = await axios.get(GetProduct, {
                params:
                {
                    brand_id: [id]
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
            }
        } catch (error) {
            console.log('error :', error)
        }
    }

    handleNewArrivalProd = async () => {
        try {
            const id = window.location.href.split('/')[4]
            const response = await axios.get(GetProduct, {
                params:
                {
                    brand_id: [id],
                    category_id: [this.state.filterCategory]
                }
            })
            {
                let produk = [];
                const newArrival = response.data.data
                const datas = newArrival.filter(data => data.is_new_arrival === true)
                datas.map((data) => {
                    produk.push(data)
                })
                this.setState({ product: produk })
            }
        } catch (error) {
            console.log('error :', error)
        }
    }

    handleConditionNew = async () => {
        try {
            const id = window.location.href.split('/')[4]
            const response = await axios.get(GetProduct, {
                params:
                {
                    brand_id: [id],
                    category_id: [this.state.filterCategory]
                }
            })
            {
                let produk = [];
                const newArrival = response.data.data
                const datas = newArrival.filter(data => data.condition === "New")
                datas.map((data) => {
                    produk.push(data)
                })
                this.setState({ product: produk })
            }
        } catch (error) {
            console.log('error :', error)
        }
    }

    handleConditionLikeNew = async () => {
        try {
            const id = window.location.href.split('/')[4]
            const response = await axios.get(GetProduct, {
                params:
                {
                    brand_id: [id],
                    category_id: [this.state.filterCategory]
                }
            })
            {
                let produk = [];
                const newArrival = response.data.data
                const datas = newArrival.filter(data => data.condition === "Like New")
                datas.map((data) => {
                    produk.push(data)
                })
                this.setState({ product: produk })
            }
        } catch (error) {
            console.log('error :', error)
        }
    }

    handlePriceLowToHigh = async () => {
        try {
            const id = window.location.href.split('/')[4]
            const response = await axios.get(GetProduct, {
                params:
                {
                    brand_id: [id],
                    category_id: [this.state.filterCategory]
                }
            })
            {
                let produk = [];
                const datas = response.data.data
                const sortPrice = datas.sort((a, b) => a.sale_price - b.sale_price)
                sortPrice.map((data) => {
                    produk.push(data)
                })
                this.setState({ product: produk })
            }
        } catch (error) {
            console.log('error :', error)
        }
    }

    handleLowToHigh = async () => {
        try {
            const id = window.location.href.split('/')[4]
            const response = await axios.get(GetProduct, {
                params:
                {
                    brand_id: [id],
                    category_id: [this.state.filterCategory]
                }
            })
            {
                let produk = [];
                const datas = response.data.data
                const sortPrice = datas.sort((a, b) => b.sale_price - a.sale_price)
                sortPrice.map((data) => {
                    produk.push(data)
                })
                this.setState({ product: produk })
            }
        } catch (error) {
            console.log('error :', error)
        }
    }

    handleAtoZ = async () => {
        try {
            const id = window.location.href.split('/')[4]
            const response = await axios.get(GetProduct, {
                params:
                {
                    brand_id: [id],
                    category_id: [this.state.filterCategory]
                }
            })
            {
                let produk = [];
                const datas = response.data.data
                const sortPrice = datas.sort((a, b) => a.name.localeCompare(b.name))
                sortPrice.map((data) => {
                    produk.push(data)
                })
                this.setState({ product: produk })
            }
        } catch (error) {
            console.log('error :', error)
        }
    }

    handleZtoA = async () => {
        try {
            const id = window.location.href.split('/')[4]
            const response = await axios.get(GetProduct, {
                params:
                {
                    brand_id: [id],
                    category_id: [this.state.filterCategory]
                }
            })
            {
                let produk = [];
                const datas = response.data.data
                const sortPrice = datas.sort((a, b) => b.name.localeCompare(a.name))
                sortPrice.map((data) => {
                    produk.push(data)
                })
                this.setState({ product: produk })
            }
        } catch (error) {
            console.log('error :', error)
        }
    }

    render() {
        const product = this.state;
        const { loading, loaderColor, windowWidth } = this.state
        const products = product.product
        const banyakProduct = products.length
        console.log('data banner designer : ', this.state.headerBanner)
        return (
            <ScreenContainerComponent>
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
                            {/* <IndexNavbar
        brands={this.state.brands}
        categories={this.state.categories}
        windowWidth={windowWidth}
        /> */}
                            {windowWidth > 900 ? (
                                <NavbarComponent />) : (<IndexNavbar />)}
                            <br />
                            <br />
                            <br />
                            <div style={{ marginLeft: '115px' }}>
                                <BreadCrumb lists={this.state.breadcrumbs} />
                            </div>
                            <DesignersBanner
                                headerBanner={this.state.headerBanner}
                            />
                            {windowWidth > 900 ? (
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
                                />) : (<DesignerSearchMobile
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
                                />)}
                            <DesginersComponent
                                products={products}
                                windowWidth={windowWidth}
                            />
                            {windowWidth > 900 ? null : (
                                <DesignersProductMobile
                                    products={products}
                                />)}
                            <br />
                            {/* <Pagination
                 currentPage={this.state.page}
                 perPage={this.state.perPage}
                 total={banyakProduct|| 0}
                 onPageChange={this.handlePageChange}
              /> */}
                            {/* <PaginationComponent/> */}
                        </div>
                    </div>
                </div>
            </ScreenContainerComponent>
        )
    }
}
