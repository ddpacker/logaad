import React, { Component } from 'react';
import LoginModal from './landing/LoginModal';
import RegisterModal from './landing/RegisterModal';

class LandingView extends Component {
    render() {
        return(
            <div>
                LANDING VIEW
                <LoginModal/>
                <RegisterModal/>
            </div>
        )
    }
}

export default LandingView;