import axios from 'axios'
import React, { useState, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main.jsx'
import toast from 'react-hot-toast'



function Login() {


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(
                `${server}/users/new`,
                {
                    firstName,
                    lastName,
                    email,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            toast.success(data.message);
            setIsAuthenticated(true);
            setLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
            setIsAuthenticated(false);
            setLoading(false);
        }
    };

    if (isAuthenticated) return <Navigate to='/' />

    return (
        <div className="login">
            <section>
                <form onSubmit={submitHandler}>
                    <input type="text" placeholder='Enter your first name' value={firstName} onChange={(e) => { setFirstName(e.target.value) }} required />

                    <input type="text" placeholder='Enter your last name' value={lastName} onChange={(e) => { setLastName(e.target.value) }} required />

                    <input type="email" placeholder='Enter your email' value={email} onChange={(e) => { setEmail(e.target.value) }} required />

                    <input type="password" placeholder='Enter your password' value={password} onChange={(e) => { setPassword(e.target.value) }} required />

                    <button type="submit" disabled={loading}>Sign Up</button>
                    <h4>Or</h4>
                    <Link to='/login'>Login</Link>
                </form>
            </section>
        </div>
    )
}

export default Login