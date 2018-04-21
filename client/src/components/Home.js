import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div>
                <p>Home page</p>
                <Link to="/movies"> All Movies </Link>
            </div>
        )
    }
}

export default Home;