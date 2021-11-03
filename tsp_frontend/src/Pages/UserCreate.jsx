import React, {useState} from "react"
import {useHistory} from "react-router-dom"
import axios from "axios"

const addUser = async (user) => {
    console.log("user", user)
    await axios.post(`/api/users`, user)
}

function UserCreate() {
    const [user, setUser] = useState({})
    const history = useHistory()

    const handleEmailChange = (event) => {
        const value = event.target.value
        setUser({...user, email: value})
    }

    const handleUsernameChange = (event) => {
        const value = event.target.value
        setUser({...user, username: value})
    }

    const handlePasswordChange = (event) => {
        const value = event.target.value
        setUser({...user, password: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (user.password.length < 6) {
            alert("Password must be at least 6 characters long!")
        } else {
        addUser(user)
        alert(`New user ${user.username} created successfully!`)
        history.push("/login")
        }
    }

    return (
        <>
        <h1>Create New User</h1>
        <form onSubmit={handleSubmit}>
            <label>Email: 
                <input type="email" name="email" value={user.email} onChange={handleEmailChange}></input>
            </label>
            <label>Username: 
                <input type="text" name="username" value={user.username} onChange={handleUsernameChange}></input>
            </label>
            <label>Password (min. 6 chars): 
                <input type="password" name="password" value={user.password} onChange={handlePasswordChange}></input>
            </label>
            <button>Create User</button>
        </form>
        </>
    )
}

export default UserCreate