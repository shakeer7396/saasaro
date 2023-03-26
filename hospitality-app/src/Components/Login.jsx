import React from "react"
import { useState } from "react"


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = () => {
        const payload = {
            email,
            password
        }
       
        fetch("https://victorious-tan-bikini.cyclic.app/form-data", {
            method : "POST",
            body : JSON.stringify(payload),
            headers : {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            localStorage.setItem("token",res.token)
        })
        .catch((err) => console.log(err))
    }
    return(
        <div>
            <h1><u>Signup</u></h1>
            <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <br></br>
            <br></br>
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
           <br />
           <br />
            <button className="button" onClick={handleSubmit}>Submit</button>
        </div>
    )
}



export default Login