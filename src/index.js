import React, {Component} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import ReactDom from 'react-dom';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import './style.css'
import AppHeader from './components/Header/index';
import Login from './components/Login/index';
import PageList from './containers/PageList/index';
import Detail from './containers/Detail/index';
import Vip from './containers/Vip/index';

const { Header, Footer, Content } = Layout;

class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <Layout style={{minWidth:1300, height:'100%'}}>
        <Header className='header'><AppHeader/></Header>
        <Content className='content'>
            <Login />
            <Switch>
              <Route path='/vip' component={Vip} />
              <Route path='/detail/:id' component={Detail} />
              <Route path='/:id?' component={PageList} />
            </Switch>
        </Content>
        <Footer className='footer'>@copyright author xw 2021.4</Footer>
        </Layout>
      </BrowserRouter>
    )
  }
}


ReactDom.render(<App />, document.getElementById('root'));