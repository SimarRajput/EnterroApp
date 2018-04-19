import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ProductItemTable from '../Components/ProductItem/ProductItemTable';

class ProductItemModule extends Component {
    render() {
        return (
        <div style={{'width': '95%', margin: '10px auto'}}>
            <br/>
            <ProductItemTable />
        </div>
        );
    }
}

export default ProductItemModule;