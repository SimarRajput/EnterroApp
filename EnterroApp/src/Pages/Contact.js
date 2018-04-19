import React, { Component } from 'react';
import axios from 'axios';
import globals from '../Globals.js'

class Contact extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fillInfoDiv = this.fillInfoDiv.bind(this);
        this.infoDiv = "";
        this.state = {
            status: "",
            error: null
        }
    }

    fillInfoDiv(message){
        this.infoDiv = <div className="form-group row">
            <div className="col-md-9">
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    {message}
                </div>
            </div>
        </div>
    }
    
    handleSubmit(event) {
        const contactUs = {
            productName: this.productName.value,
            contactEmail: this.contactEmail.value,
            helpText: this.helpText.value
        };

        axios.post(globals.apiUrl + '/ContactUs', contactUs)
            .then((res) => {
                this.fillInfoDiv(res.data.message);
                this.setState({
                    status: res.statusText
                });
                
            })
            .catch((error) => {
                this.setState({
                    status: "FAIL",
                    error: error
                });
            });
        event.preventDefault();
    }
    render() {
        const { error, status } = this.state;
        const mainDivStyle = {
            margin: "100px auto",
            width: "85%"
        }
        if (error != null) {
            return <div className="error">Product table failed to load - {error.message}</div>;
        }
        else {
            return (
                <div className="container" style={mainDivStyle}>
                    <div style={{ 'width': '100%', 'margin': '0px auto' }}>
                        <h3>
                            Customer Support
                        </h3>
                        <p>
                            Thank you for using Enterro India, Please complete the form below, so we can provide quick and efficient service. If this is an urgent matter please contact Customer Support:
                        </p>
                        <strong>
                            India: +91 9888555288 <br />
                            Monday: Saturday 9:00 AM - 5:00 PM
                        </strong>
                    </div>
                    <br />
                    <br />
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-row" >
                            <div className="form-group col-md-4">
                                <label htmlFor="productNameText">Product Name</label>
                                <input type="input" className="form-control" ref={(productName) => this.productName = productName} id="productNameText" placeholder="Product Name" />
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="emailText">Email</label>
                                <input type="email" className="form-control" ref={(contactEmail) => this.contactEmail = contactEmail} id="emailText" placeholder="Email" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="helpText">How May I Help You</label>
                            <textarea rows="3" type="text" className="form-control col-md-9" ref={(helpText) => this.helpText = helpText} id="helpText" placeholder="How May I Help You" />
                        </div>
                        <button type="submit" className="btn btn-danger">Submit</button>
                    </form>
                    <br/>
                    {this.infoDiv}
                </div>
            );
        }
    }
}

export default Contact;