import React, {Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import './style.css'
import axios from 'axios';
import { Modal, Button, Input, message } from 'antd';

class Login extends Component {

  constructor(props){
    super(props);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.changUser = this.changUser.bind(this);
    this.changPassword = this.changPassword.bind(this);
    this.checkLogin =this.checkLogin.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      // 初始默认状态,false
      login: false,
      modal: false,
      user: '',
      password: ''
    }
  }
  //函数部分
  showModal (){
    this.setState({
      modal:true
    })
  }
  hideModal(){
    this.setState({
      modal:false
    })
  }
  changUser(e){
    this.setState({
      user: e.target.value
    })
    // console.log(e.target.value);
  }
  changPassword(e){
    this.setState({
      password: e.target.value
    })
  }
  checkLogin(){
    const {user, password} = this.state;
    //发ajax去校验用户名和密码
    const url = `http://www.dell-lee.com/react/api/login.json?user=${user}&password=${password}`;
    axios.get(url,{withCredentials: true})
      .then((res)=>{
        // console.log(res);
        const login = res.data.data.login;
        // alert(login);
        if(login){
          message.success('登陆成功')
          this.setState({
            login:true,
            modal:false
          })
        }else{
          message.error('登陆失败')
        }
      })
    // console.log(user, password);
  }
  logout(){
    axios.get('http://www.dell-lee.com/react/api/logout.json',{withCredentials: true})
      .then((res)=>{
        // console.log(res.data.data)
        const data = res.data.data;
        if(data.logout){
          this.setState({login: false});
        }
        this.props.history.push('/');
      })
  }

  render (){
    const {login} = this.state;
    return (
      <div className="login">
        {
          login ?
            <Button onClick ={this.logout} type="primary">退出</Button> : <Button type="primary" onClick={this.showModal}>登陆</Button>
        }
        <Link to='/vip'>
          <Button type="primary" style={{marginLeft:10}}>Vip</Button>
        </Link>
        <Modal title="登陆" visible={this.state.modal} onOk={this.checkLogin} onCancel={this.hideModal}>
        <Input onChange= {this.changUser} value = {this.state.user} placeholder="请输入用户名" style={{marginBottom: 10}}/>
        <Input onChange= {this.changPassword} value = {this.state.password} placeholder="请输入密码" type='password'/>
      </Modal>
      </div>
    )
  }
  //生命周期
  componentDidMount(){
    axios.get('http://www.dell-lee.com/react/api/isLogin.json',{withCredentials: true})
      .then((res)=>{
        const login = res.data.data.login;
        this.setState ({
          login: login
        })
      })
  }

}

export default withRouter(Login);