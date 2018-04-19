import React, { Component } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm.js'
import globals from '../../Globals.js';

class ProductTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      products: []
    };
  }

  componentDidMount() {
    axios.get(globals.apiUrl + '/product')
      .then((res) => {
        this.setState({ 
          isLoaded: true,
          products: res.data.data
        });
      })
      .catch((error) => {
        this.setState({ 
          isLoaded: true,
          products: [],
          error: error 
        });
      });
  }

  render() {
    const { error, isLoaded, products } = this.state;
    if(!isLoaded)
    {
      return <div className="loading"></div>;
    }
    else
    {
      if(error)
      {
        return <div className="error">Product table failed to load - {error.message}</div>;
      }
      else
      {
        const rows = products.map(function(row){
        return <tr>
            <td key={row.PRODUCT_ID}>{row.PRODUCT_ID}</td>
            <td key={row.PRODUCT_NAME}>{row.PRODUCT_NAME}</td>
            <td key={row.PRODUCT_DESC}>{row.PRODUCT_DESC}</td>
            <td key={row.DATE_ADDED}>{row.DATE_ADDED}</td>
            <td key={row.ADDED_BY}>{row.ADDED_BY}</td>
            <td key={row.UPDATE_TIMESTAMP}>{row.UPDATE_TIMESTAMP}</td>
            <td key={row.UPDATED_BY + "sd"}>{row.UPDATED_BY}</td>
          </tr>
        });
        return (
          <div>
            <div className="heading">
              <h4>Product Management Module</h4>
            </div>
            <br/>
            <br/>
            <table className="table table-hover table-sm">
              <thead>
                <tr className="siteColor">
                  <th scope="col">Product ID</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Product Description</th>
                  <th scope="col">Date Added</th>
                  <th scope="col">Added By</th>
                  <th scope="col">Update Timestamp</th>
                  <th scope="col">Updated By</th>
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </table>
            <ProductForm refresh={this.componentDidMount.bind(this)}/>
          </div>
        );
      }
    }
  }
}

export default ProductTable;
