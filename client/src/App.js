/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import Notes from "./component/note";
import Login from "./component/login";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(()=>{
    const checkLogin = async () =>{
      const token = localStorage.getItem('tokenStore');
      if (token) {
        const verified = await axios.get('/user/verify',{
          headers:{Authorization:token}
        })
        setIsLogin(verified.data)
        if(verified.data === false) return localStorage.clear()
      } else {
        setIsLogin(false)
      }
    }
    checkLogin()
  },[])

  return (
    <div className="App">
      {isLogin ? <Notes /> : <Login setIsLogin={setIsLogin} />}
    </div>
  );
}

export default App;