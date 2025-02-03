import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreateUserWithEmailAndPassword, handleFBSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFrameWork, resetPassword, SignInWithEmailAndPassword } from './LoginManager';


function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn:false,
    name: '',
    email: '',
    photo: '',
    error:'',
    success:false,
  });
  
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {from: '/'};

  initializeLoginFrameWork();

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(loggedInUser => {
      handleResponse(loggedInUser, true);
    });
  }

  const fbSignIn = () => {
    handleFBSignIn().then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error.message);
    })
  }

  const signOut = () => {
    handleSignOut().then(signOutUser =>{
      handleResponse(loggedInUser, false)
    });
  }


  const handleBlur = (event) => {
    let isFieldValid = true;
    if(event.target.name == 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
     
    }
    if(event.target.name == 'password'){
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }
  
  const handleSubmit = (e) =>{
    if(newUser && user.email && user.password){
      CreateUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(loggedInUser => {
        handleResponse(loggedInUser, true);
      })
    }
    if(!newUser && user.email && user.password){
      SignInWithEmailAndPassword(user.email, user.password).then(loggedInUser => {
        handleResponse(loggedInUser, true);
      })
    }
    e.preventDefault();
  }
 
  const handleResponse = (res, redirect) =>{
        setUser(res);
        setLoggedInUser(res);
        if(redirect){
          navigate(state.from);
        }
  }
  

  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={signOut}>Sign Out</button> : <button onClick={googleSignIn}>Sign In</button>
      }
      <br/>
      <button onClick={fbSignIn}>Sign In using Facebok</button>
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>p
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt=''/>
        </div>
      }
        <h1>Our Own Authentication</h1>
      <input type='checkbox' onChange={()=>setNewUser(!newUser)} name='newUser' id='newUser'/>
      <label htmlFor='newUser'>New User SignUp</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type='text' name='name' placeholder='Your name' onBlur={handleBlur} />}
        <br />
        <input type="text" name='email' onBlur={handleBlur} placeholder='Your Email address' required/>
        <br/>
        <input type='password' name='password' onBlur={handleBlur} placeholder='Your Password' required/>
        <br/>
        <input type='submit' value= {newUser ? 'Sign Up':'Sign In'} />
      </form>
      <button onClick={()=>resetPassword(user.email)}>Forget or Reset Password</button>
      <p style={{ color:'red' }}>{user.error}</p>
      {user.success && <p style={{color: 'green',
      }}>User {newUser ? 'Created' : 'Logged In' } Successfully</p>}
    </div>
  );
}

export default Login;
