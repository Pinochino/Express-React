import { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Login() {
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        const API = `http://localhost:8000/customer/login`;
        axios.post(API, inputs)
        .then(data => {
            console.log(data);
            navigate('/')
        })
        .catch(error => {
            console.error(error);
            setError(error.message)
        })
    };

    if (error) {
        return <h1>{error.message}</h1>
    }

    return (
        <div className="container ">
            <form
                method="post"
                className="d-flex justify-content-center align-content-center flex-column"
                onSubmit={handleSubmit}
            >
                <h3 className="text-center m-4">Login Form</h3>
                <div
                    data-mdb-input-init
                    className="htmlForm-outline mb-4 d-flex justify-content-center align-content-center"
                >
                    <label className="me-2" htmlFor="email">
                        Email:{" "}
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={inputs.email || ""}
                        onChange={handleChange}
                        autoComplete="additional-name"
                    />
                </div>

                <div
                    data-mdb-input-init
                    className="htmlForm-outline mb-4 d-flex justify-content-center align-content-center"
                >
                    <label className="me-2" htmlFor="email">
                        Password:{" "}
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={inputs.password || ""}
                        onChange={handleChange}
                        autoComplete="current-password"
                    />
                </div>

                <div className="container d-flex justify-content-around">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="checkRemember"
                            name="checkRemember"
                            value={inputs.checkRemember || ""}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="form2Example31">
                            {" "}
                            Remember me{" "}
                        </label>
                    </div>

                    <div className="">
                        <a href="#!" className="text-decoration-none">
                            htmlForgot password?
                        </a>
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary mb-4"
                >
                    Sign in
                </button>
                <div className="text-center">
                    <p>
                        Not a member? <a href="#!">Register</a>
                    </p>
                    <p>or sign up with:</p>
                    <button
                        type="button"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-link btn-floating mx-1"
                    >
                        <i className="fab fa-facebook-f"></i>
                    </button>

                    <button
                        type="button"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-link btn-floating mx-1"
                    >
                        <i className="fab fa-google"></i>
                    </button>

                    <button
                        type="button"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-link btn-floating mx-1"
                    >
                        <i className="fab fa-twitter"></i>
                    </button>

                    <button
                        type="button"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-link btn-floating mx-1"
                    >
                        <i className="fab fa-github"></i>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
