import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmptyObject } from '../util/helper';

class RegisterUser extends Component{
    constructor(props) {
        super(props);
        this.state={
            formData:{
                username:"",
                email:"",
                password:"",
                confirmPassword:""
            },
            errors:{
                username:"",
                email:"",
                password:"",
                confirmPassword:""
            },
            response:""
        }
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <h2>Register</h2>
                    {this.state.response && <div className={"alert alert-danger"}>{this.state.response}</div>}
                    <div className={"mb-3"}>
                        <label className="form-label">Username</label>
                        <input
                        className="form-control"
                        type={"text"} name={"username"}
                        value={this.state.formData.username}
                        onChange={this.handleInputChange}
                        />
                        <div className={"text-danger"}>{this.state.errors.username}</div>
                    </div>

                    <div className={"mb-3"}>
                        <label className="form-label">Email</label>
                        <input
                            className="form-control"
                            type={"text"} name={"email"}
                            value={this.state.formData.email}
                            onChange={this.handleInputChange}
                        />
                        <div className={"text-danger"}>{this.state.errors.email}</div>
                    </div>

                    <div className={"mb-3"}>
                        <label className="form-label">Password</label>
                        <input
                            className="form-control"
                            type={"text"} name={"password"}
                            value={this.state.formData.password}
                            onChange={this.handleInputChange}
                        />
                        <div className={"text-danger"}>{this.state.errors.password}</div>
                    </div>

                    <div className={"mb-3"}>
                        <label className="form-label">Confirm Password</label>
                        <input
                            className="form-control"
                            type={"text"} name={"confirmPassword"}
                            value={this.state.formData.confirmPassword}
                            onChange={this.handleInputChange}
                        />
                        <div className={"text-danger"}>{this.state.errors.confirmPassword}</div>
                    </div>
                </form>
            </div>
        )
    }
}

export default RegisterUser;