import React, { Component } from 'react'
import { Modal, } from 'antd'
import Edit from '../components/Edit'
import { connect } from 'dva'
import TodoList from '../components/TodoList'
import ButtonItem from '../components/Button'


class todoList extends Component {
  state = {
    visible: false,
    modalContent: '',
    modalTitle:'',
  }

  handleDelete = (id) => {
    this.props.dispatch({
      type:'todos/delete',
      payload:id
    })
  }

  //列表详情函数，判断visible为true,显示出Modal,当点击详情按钮是show都为true
  detailModal = (item) => {
    console.log(item)
    this.setState({
      visible: true,
      modalContent:item.content,
      modalTitle:item.name
    })
  }

  handleOk = () => {
    this.setState({
      visible: false,
      modalContent:null
    })
  }

  //当每次点击添加按钮时，isAdd为true
  showModal=(item)=>{
    console.log('11')
    console.log(item)
    console.log('22')
    const [title,titleButton]=item ? ['编辑','编辑内容']:['新增','新增内容']
    this.setState({
      visible:true,
      modalTitle:title,
      modalContent:<Edit onSave={this.onSave} item={item} titleButton={titleButton} />
    })
  }

  onSave=(item)=> {
    console.log(item)
    if (item.id) {
      this.setState({visible: false,modalTitle:"",modalContent:"" })
      const {dispatch} = this.props
      dispatch({
        type: 'todos/revise',
        payload: item,
      })
    } else {
      const Item = {
        id:new Date(),
        name: item.name,
        content: item.content,
      }
      this.setState({visible: false,modalTitle:"",modalContent:"" })
      const {dispatch} = this.props
      dispatch({
        type: 'todos/add',
        payload: Item,
      })
    }
  }
  render () {
    const { modalTitle,modalContent,visible} = this.state
    const {todos} =this.props
    console.log(todos)
    return (
      <div >
        <h1>任务列表</h1>
        {/*列表调用更新的函数，和详情以及删除的功能*/}
        <TodoList
          onDelete={this.handleDelete}
          todos={todos}
          onDetail={this.detailModal}
          onUpdate={this.showModal} />

        {/*onOk当show为真时，调用handleOk,为假时，调用onRevise,并传参*/}
        <Modal
          title={modalTitle}
          visible={visible}
          onCancel={this.handleOk}
          onOk={this.handleOk}
        >
          {modalContent}
        </Modal>
        <ButtonItem  onClick={this.showModal}  content={'Add'}/>
      </div>
    )
  }
}

export default connect(({todos})=>({todos}))(todoList)
