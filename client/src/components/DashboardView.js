import React, { Component } from 'react';

class DashboardView extends Component {
    constructor(props) {
        super(props);
        this.setState({props});
    }
    render() {

        return(
            <div>
                DASHBOARD VIEW
                {this.state}
            </div>
        )
    }
}

export default DashboardView;