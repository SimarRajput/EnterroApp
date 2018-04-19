import React, { Component } from 'react';
import axios from 'axios';
import globals from '../../Globals.js';

class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fillInfoDiv = this.fillInfoDiv.bind(this);
        this.infoDiv = "";
        this.productTypeVal = 1;

        this.state = {
            error: null
        };
    }

    handleSubmit() {
        const product = {
            productName: this.productName.value,
            productDesc: this.productDesc.value,
            updatedBy: "admin",
            addedBy: 'admin',
            updateTimestamp: new Date(),
            dateAdded: new Date()
        };

        axios.post(globals.apiUrl + '/product', product)
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

    clearForm() {
        document.getElementById('productNameText').value = '';
        document.getElementById('productDescText').value = '';
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
        const { error } = this.state;

        if (error != null) {
            return <div className="error">Product table failed to load - {error.message}</div>;
        }
        else {
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
                            <label htmlFor="productDescText" className="col-sm-2 col-form-label">Product Type</label>
                            <div className="col-sm-3">
                                <input id="productDescText" ref={(productDesc) => this.productDesc = productDesc} type="text" className="form-control" placeholder="Product Description" />
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

export default ProductForm;
