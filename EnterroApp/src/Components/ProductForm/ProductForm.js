import React, { Component } from 'react';
import axios from 'axios';

class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fillInfoDiv = this.fillInfoDiv.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.infoDiv = "";
        this.productTypeVal = 1;

        this.state = {
            isLoaded: false,
            productTypes: [],
            error: null
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3000/api/enterro/productType')
            .then((res) => {
                this.setState({
                    isLoaded: true,
                    productTypes: res.data.data
                });
            })
            .catch((error) => {
                this.setState({
                    error: error,
                    isLoaded: true
                });
            });
    }

    handleChange(e) {
        this.productTypeVal = e.target.value
    }

    handleSubmit() {
        const product = {
            productName: this.productName.value,
            productType: this.productTypeVal,
            updatedBy: "Admin",
            addedBy: 'Admin',
            updateTimestamp: new Date(),
            productDateAdded: new Date()
        };

        axios.post('http://localhost:3000/api/enterro/product', product)
            .then((res) => {
                this.fillInfoDiv(res.data.message);
                this.setState({
                    status: res.statusText
                });
                this.clearForm();
                this.props.refresh();
            })
            .catch((error) => {
                this.setState({
                    error: error
                });
            });
    }

    clearForm(){
        document.getElementById('productNameText').value = '';
        document.getElementById('selectProductType').value = 'default';
    }

    fillInfoDiv(message) {
        this.infoDiv = <div className="form-group row">
            <div className="col-md-5">
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    {message}
                </div>
            </div>
        </div>
    }

    render() {
        const { error, isLoaded, productTypes } = this.state;
        if (!isLoaded) {
            return <div className="loading"></div>;
        }
        else {
            if (error != null) {
                return <div className="error">Product table failed to load - {error.message}</div>;
            }
            else {
                const productTypeRows = productTypes.map(function (row) {
                    return <option value={row.PRODUCT_TYPE_ID}>{row.PRODUCT_TYPE}</option>
                });

                return (
                    <div className="formMargin">
                        <br />
                        <h3>Add Product</h3>
                        <br />
                        <form>
                            <div className="form-group row">
                                <label htmlFor="productNameText" className="col-sm-2 col-form-label">Product Name</label>
                                <div className="col-sm-3">
                                    <input id="productNameText" ref={(productName) => this.productName = productName} type="text" className="form-control" placeholder="Product Name" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="selectProductType" className="col-sm-2 col-form-label">Product Type</label>
                                <div className="col-sm-3">
                                    <select className="form-control " onChange={this.handleChange} id="selectProductType">
                                        <option value="default">default</option>
                                        {productTypeRows}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <button type="button" onClick={this.handleSubmit} className="btn btn-danger">Add Product</button>
                                </div>
                            </div>
                        </form>
                        {this.infoDiv}
                    </div>
                );
            }
        }
    }
}

export default ProductForm;
