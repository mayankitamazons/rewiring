import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from '../../Assets/Images/logo.png'
import API_URL from "../../Environment/ApiRoutes.js/ApiRoutes";
import toaster from "../../Helpers/Toastify";
import { ToastContainer} from 'react-toastify';

export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [ShowHide, setType] = useState(true);
    const [RememberMe, setRememberMe] = useState("");

    useEffect(() => {
        const Udata = JSON.parse(localStorage.getItem("userdata"));

        if (Udata) {
            setRememberMe(true);
            setEmail(Udata?.email);
            setPassword(Udata?.password);
        }

        if (localStorage.getItem("token")) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    }, [navigate]);





    const submitForm = async (e) => {
        e.preventDefault();
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if ((password.length >= 6 && password.length <= 12) && emailRegex.test(email)) {

            console.log(true)

            const Data = {
                email: email,
                password: password,
                "login_method": 1,
                "notification_id": "",
            };

            if (RememberMe === true) {
                localStorage.setItem(
                    "userdata",
                    JSON.stringify({ email: email, password: password })
                );
            } else {
                localStorage.removeItem("userdata");
            }
            console.log('login')
            await axios.post(API_URL.LOGIN_WITH_EMAIL, Data).then(
                (res) => {
                    // console.log(res, 'mmm');
                    if (res.data.status === 200) {
                        console.log(res.data.msg)
                        toaster("successfully login",'success')
                        localStorage.setItem("token", res.data.data.access_token);
                        localStorage.setItem("_id", res.data.data._id);
                        navigate("/dashboard");
                        window.location.reload();
                    }
                },
                (err) => {
                    toaster(err?.data?.msg,'error')
                    console.log(err.response.data);
                }
            );

        } else {
            console.log(false)
            setError(true);
        }


    };

    const changeEmail = (value) => {
        setEmail(value);
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (emailRegex.test(value)) {
            setEmailError(false);
        } else {
            setEmailError(true);
        }
    };

    return (
        <>
            <div className="login-page">
                <div className="login-box">
                    <div className="login-logo">
                        <img
                            src={logo}
                            alt="Logo"
                            className="brand-image"
                            style={{ height: "150px" }}
                        />
                    </div>
                    <div className="card">
                        <div className="card-body login-card-body">

                            <p className="login-box-msg">Sign in to start your session</p>
                            <form
                                onSubmit={(e) => {
                                    submitForm(e);
                                }}
                                noValidate
                            >
                                <div className="mb-3">
                                    <div className="input-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            required
                                            name="email"
                                            value={email}
                                            onChange={(e) => changeEmail(e.target.value)}
                                            placeholder="Email"
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-envelope" />
                                            </div>
                                        </div>
                                    </div>
                                    {!email && error && (
                                        <div className=" ml-2 text-danger">Email is required</div>
                                    )}
                                    {emailError && error && email && (
                                        <div className=" ml-2 text-danger">Invalid Email </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <div className="input-group ">
                                        <input
                                            type={ShowHide ? "password" : "text"}
                                            className="form-control"
                                            required

                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text cursor">
                                                <span
                                                    onClick={() => {
                                                        setType(!ShowHide);
                                                    }}
                                                    className={
                                                        ShowHide ? "fas fa-eye" : "fas fa-eye-slash"
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {error && !password && (
                                        <div className="error ml-2 text-danger">password is required</div>
                                    )}
                                    {error && password ? (
                                        password.length < 6 ? (
                                            <div className="error ml-2 text-danger">Password is too short</div>
                                        ) : password.length > 12 ? (
                                            <div className="error ml-2 text-danger">Password is too long</div>
                                        ) : null
                                    ) : null}

                                </div>
                                <div className="row">
                                    <div className="col-8">
                                        <div className="icheck-primary">
                                            <input
                                                type="checkbox"
                                                id="remember"
                                                checked={RememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                            />
                                            <label htmlFor="remember">Remember Me</label>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <button type="submit" className="btn btn-primary btn-block">
                                            Sign In
                                        </button>
                                    </div>
                                </div>
                            </form>

                            <p className="mb-4">
                            </p>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}
