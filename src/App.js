import logo from './logo.svg';
import './App.css';
import TodoTemplate from './components/Template/TodoTemplate';
import TodoInsert from './components/Insert/TodoInsert';
import TodoList from './components/List/TodoList';
import { useCallback, useRef, useState } from 'react';

const App = () => {
  const [todos, setTodos] = useState([
    {id : 1, text : '리액트 기초 알아보기', checked : true},
    {id : 2, text : '컴포넌트 스타일하기', checked : true},
    {id : 3, text : '일정 관리 앱 만들어 보기', checked : false}
  ])
  const nextId = useRef(4);
  const onInsert = useCallback(
    text => { //TodoInsert에서 파라미터로 받은 value 
      const todo = {
        id : nextId.current,
        text,
        checked : false
      };
      setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    [todos]
  );
  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id))
    },
    [todos],
  )
  const onToggle = useCallback(
    id => {
      setTodos(
        todos.map(todo =>
          todo.id === id ? {...todo, checked : !todo.checked} :todo,  
        )
      )
    },
    [todos]
  )

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
}

export default App;
