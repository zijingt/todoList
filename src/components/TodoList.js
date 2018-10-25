import React from 'react'
import PropTypes from 'prop-types'
import { Table, Popconfirm, Button } from 'antd'
import ButtonItem from  './Button'
import update from './update.css'

const TodoList = ({onDelete, todos, onUpdate,onDetail}) => {
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title:'内容',
      dataIndex:'content',

    },
    {
      title:'详情',
      render:(index,item)=>{
        return(
          <Button onClick={()=>onDetail(item)}>Detail</Button>
        )
      }
    },
    {
      title: '操作',
      render: (index, item) => {
        return (
          <div  className={update.update}>
            <Popconfirm title="Delete?" onConfirm={() => onDelete(item.id)}>
              <Button>Delete</Button>
            </Popconfirm>
            {/*<Button onClick={() => onUpdate(item)}>Update</Button>*/}
            <ButtonItem  content={'Update'}  onClick={()=>onUpdate(item)}  />
          </div>
        )
      }
    },

  ]

  return (
    <Table
      rowKey={'id'}
      dataSource={todos}
      columns={columns}
      pagination={{pageSize:6}}
    />
  )
}


TodoList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired,
}

export default TodoList
