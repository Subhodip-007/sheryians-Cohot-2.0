import React from 'react'
import "../style/form.scss"
import {Link} from "react-router"

const Login = () => {
  return (
    <div>
      <main>
        <div className="form-cont">
          <h1>login</h1>
          <form action="">
            <input type="text" name="Username" placeholder="Enter your username" />
            <input type="password" name="Password" placeholder="Enter your password" />
            <button type="submit">login</button>
          </form>
          <p>Don't have a account ? <Link to={"/register"}>register</Link></p>
        </div>
      </main>
    </div>
  )
}

export default Login
