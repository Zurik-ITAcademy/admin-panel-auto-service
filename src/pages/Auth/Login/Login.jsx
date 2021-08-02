import React, { useEffect } from 'react'
import cls from './Login.module.scss'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';


const API_KEY = ('AIzaSyDaU5wGViZd3prwsSlht7AaZwCODliReGg');
const BASE_URL=(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`);

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState('Email не может быть пустым');
    const [passwordError, setPasswordError] = useState('Password не может быть пустым');
    const [formValid, setFormValid] = useState(false);
    const history = useHistory();

    useEffect(()=>{
        if(emailError || passwordError){
            setFormValid(false)
        }else{
            setFormValid(true)
        }
    }, [emailError, passwordError])

    const emaileHandler = (e) =>{
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(e.target.value).toUpperCase())){
            setEmailError('Некорректный Email')
            if(!e.target.value){
                setEmailError('Email не может быть пустым')
            }
        }else{
            setEmailError('')
        }
    }

    const passwordHandler = (e)=>{
        setPassword(e.target.value)
        if(e.target.value.length < 3 || e.target.value.length > 8){
            setPasswordError('Пароль должен быть длинее 3 меньше 8')
        }else{
            setPasswordError('')
        }
    }
    
    const signIn = e =>{
        e.preventDefault()

        if(email && password){
            fetch(BASE_URL,{
                method:'POST',
                headers:{
                    'Content-type': "application/json"
                },
                body:JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true
                })
            })
            .then(res => res.json())
            .then(r => {
                localStorage.setItem('user', JSON.stringify(r))
                // localStorage.setItem('uid', r?.localId)
                // localStorage.setItem('idToken', r?.idToken)
                setEmail('')
                setPassword('')
                history.push('/home')
            })
            .catch(err => {
                console.log(err);
            })
        }else{
            alert('Все данные должны быть заполнены')
        }    
    } 



    return (
        <div className={cls.LoginPage}>
            <div className={cls.LoginComponents}>
                <h2>Авторизация</h2>
                <form>
                {(emailDirty && emailError) && <div style={{color:'red'}}>{emailError}</div>}
                    <input
                    onChange={e => emaileHandler(e)}
                    name='email'
                    value={email}
                    onChange={e =>{
                        setEmail(e.target.value)
                    }}
                    type='email'
                    placeholder='Email'
                        
                    />
                    {(passwordError && passwordDirty ) && <div style={{color:'red'}}>{passwordError}</div>}
                    <input
                    onChange={e => passwordHandler(e)}
                    name='password'
                    value={password}
                    onChange={e =>{
                        setPassword(e.target.value)
                    }}
                    type='password' 
                    placeholder='Password' 
                    />
                    <div className={cls.Btn}>
                        <button disabled={formValid}  onClick={signIn} > Войти </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login