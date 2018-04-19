import React, { Component } from 'react';
import axios from 'axios';
import globals from '../../Globals.js';

class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fillInfoDiv = this.fillInfoDiv.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.infoDiv = "";
        this.productTypeVal = -1;
        this.productIdVal = -1;
        this.cameraTypeVal = -1;

        this.state = {
            isLoaded: false,
            productTypes: [],
            cameraTypes: [],
            products: [],
            error: null
        };
    }

    componentDidMount() {
        axios.get(globals.apiUrl + '/productType')
            .then((res) => {
                this.setState({
                    isLoaded: true,
                    productTypes: res.data.data
                });
                this.getCameraType();
            })
            .catch((error) => {
                this.setState({
                    error: error,
                    isLoaded: true
                });
            });
    }

    getProducts(){
        axios.get(globals.apiUrl + '/product')
        .then((res) => {
            this.setState({
                isLoaded: true,
                products: res.data.data
            });
        })
        .catch((error) => {
            this.setState({
                error: error,
                isLoaded: true
            });
        });
    }

    getCameraType() {
        axios.get(globals.apiUrl + '/cameraType')
            .then((res) => {
                this.setState({
                    isLoaded: true,
                    cameraTypes: res.data.data
                });
                this.getProducts();
            })
            .catch((error) => {
                this.setState({
                    error: error,
                    isLoaded: true
                });
            });
    }

    handleChange(e) {
        if(e.target = "selectProductType"){
            this.productTypeVal = e.target.value
        }else if(e.target = "selectProductName"){
            this.productIdVal = e.target.value
        } else if(e.target = "selectCameraType"){
            this.cameraTypeVal = e.target.value
        }
    }

    handleSubmit() {
        const product = {
            productID: this.productID.value,
            productType: this.productTypeVal,
            updatedBy: "Admin",
            addedBy: 'Admin',
            updateTimestamp: new Date(),
            productDateAdded: new Date()
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
        const { error, isLoaded, productTypes, cameraTypes, products } = this.state;
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

                const cameraTypesRows = cameraTypes.map(function (row) {
                    return <option value={row.CAMERA_TYPE_ID}>{row.CAMERA_TYPE}</option>
                });

                const productRows = products.map(function (row) {
                    return <option value={row.PRODUCT_ID}>{row.PRODUCT_NAME}</option>
                });

                return (
                    <div className="formMargin">
                        <br />
                        <h3>Add Product Item</h3>
                        <br />
                        <form>
                        <div className="form-group row">
                                <label htmlFor="selectProductName" className="col-sm-2 col-form-label">Product Name</label>
                                <div className="col-sm-3">
                                    <select className="form-control " onChange={this.handleChange} id="selectProductName">
                                        {productRows}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="productItemTitleText" className="col-sm-2 col-form-label">Product Item Title</label>
                                <div className="col-sm-3">
                                    <input id="productItemTitleText" ref={(productItemTitle) => this.productItemTitle = productItemTitle} type="text" className="form-control" placeholder="Product Item Title" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="productItemDescText" className="col-sm-2 col-form-label">Product Item Desc</label>
                                <div className="col-sm-3">
                                    <input id="productItemDescText" ref={(productItemDesc) => this.productItemDesc = productItemDesc} type="text" className="form-control" placeholder="Product Item Desc" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="selectProductType" className="col-sm-2 col-form-label">Product Type</label>
                                <div className="col-sm-3">
                                    <select className="form-control " onChange={this.handleChange} id="selectProductType">
                                        {productTypeRows}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="selectCameraType" className="col-sm-2 col-form-label">Camera Type</label>
                                <div className="col-sm-3">
                                    <select className="form-control " onChange={this.handleChange} id="selectCameraType">
                                        {cameraTypesRows}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="quantityOnHandText" className="col-sm-2 col-form-label">Quantity On Hand</label>
                                <div className="col-sm-3">
                                    <input id="quantityOnHandText" ref={(quantityOnHand) => this.quantityOnHand = quantityOnHand} type="text" className="form-control" placeholder="Quantity On Hand" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="priceText" className="col-sm-2 col-form-label">Price</label>
                                <div className="col-sm-3">
                                    <input id="priceText" ref={(price) => this.price = price} type="text" className="form-control" placeholder="Price" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="discountText" className="col-sm-2 col-form-label">Discount</label>
                                <div className="col-sm-3">
                                    <input id="discountText" ref={(discount) => this.discount = discount} type="text" className="form-control" placeholder="Discount" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <button type="button" onClick={this.handleSubmit} className="btn btn-danger">Add Product Item</button>
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
