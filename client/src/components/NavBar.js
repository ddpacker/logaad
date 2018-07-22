import React, { Component } from 'react';

class NavBar extends Component {
    render() {
        return(
            <nav class="navbar navbar-expand-md navbar-dark bg-dark">
                <div class="mx-auto order-0">
                    <a class="navbar-brand mx-auto" href="#">Change this to logo</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Register</a>
                        </li>
                    </ul>
                </div>
            </nav>

        )
    }
}

export default NavBar;