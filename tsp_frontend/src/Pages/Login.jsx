import React, {useState} from "react"
import axios from "axios"

function Login() {
    const [login, setLogin] = useState({})

    const handleUsernameChange = (event) => {
        const value = event.target.value
        setLogin({...login, username: value})
    }

    const handlePasswordChange = (event) => {
        const value = event.target.value
        setLogin({...login, password: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log("login", login)
        await axios.get(`http://localhost:3000/api/login`, login)
    }

    return (
        <>
        <h1>Login</h1>
        <form>
            <label>Username: 
            <input name="username" value={login.username} onChange={handleUsernameChange}></input>
            </label>
            <label>Password: 
                <input name="password" value={login.password} onChange={handlePasswordChange} minlength="6"></input>
            </label>
            <input type="submit" onClick={handleSubmit} value="Submit" />
        </form>
        </>
    )
}

export default Login