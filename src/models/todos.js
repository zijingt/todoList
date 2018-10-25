export  default {
  namespace:'todos',
  state:[
    {name:'aa',content:'aa',id:1}
  ],
  reducers:{
    'add'(state,payload){
      //把payload添加到数组列表末端
      return [...state,payload.payload]
    },
    'delete'(state,{payload:id}){
      return state.filter(item=>item.id!==id)
    },
    'revise'(state,payload){
      const newTodos=state.map((todo)=>{
        return todo.id===payload.payload.id ? payload.payload : todo
      })
      return newTodos
    }
  }
}
