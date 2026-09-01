import { Link, useNavigate } from "react-router";
import "../styles/Register.scss";
import { useState } from "react";
import { useAuth } from "../hooks/UseAuth";
import { register } from "../services/auth.api";

const Register = () => {
  const{loading, handleRegister} = useAuth()
  const navigate = useNavigate()
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const handleSubmit = (e)=>{
    e.preventDefault()
    handleRegister(username,email,password)
    navigate("/")



  }

  return (
    <main className="register-page">

      <section className="register-card">

        {/* LEFT IMAGE */}
        <div className="register-visual">
          <div className="visual-overlay">
            <div className="visual-content">

              <h2>
                Design your future, one blueprint at a time.
              </h2>

              <p>
                Join a community of architects shaping tomorrow.
              </p>

              <span>
                Structura — Your gateway to architectural excellence.
              </span>

            </div>
          </div>
        </div>


        {/* RIGHT REGISTER FORM */}
        <div className="register-form-section">

          <div className="form-wrapper">

            <div className="form-heading">

              <h1>Create your account</h1>

              <p>
                Join a network of visionaries and unlock premium
                design resources tailored for you.
              </p>

            </div>


            <form onSubmit={handleSubmit}>

              {/* USERNAME */}
              <div className="input-group">

                <label htmlFor="username">
                  Username
                </label>

                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  autoComplete="username"
                  value={username}
                  onChange={(e)=>setusername(e.target.value)}

                />

              </div>


              {/* EMAIL */}
              <div className="input-group">

                <label htmlFor="email">
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="e.g. andrew@example.com"
                  autoComplete="email"
                   value={email}
                  onChange={(e)=>setemail(e.target.value)}
                />

              </div>


              {/* PASSWORD */}
              <div className="input-group">

                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="new-password"
                   value={password}
                  onChange={(e)=>setpassword(e.target.value)}
                />

              </div>


              <button
                className="register-button"
                type="submit"
              >
                Create account
              </button>

            </form>


            <p className="login-text">
              Already have an account?
              <Link to={"/login"}>Login here</Link>
              

            </p>


            <p className="terms">
              By creating an account, you agree to our Terms of
              Service and Privacy Policy.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Register;