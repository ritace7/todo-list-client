import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';

const Home = () => {
    return ( 
       <div className="todos-page">
            <TodoForm />
            <TodoList />
       </div>
     );
}
 
export default Home;