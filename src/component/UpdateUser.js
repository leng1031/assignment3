import React, { Component } from 'react';
import {withRouter} from "react-router-dom";


class UpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                username: "",
                password: "",
                email: ""
            }
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8080/api/v1/Users/${this.props.match.params.id}`,{
            method: "GET"
        }).then(response => response.json()).then(response =>{
            this.setState({
                formData:response.result
            })
        })
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
        fetch(`http://localhost:8080/api/v1/Users/${this.props.match.params.id}`, {
            method : "PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(this.state.formData)
        }).then(response => response.json()).then(response =>{
            console.log(response)
            alert("Updated")
            this.props.history.push("/list")
        })
    }

    render() {
        return (
            <div>
                <div className="update_one">
                    <h1 align="center">Update User</h1><br/>
                    <form className="User_Form" onSubmit={this.handleFormSubmit}>
                        <label><b>User Name</b></label>
                        <input type={"text"} name="username" value={this.state.formData.username} onChange={this.handleInputChange}required/>
                        <label><b>Email</b></label>
                        <input type={"email"} name="email" value={this.state.formData.email} onChange={this.handleInputChange}required/>
                        <label><b>Password</b></label>
                        <input type={"text"} name="password" value={this.state.formData.password} onChange={this.handleInputChange}required/>
                        <button type="submit" name="btnSubmit">Update</button>

                    </form>
                </div>
            </div>
        )
    }
}
export default withRouter(UpdateUser)