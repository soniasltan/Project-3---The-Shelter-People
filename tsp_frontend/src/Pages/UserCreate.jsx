import React, {useState} from "react"
import axios from "axios"

const addUser = async (user) => {
    await axios.post(`http://localhost:3000/api/users`, user)
}

function UserCreate() {
    const [user, setUser] = useState({})

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
        addUser(user)
    }

    return (
        <>
        <h1>Create New User</h1>
        <form onSubmit={handleSubmit}>
            <label>Email: 
                <input name="email" value={user.email} onChange={handleEmailChange}></input>
            </label>
            <label>Username: 
                <input name="username" value={user.username} onChange={handleUsernameChange}></input>
            </label>
            <label>Password (min. 6 chars): 
                <input name="password" value={user.password} onChange={handlePasswordChange}></input>
            </label>
            <button>Create User</button>
        </form>
        </>
    )
}

export default UserCreate