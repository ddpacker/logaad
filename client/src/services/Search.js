import React, { Component } from 'react';

class Search extends Component {
    render() {
        return(
            <form className="form-inline ml-auto">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        )
    }
}

export default Search;