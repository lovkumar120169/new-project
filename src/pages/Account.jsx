import React, { useEffect, useState } from 'react'
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { getDataFromLocalStorage, setDataToLocalStorage, setLoginStatus } from '../utils/store';

export default function Account({ setloginStatus }) {
    const [usersData, setUsersData] = useState([])
    const [accountStatus, setAccountStatus] = useState("login");
    const [login, setLogin] = useState({ email: "", password: "" });
    const [signUp, setSignUp] = useState({ email: "", password: "", mobile: "", name: "" });
    const [errorMessage, setErrorMessage] = useState({ name: "", password: "", email: "", mobile: "" });

    let navigate = useNavigate();


    const handleLogin = (e) => {
        e.preventDefault();
        let user = usersData.find(user => (user.email == login.email || user.mobile == (login.email)) && user.password == (login.password));

        if (user) {
            toast.success("Sucessfully Logged In !");
            setLogin({ email: "", password: "" });
            setLoginStatus(true);
            setloginStatus(true);
            setTimeout(() => {
                navigate('/')
            }, 2000)
        } else {
            let email = usersData.find(user => (user.email == login.email || user.mobile == (login.email)))
            if (email) {
                toast.error("Incorrect Password !")
            } else {
                toast.error("Account Not Created. Join Us")
            }
        }
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        let email = usersData.find(user => (user.email == signUp.email || user.mobile == signUp.email))
        if (email) {
            toast.error("Already have a acount. Please Login !")
            return;
        }
        if (!validateEmail(signUp.email)) {
            setErrorMessage({ ...errorMessage, email: 'Invalid email address' });
            return;
        }
        if (!validatePhone(signUp.mobile)) {
            setErrorMessage({ ...errorMessage, mobile: 'Invalid phone number' });
            return;
        }
        if (!validatePassword(signUp.password)) {
            setErrorMessage({ ...errorMessage, password: 'Password must be at least 5 characters long' });
            return;
        }
        toast.success("Account Sucessfully Created !");
        setDataToLocalStorage(signUp);
        setUsersData([...usersData, signUp]);
        setTimeout(() => {
            setAccountStatus("login");
            setSignUp({ email: "", password: "", mobile: "", name: "" })
        }, 1000)
    }



    // functions for form validation

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };
    const validatePhone = (phone) => {
        const phonePattern = /^\d{10}$/;
        return phonePattern.test(phone);
    };
    const validatePassword = (password) => {
        return password.length >= 5;
    };


    useEffect(() => {
        const res = getDataFromLocalStorage();
        setUsersData(res);
    }, [])

    return (
        <section className='account-section'>
            <ToastContainer position="top-center" autoClose={1500} transition={Flip} />
            <div className="account-container">
                {accountStatus === 'login' ?
                    (<form onSubmit={handleLogin}>
                        <label htmlFor="">Email or Phone</label>
                        <input type="text" value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} required />
                        <label htmlFor="">Password</label>
                        <input type="password" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} required />
                        <button>Sign in</button>
                        <button onClick={() => setAccountStatus('signUp')}>Create A New Account</button>
                    </form>) :

                    (<form onSubmit={handleSignUp}>
                        <label htmlFor="">Name</label>
                        <input type="text" value={signUp.name} onChange={(e) => setSignUp({ ...signUp, name: e.target.value })} required />
                        <label htmlFor="">Email</label>
                        <input type="text" value={signUp.email} onChange={(e) => {
                            setSignUp({ ...signUp, email: e.target.value });
                            setErrorMessage({ ...errorMessage, email: '' });
                        }} required />
                        {errorMessage.email && <span>{errorMessage.email}</span>}
                        <label htmlFor="">Phone</label>
                        <input type="text" value={signUp.mobile} onChange={(e) => {
                            setSignUp({ ...signUp, mobile: e.target.value });
                            setErrorMessage({ ...errorMessage, mobile: '' });
                        }} required />
                        {errorMessage.mobile && <span>{errorMessage.mobile}</span>}
                        <label htmlFor="" >Password</label>
                        <input type="password" value={signUp.password} onChange={(e) => {
                            setSignUp({ ...signUp, password: e.target.value });
                            setErrorMessage({ ...errorMessage, password: '' });
                        }} required />
                        {errorMessage.password && <span>{errorMessage.password}</span>}
                        <button >Sign Up</button>
                    </form>)}
            </div>
        </section>
    )
}
