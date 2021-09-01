import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {isEmptyObject} from '../util/helpers';
import { withRouter } from "react-router"

class RegisterUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            },
            errors: {
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            },
            response: ""
        }
    }

    handleInputChange = (event) => {
        let fieldName = event.target.name
        let fieldValue = event.target.value

        console.log(fieldName)
        console.log(fieldValue)

        this.setState({
            formData: {
                ...this.state.formData,
                [fieldName]: fieldValue
            }
        })
    }


    handleFormSubmit = (event) => {
        event.preventDefault()
        let errors = this.validateForm()

        console.log(errors)

        if (isEmptyObject(errors)) {
            fetch("http://localhost:8080/api/v1/auth/register", {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.state.formData),
                method: "POST"
            }).then(response => {
                console.log(response)
                if (!response.ok) {
                    if (response.status === 409) {
                        throw "Username already exist"
                    } else if (response.status === 400) {
                        throw "invalid form data"
                    } else {
                        throw "internal server error, please try again later"
                    }
                } else {
                    return response.json()
                }
            }).then(response => {
                alert("User created")
                //this.props.history.push("/list")
                window.location.replace("http://localhost:3000/")
            }).catch(error => {
                this.setState({
                    response: error
                })
            })
        }
        else {
            this.setState({
                errors: errors
            })
        }
    }

    validateForm = () => {
        let errors = {}
        if (this.state.formData.username.trim() === "") {
            errors.username = "Username is required"
        }

        if (this.state.formData.email.trim() === "") {
            errors.email = "Email is required"
        }

        if (this.state.formData.password.trim() === "") {
            errors.password = "Password is required"
        }

        if (this.state.formData.confirmPassword.trim() === "") {
            errors.confirmPassword = "ConfirmPassword is required"
        }

        if (this.state.formData.password.trim() !== ""
            && this.state.formData.confirmPassword.trim() !== ""
            && this.state.formData.password.trim() !== this.state.formData.confirmPassword.trim()) {
            errors.password = "password and confirm password not match"
            errors.confirmPassword = "password and confirm password not match"
        }
        return errors
    }

    render() {
        return (
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
                            type={"email"} name={"email"}
                            value={this.state.formData.email}
                            onChange={this.handleInputChange}
                        />
                        <div className={"text-danger"}>{this.state.errors.email}</div>
                    </div>

                    <div className={"mb-3"}>
                        <label className="form-label">Password</label>
                        <input
                            className="form-control"
                            type={"password"} name={"password"}
                            value={this.state.formData.password}
                            onChange={this.handleInputChange}
                        />
                        <div className={"text-danger"}>{this.state.errors.password}</div>
                    </div>

                    <div className={"mb-3"}>
                        <label className="form-label">Confirm Password</label>
                        <input
                            className="form-control"
                            type={"password"} name={"confirmPassword"}
                            value={this.state.formData.confirmPassword}
                            onChange={this.handleInputChange}
                        />
                        <div className={"text-danger"}>{this.state.errors.confirmPassword}</div>
                    </div>

                    <button type="submit" className="btn btn=primary">Submit</button>
                </form>
            </div>
        )
    }
}


export default withRouter(RegisterUser);