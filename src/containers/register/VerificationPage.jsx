import React, { Component } from 'react'
import NavbarComponent from '../../components/general/navbar/NavbarComponent'
import ScreenContainerComponent from '../../components/general/screen-container/ScreenContainerComponent'
import FooterComponent from '../../components/footer/FooterComponent'
import VerificationComponent from '../../components/register/VerificationComponent'
import './verification-index.scoped.scss'
import VerificationLabelsComponent from '../../components/register/VerificationLabelsComponent'
import VerificationTimer from '../../components/register/VerificationTimer'

export default class VerificationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
        }
    }

    componentDidMount() {
        const email = window.location.href.split('/')[4]
        this.setState({ email: email })
    }

    render() {
        const email = this.state;
        return (
            <div>
                <NavbarComponent />
                <ScreenContainerComponent>
                    <div className='VerificationComponent'>
                        <div>
                            <VerificationLabelsComponent
                                email={this.state.email}
                            />
                        </div>
                        <div className='VerificationInput'>
                            <VerificationComponent
                                email={this.state.email}
                            />
                        </div>
                        <div>
                            <VerificationTimer />
                        </div>
                    </div>
                    <FooterComponent />
                </ScreenContainerComponent>
            </div>
        )
    }
}
