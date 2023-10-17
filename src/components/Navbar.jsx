import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getLoginStatus, setLoginStatus } from '../utils/store';

export default function Navbar({ setloginStatus, loginStatus }) {



    const navigate = useNavigate();
    const handleLogout = () => {
        setloginStatus(false);
        setLoginStatus(false);
        navigate('/account')

    }
    useEffect(() => {
        if (!getLoginStatus()) {
            setloginStatus(false);
        } else {
            setloginStatus(true)
        }
    }, [])

    return (
        <div>
            <nav >
                <div onClick={()=>navigate('/home')}>
                    <img src="https://anilviji.files.wordpress.com/2016/02/geeksynergy.png?w=687" alt="" />
                    <h2>GEEKSYNERGY</h2>
                </div>
                <div>
                    <div onClick={() => navigate('/companyInfo')}><p >Company Info</p> </div>
                    {!loginStatus ? <div onClick={() => navigate('/account')} style={{ marginLeft: "10px" }}><p>Login</p></div> : <div className='drop-down-container'> <ul><li><i class="fa-regular fa-user"></i> Profile
                        <ul className='drop-down'>
                            <li>My Profile</li>
                            <li onClick={handleLogout}>Logout</li>
                        </ul>
                    </li></ul></div>}
                </div>

            </nav>
        </div>
    )
}
