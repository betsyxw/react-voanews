import React, {Component} from 'react';
import axios from 'axios';
import './style.css';
import {Redirect} from 'react-router-dom';

class Vip extends Component {
  constructor(props){
    super(props);
    this.state = {
      login: true,
      fetchFinish: false
    }
  }

  render(){
    if(this.state.login){
      if(this.state.fetchFinish){
        return <div className='vip'>vip</div>
      }else{
        return <div className='vip'>正在判断用户登陆状态...</div>
      }
    }else{
      return <Redirect to='/' />
    }
  }

  //生命周期
  componentDidMount(){
    axios.get('http://www.dell-lee.com/react/api/isLogin.json',{withCredentials: true})
      .then((res)=>{
        const login = res.data.data.login;
        this.setState ({
          login: login,
          fetchFinish: true
        })
      })
  }

}

export default Vip;