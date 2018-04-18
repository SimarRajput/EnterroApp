import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navigation extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top backColor">
                <div className="container">
                    <Link className="navbar-brand" to="/" href="#">Enterro India</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" href="#">Home
                                <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="about" className="nav-link" href="#">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="services" className="nav-link" href="#">Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="contact" className="nav-link" href="#">Contact</Link>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navigation;
