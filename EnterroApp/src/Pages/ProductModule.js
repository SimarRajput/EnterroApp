import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ProductTable from '../Components/ProductTable/ProductTable';

class ProductModule extends Component {
    render() {
        return (
        <div style={{'width': '85%', margin: '10px auto'}}>
            <br/>
            <ProductTable />
        </div>
        );
    }
}

export default ProductModule;