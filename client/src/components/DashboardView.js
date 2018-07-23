import React, { Component } from 'react';
import LoginModal from './landing/LoginModal';
import EventBus from '../services/EventBus';

class DashboardView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token : ""
        };
    }
    componentWillMount() {
        this.setState({token : this.props.token})
    }
    render() {

        return(
            <div>
                {this.state.token}
                DASHBOARD VIEW
            </div>
        )
    }
}

export default DashboardView;