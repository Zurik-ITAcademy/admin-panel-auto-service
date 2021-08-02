import { NavLink, useHistory } from "react-router-dom";
import  cls from './Nav.module.scss';
import Logo from './NavIMG/Logo_2.png'
import { FaSignOutAlt } from 'react-icons/fa';

const Nav = () => {
    const history = useHistory();

    const signOut = () => {
        localStorage.removeItem('user')
        history.push('/login')
    }

    return (
        <div className={cls.header}>
            <div className={cls.navigation}>
                <ol className={cls.Logo}>
                    <li><img to='/home' src={Logo} /></li>
                </ol>

                <ol className={cls.rightContents}>
                    <li><NavLink to='/login'><FaSignOutAlt className={cls.signOut} onClick={signOut} /></NavLink></li>
                </ol>
            </div>
        </div>
    )
}

export default Nav;


