import { PureComponent } from 'react'
import {Input,Button} from 'antd'
import React from 'react'

export  default  class Edit extends PureComponent{
  state={
    name:this.props.item ? this.props.item.name :'',
    content:this.props.item ? this.props.item.content : '',
  }

  handleChange = (event,name)=>{
    let value={}
    value[name]=event.target.value
    this.setState(value)
  }

  onClick = () =>{
    const {name,content} = this.state
    const {onSave,item} = this.props
    const newItem = item ? {...item, name: name, content: content} : {name: name, content: content}
    onSave(newItem)
  }

  render(){
    const {name,content}=this.state
    const {titleButton}=this.props
    return(
      <div>
        <h4>名称</h4>
        <Input
          onChange={(event) => {this.handleChange(event,'name')}}
          value={name}
        />
        <h4>内容</h4>
        <Input
          onChange={(event) => {this.handleChange(event,'content')}}
          value={content}
        />
        <Button  onClick={this.onClick}>{titleButton}</Button>
      </div>
    )
  }
}
