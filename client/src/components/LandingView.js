import React, { Component } from 'react';
import LoginModal from './landing/LoginModal';
import RegisterModal from './landing/RegisterModal';

class LandingView extends Component {
    render() {
        return(
            <div className="landing">
                <div className="row" style={{ height : "10vh" }}></div>
                <div className="row">
                    <div className="col-sm-1">
                    </div>
                    <div className="col-sm-10">
                        <div className="jumbotron">
                            <div className="row">
                                <div className="col-xl-4">
                                    <img src={require('../img/logo.svg')} style={{ width : "20vw"}}/>
                                </div>
                                <div className="col-xl-8">
                                    <div className="jumbotron">
                                        <h1> Welcome to Logaad </h1>
                                        <p>"Sed ut perspiciatis unde omnis iste natus error 
                                            sit voluptatem accusantium doloremque laudantium, 
                                            totam rem aperiam, eaque ipsa quae ab illo inventore
                                            veritatis et quasi architecto beatae vitae dicta
                                            sunt explicabo. Nemo enim ipsam voluptatem quia
                                            voluptas sit aspernatur aut odit aut fugit, sed
                                            quia consequuntur magni dolores eos qui ratione 
                                            voluptatem sequi nesciunt. Neque porro quisquam 
                                            est, qui dolorem ipsum quia dolor sit amet, consectetur, 
                                            adipisci velit, sed quia non numquam eius modi 
                                            tempora incidunt ut labore et dolore magnam aliquam 
                                            quaerat voluptatem. Ut enim ad minima veniam, quis 
                                            nostrum exercitationem ullam corporis suscipit laboriosam, 
                                            nisi ut aliquid ex ea commodi consequatur? Quis autem vel 
                                            eum iure reprehenderit qui in ea voluptate velit 
                                            esse quam nihil molestiae consequatur, vel illum 
                                            qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-1">
                    </div>
                </div>
                <LoginModal/>
                <RegisterModal/>
            </div>
        )
    }
}

export default LandingView;