import React, {Component} from 'react';
import { List } from 'antd';
import axios from 'axios';
import {Link} from 'react-router-dom';

class PageList extends Component {

  componentWillReceiveProps(nextProps){
    // console.log(nextProps.match.params.id);
    const id = nextProps.match.params.id;
    axios.get('http://www.dell-lee.com/react/api/list.json?id=' + id)
      .then(res => {
        this.setState({
          data: res.data.data
        })
        // console.log(res.data.data);
      })
  }

  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }
  // 发请求，生命周期函数，拿数据，ajax
  componentDidMount(){
    let url = 'http://www.dell-lee.com/react/api/list.json';
    const id = this.props.match.params.id;
    if(id){
      url = url + '?id=' + id;
    }
    axios.get(url)
      .then(res => {
        this.setState({
          data: res.data.data
        })
        // console.log(res.data.data);
      })
  }

  render (){
    return (
      <List
      style={{background:'#fff'}}
      size="small"
      bordered
      dataSource={this.state.data}
      renderItem={item => <List.Item>
        <Link to = {`/detail/${item.id}`}>{item.title}
        </Link>
      </List.Item>}
    />
    )
  }
}

export default PageList;