import {useEffect} from 'react';
import { useTasksContext} from '../hooks/useTasksContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from "../hooks/useLogout";

//the list component
const TodoList = () => {
    const {tasks, dispatch} = useTasksContext();
    const {user} = useAuthContext();

    const {logout} = useLogout();
    const handleLogout = () => {
        logout();
    }

    //handles delete when user click delete icon
    const handleDelete = async (id) =>{

        if(!user){
            return
        }

        const response = await fetch('/api/tasks/'+id,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();
        
        if(response.ok){
            dispatch({type: 'DELETE_TASK', payload: json})
        }
    } 

    useEffect(()=>{
        const fetchTasks = async () =>{
            const response = await fetch('/api/tasks', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if(response.ok){
                dispatch({type: 'SET_TASKS', payload: json})
            }
        }

        if(user){
            fetchTasks();
        }
    }, [dispatch, user])

    return (  
        <>
            <ul className="todo-list">
                {tasks && tasks.map((task)=>{
                    return (
                        <li key={task._id}>
                        {task.content} 
                        <FontAwesomeIcon 
                            className="delete-btn"
                            icon={faTrash}
                            style={{color: "#F9B872"}}
                            onClick={() => handleDelete(task._id)}
                            />
                    </li>                      
                )})
            }        
            </ul>
            <button className="logout-btn" onClick={handleLogout}>Log out</button>
        </>
    );
}
 
export default TodoList;