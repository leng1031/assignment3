import React, { Component } from 'react';
import {Link , withRouter} from "react-router-dom";
import UpdateUser from "./UpdateUser"

class ListUser extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            id:""
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/v1/Users",{
            method:"GET"
        }).then(response => response.json()).then(response =>{
            console.log(response.result)
            this.setState({
                data: response.result,
                id: response.result.id
            })
        })
    }

    handleDelete(id) {
        // eslint-disable-next-line
        console.log(id)
        if(window.confirm("Delete?"))
        {
            fetch(`http://localhost:8080/api/v1/Users/${id}`,{
                method : 'DELETE'
            }).then(response => response.json()
            ).then(response =>{
                console.log(response)
                if (response.result)
                {
                    alert("deleted")
                    window.location.replace("http://localhost:3000/")
                    //console.log(window.location )
                    //this.props.history.push("/list")
                    //(window.location+"list").load()
                }
            })
        }
    }

    render() {
        return(
            <div>
                <table className={"table"}>
                    <thead>
                        <td>id</td>
                        <td>User Name</td>
                        <td>Email</td>
                        <td>Password</td>
                        <td>Status</td>
                        <td>Action</td>
                    </thead>
                    {this.state.data.map(item =>{
                        return(<tbody>
                            <tr key={item.id}>
                            <td><Link to ={`/update/${item.id}`}>{item.id}</Link></td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.password}</td>
                            <td>{item.status}</td>
                            <td><a href={"http://localhost:3000/"} onClick={() => this.handleDelete(item.id)}>Delete</a></td>
                            {/*<td>{item.created_at.toLocaleTimeString()}</td>*/}
                            {/*<td>{item.modified_at}</td>*/}
                        </tr></tbody>)
                    })}
                </table>
            </div>
        )
    }
}
export default withRouter(ListUser);