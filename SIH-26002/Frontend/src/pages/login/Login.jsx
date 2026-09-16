import {
    useState
} from "react";

import {
    motion
} from "framer-motion";

import {
    useNavigate
} from "react-router-dom";

import {
    loginUser
} from "../../api/auth.api";

import "./login.scss";


const Login = () => {

    const navigate =
        useNavigate();


    const [
        email,
        setEmail
    ] = useState("");


    const [
        password,
        setPassword
    ] = useState("");


    const [
        showPassword,
        setShowPassword
    ] = useState(false);


    const [
        loading,
        setLoading
    ] = useState(false);


    const [
        error,
        setError
    ] = useState("");


    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            const result =
                await loginUser({
                    email: email.trim(),
                    password
                });


            if (!result?.success) {

                throw new Error(
                    result?.message ||
                    "Login failed"
                );

            }


            console.log(
                "Logged in user:",
                result.user
            );


            /*
                Backend has now set the
                authentication cookie.

                Dashboard will be built next.
            */

            navigate("/dashboard");

        } catch (error) {

            setError(
                error.message ||
                "Unable to login"
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <main className="login-page">

            <button
                className="login-back"
                type="button"
                onClick={() =>
                    navigate("/")
                }
            >
                ← Back
            </button>


            {/* LEFT SIDE */}

            <section className="login-visual">

                <div className="login-brand">
                    SETU.NER.<span>.</span>
                </div>


                <div className="login-visual-content">

                    <p>
                        INTELLIGENT
                        <br />
                        LOGISTICS NETWORK
                    </p>


                    <h1>
                        Keep the
                        <br />
                        network
                        <br />
                        moving.
                    </h1>


                    <span>
                        Predict. Adapt. Reroute.
                    </span>

                </div>


                <div className="login-visual-footer">

                    <span>
                        NORTH EAST REGION
                    </span>

                    <span>
                        SETU.NER. / 001
                    </span>

                </div>

            </section>


            {/* RIGHT SIDE */}

            <section className="login-panel">

                <motion.div
                    className="login-card"

                    initial={{
                        opacity: 0,
                        y: 25
                    }}

                    animate={{
                        opacity: 1,
                        y: 0
                    }}

                    transition={{
                        duration: 0.7,
                        ease: "easeOut"
                    }}
                >

                    <div className="login-heading">

                        <p>
                            PLATFORM ACCESS
                        </p>

                        <h2>
                            Welcome back.
                        </h2>

                        <span>
                            Sign in to continue
                            to the SETU.NER. network.
                        </span>

                    </div>


                    <form
                        className="login-form"
                        onSubmit={
                            handleSubmit
                        }
                    >

                        {/* EMAIL */}

                        <label>

                            <span>
                                Email
                            </span>

                            <input
                                type="email"
                                value={email}

                                onChange={(
                                    event
                                ) =>
                                    setEmail(
                                        event.target.value
                                    )
                                }

                                placeholder="you@example.com"

                                autoComplete="email"

                                disabled={
                                    loading
                                }

                                required
                            />

                        </label>


                        {/* PASSWORD */}

                        <label>

                            <span>
                                Password
                            </span>

                            <div className="password-field">

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }

                                    value={
                                        password
                                    }

                                    onChange={(
                                        event
                                    ) =>
                                        setPassword(
                                            event.target.value
                                        )
                                    }

                                    placeholder="••••••••"

                                    autoComplete="current-password"

                                    disabled={
                                        loading
                                    }

                                    required
                                />


                                <button
                                    type="button"

                                    disabled={
                                        loading
                                    }

                                    onClick={() =>
                                        setShowPassword(
                                            (
                                                current
                                            ) =>
                                                !current
                                        )
                                    }
                                >
                                    {
                                        showPassword
                                            ? "Hide"
                                            : "Show"
                                    }
                                </button>

                            </div>

                        </label>


                        {/* ERROR */}

                        {error && (

                            <div className="login-error">
                                {error}
                            </div>

                        )}


                        {/* OPTIONS */}

                        <div className="login-options">

                            <label className="remember">

                                <input
                                    type="checkbox"

                                    disabled={
                                        loading
                                    }
                                />

                                <span>
                                    Remember me
                                </span>

                            </label>


                            <button
                                type="button"
                                className="forgot"

                                disabled={
                                    loading
                                }
                            >
                                Forgot password?
                            </button>

                        </div>


                        {/* SUBMIT */}

                        <button
                            className="login-submit"

                            type="submit"

                            disabled={
                                loading
                            }
                        >

                            <span>
                                {
                                    loading
                                        ? "Signing in..."
                                        : "Sign In"
                                }
                            </span>


                            {!loading && (
                                <span>
                                    →
                                </span>
                            )}

                        </button>

                    </form>


                    <div className="login-divider">

                        <span>
                            SECURE ACCESS
                        </span>

                    </div>


                    <p className="login-note">
                        Authorized SETU.NER. operators,
                        administrators and drivers
                        can access the platform here.
                    </p>

                </motion.div>

            </section>

        </main>
    );
};


export default Login;