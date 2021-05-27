import React, {Component} from 'react';
import { Card } from 'antd';
import axios from 'axios';
import './style.css'

class Detail extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      content:''
    }
  }

  render (){
    return (
      <div>
        <Card title={this.state.title} >
          <div className = "detail" dangerouslySetInnerHTML = {{__html: this.state.content}}></div>
        </Card>
      </div>
    )
  }
// 服务加载完毕，ajax去请数据，放在生命周期函数内
componentDidMount(){
  const id = this.props.match.params.id;
  axios.get('http://www.dell-lee.com/react/api/detail.json?id=' + id)
    .then((res)=>{
      // console.log(res);
      this.setState({
        title: res.data.data.title,
        content: res.data.data.content
      })
    })
}

}

export default Detail;