import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import "../styles/Login.scss";
import { useAuth } from "../hooks/UseAuth";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate()
  const { user, loading, handleLogin } = useAuth();
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  async function handleSubmit(e) {
    e.preventDefault()
    await handleLogin({username,password})
    navigate("/")
    
  }
  return (
    <main className="login-page">
      <section className="login-card">

        {/* LEFT IMAGE SECTION */}
        <div className="login-visual">
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

        {/* RIGHT LOGIN SECTION */}
        <div className="login-form-section">

          <div className="form-wrapper">

            <div className="form-heading">
              <h1>Welcome back</h1>

              <p>
                Sign in to continue your journey.
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

              {/* PASSWORD */}
              <div className="input-group">
                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e)=>setpassword(e.target.value)}
                />
              </div>

              <div className="forgot-password">
                <button type="button">
                  Forgot password?
                </button>
              </div>

              <button
                className="login-button"
                type="submit"
              >
                Sign in
              </button>

            </form>

            <p className="signup-text">
              Don't have an account?{" "}
              <Link to={"/register"}>sign up here</Link>
              
            </p>

            <p className="terms">
              By continuing, you agree to our Terms of Service
              and Privacy Policy.
            </p>

          </div>

        </div>

      </section>
    </main>
  );
};

export default Login;