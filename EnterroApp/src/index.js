import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import About from './Pages/About.js';
import Contact from './Pages/Contact.js';
import Services from './Pages/Services.js';
import Products from './Pages/Products.js';
import ProductModule from './Pages/ProductModule.js';
import ProductItemModule from './Pages/ProductItemModule.js';
import Navigation from './Components/Navigation/Navigation';
import Footer from './Components/Footer/Footer';

import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
    <Router>
        <div>
            <Navigation />
                <div className="componentTop"></div>
                <Route exact path="/" component={Products} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <Route path="/services" component={Services} />
                <Route path="/productModule" component={ProductModule} />
                <Route path="/productItemModule" component={ProductItemModule} />
            <Footer />
        </div>
    </Router>, 
document.getElementById('pageDiv'));
