import BagCurrentOrder from './../../../../../images/temp/5c855532d5cc981711da2cd9d3b2c062.png'
import './current-order-tab-content.scoped.scss'

export default function CurrentOrderTabContentComponent() {
    return (
        <div className="current-order-content">
            <div className="search-wrap">
                <input type="text" name="search" id="search" placeholder="Search" />
            </div>
            <div className='body-current-order-content'>
                <div className='inner'>
                    <div className="item">
                        <div className='left'>
                            <img src={BagCurrentOrder} alt="" />
                            <div className='product-detail'>
                                <h4 className='product-name'>Satin mini-bag with crystals</h4>
                                <table>
                                    <tr>
                                        <td>Qty</td>
                                        <td>:</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <td>Note</td>
                                        <td>:</td>
                                        <td>-</td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <div className='right'>
                            <div className='top'>
                                <span className='product-detail'>Product Detail</span>
                                <span className='track-order'>Track Order</span>
                            </div>
                            <h4 className='price'>Rp. 15.000.000</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}