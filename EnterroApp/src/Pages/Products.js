import React, { Component } from 'react';
import axios from 'axios';
import globals from '../Globals.js';

class Products extends Component {
    constructor(props) {
        super(props);
        this.callProductTypeApi = this.callProductTypeApi.bind(this);
        this.callProductsApi = this.callProductsApi.bind(this);
        this.products = "";
        this.productTypes = "";
        this.cameraTypes = "";
        this.state = {
            error: null,
            isLoaded: false,
            products: [],
            productTypes: [],
            cameraTypes: []
        };
    }

    componentDidMount() {
        this.callProductTypeApi();
    }

    callProductTypeApi() {
        var self = this;
        axios.get(globals.apiUrl + '/productType')
            .then((res) => {
                self.productTypes = res.data.data
                self.callCameraTypeApi();
            })
            .catch((error) => {
                self.state = {
                    error: error,
                    isLoaded: true
                };
            });
    }

    callCameraTypeApi() {
        var self = this;
        axios.get(globals.apiUrl + '/cameraType')
            .then((res) => {
                self.cameraTypes = res.data.data
                self.callProductsApi();
            })
            .catch((error) => {
                self.state = {
                    error: error,
                    isLoaded: true
                };
            });
    }

    callProductsApi(productTypeId, cameraTypeId) {
        var self = this;
        var url = globals.apiUrl + "/productItem";

        if(productTypeId && cameraTypeId){
            url += '?cameraTypeId=' + cameraTypeId + '&productTypeId=' + productTypeId;
        }

        axios.get(url)
            .then((res) => {
                self.product = res.data.data;
                self.setState({
                    isLoaded: true,
                    products: res.data.data,
                    productTypes: self.productTypes,
                    cameraTypes: self.cameraTypes
                });
            })
            .catch((error) => {
                self.state = {
                    error: error,
                    isLoaded: true
                };
            });
    }

    render() {
        const { error, isLoaded, products, productTypes, cameraTypes } = this.state;
        var self = this;
        if (!isLoaded) {
            return <div className="loading"></div>;
        }
        else {
            if (error != null) {
                return <div className="error">Product table failed to load - {error.message}</div>;
            }
            else {
                const productTypeRows = productTypes.map(function (row, i) {
                    return <div className="btn-group dropright">
                        <button type="button" className="dropdown-toggle list-group-item list-group-item-action" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {row.PRODUCT_TYPE}
                        </button>
                        <div className="dropdown-menu">{
                            cameraTypes.map(function (rowInner, j) {
                                return <button className="dropdown-item" value={rowInner.CAMERA_TYPE_DESC} onClick={self.callProductsApi.bind(self, row.PRODUCT_TYPE_ID, rowInner.CAMERA_TYPE_ID)} href="#sec">{rowInner.CAMERA_TYPE_DESC}</button>
                            })}
                        </div>
                    </div>
                });

                const productRows = products.map(function (row) {
                    return <div className="col-lg-3 col-md-5 mb-3">
                        <div className="card h-100">
                            <a href="#">
                                <img className="card-img-top" src="http://placehold.it/700x400" alt="" />
                            </a>
                            <div className="card-body">
                                <h5 className="card-title">
                                    <a href="#">{row.PRODUCT_ITEM_TITLE}</a>
                                </h5>
                                <h6>${row.PRICE}</h6>
                                <p className="card-text">{row.PRODUCT_ITEM_DESC}</p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                            </div>
                        </div>
                    </div>
                });
                return (
                    <div className="container-fluid">
                        <div className="row">
                            <div id="menuBar" className="col-md-2" >
                                <div className="list-group" id="myList" role="tablist">
                                    {productTypeRows}
                                </div>
                            </div>
                            <div className="col-lg-10">
                                <div id="carouselExampleIndicators" className="carousel slide my-4" data-ride="carousel">
                                    <ol className="carousel-indicators">
                                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                    </ol>
                                    <div className="carousel-inner" role="listbox">
                                        <div className="carousel-item active">
                                            <img className="d-block img-fluid" src="http://placehold.it/1200x350" alt="First slide" />
                                        </div>
                                        <div className="carousel-item">
                                            <img className="d-block img-fluid" src="http://placehold.it/1200x350" alt="Second slide" />
                                        </div>
                                        <div className="carousel-item">
                                            <img className="d-block img-fluid" src="http://placehold.it/1200x350" alt="Third slide" />
                                        </div>
                                    </div>
                                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </div>

                                <div className="row">
                                    {productRows}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }
}

export default Products;