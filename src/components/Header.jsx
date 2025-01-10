import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { FaBlog } from "react-icons/fa"
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { extractUrlAndId } from '../utility/utils';
import { RxAvatar } from 'react-icons/rx';

export default function Header() {
    const { user, logoutUser } = useContext(UserContext)
    const [isOpen, isSetOpen] = useState(false)
    const [avatar, setAvatar] = useState(null)

    useEffect(() => {
        user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url)
    }, [user])

    console.log(user);

    return (
        <div>
            <div className="navbar bg-base-100 px-4 justify-between border-b-2">
                <div>
                    <FaBlog />
                    <a href='/' className="btn btn-ghost text-xl">Főoldal</a>
                    <a href='/posts' className="btn btn-ghost text-xl">Posztok</a>
                    <a href='/create' className="btn btn-ghost text-xl">Új Poszt</a>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1">
                            <li>
                                <details>
                                    <summary className='text-xl'>Parent</summary>
                                    <ul className="bg-base-100 rounded-t-none p-2">
                                        <li><a>Posztok</a></li>
                                        <li><a>Új Poszt</a></li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    {!user ? <>
                        <a href='/auth/in' className="btn btn-ghost text-x">Belépés</a>
                        <a href='/auth/up' className="btn btn-ghost text-x">Regisztráció</a>
                    </> : <>
                        <a href='/' className="btn btn-ghost text-x" onClick={() => logoutUser()}>Kijelentkezés</a>
                        <div className="flex-none">
                           
                            <div className="dropdown dropdown-end">
                                <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar" >
                                    
                                    {avatar ? <img className='myavatar' style={{width:'30px', height:'30px', borderRadius:'50%'}} src={avatar} /> : <RxAvatar title={user.displayName} />
                            }
                                </div>
                                <ul
                                    tabIndex="0"
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow">
                                    <NavLink to='/deleteAccount'>Fiók törlése</NavLink>
                                    <li><a href='/profile'>Személyes adatok</a></li>
                                    <li><a>Kijelentkezés</a></li>
                                </ul>
                            </div>
                        </div>
                    </>
                    }

                </div>
            </div>
            <Outlet />
        </div>
    )
}
