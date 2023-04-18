import React, { Fragment, useEffect, useState } from 'react';
import { Table, Container, Row, Form, Button } from 'react-bootstrap';
import api from '../api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
const Login = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const onChange = (e) => {
        let newUser = { ...user }
        newUser[e.target.name] = e.target.value
        setUser(newUser)
    }

    const login = () => {
        api.login.login(user)
            .then((res) => {
                if (res.status == 200) {
                    toast('Login Successfull', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    navigate("/blog");
                    localStorage.setItem("token", res.data.data.token);
                }
            })
            .catch((Err) => { console.log(Err) })
    }



    return (
        <>
            <div className='container-fluid' style={{
                height
                    : '100vh'
            }}>
                <div className='align-content-center h-100 align-items-center d-flex justify-content-center row'>
                    <div className='col-6'>

                        <form>

                            <div class="form-outline mb-4">
                                <input type="email" name='email' onChange={onChange} id="form2Example1" class="form-control" value={user.email
                                    || ''} />
                                <label class="form-label" for="form2Example1">Email address</label>
                            </div>


                            <div class="form-outline mb-4">
                                <input type="password" name='password' onChange={onChange} value={user.password
                                    || ''} id="form2Example2" class="form-control" />
                                <label class="form-label" for="form2Example2">Password</label>
                            </div>





                            <button type="button" onClick={login} class="btn btn-primary btn-block mb-4">Sign in</button>



                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;