import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import logo from './logo.png';
import'./style.css';
import { Menu} from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';
import axios from 'axios';


class AppHeader extends Component {
  constructor (props){
    super(props);
    this.state = {
      list: []
    }
  }
  getMenuItems(){
    console.log(this.state.list);
    return this.state.list.map( item => {
      return (
        <Menu.Item key={item.id} icon={<CustomerServiceOutlined />}>
          <Link to = {`/${item.id}`}>
            {item.title}
          </Link>
          </Menu.Item>
      )
    })
  }
  // 生命周期函数,ajax数据
  componentDidMount (){
    axios.get('http://www.dell-lee.com/react/api/header.json')
      .then((res)=>{
        this.setState ({
          list: res.data.data
        })
      })
  }
  render(){
    return(
    <Fragment>
      <Link to='/'>
        <img src={logo} alt="description of img" className='app-header-logo'/>
      </Link>
      <Menu  className="app-header-menu" mode="horizontal">
        {this.getMenuItems()}
      </Menu>
    </Fragment>
    )
  }
}

export default AppHeader;