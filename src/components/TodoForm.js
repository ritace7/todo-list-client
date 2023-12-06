import { useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

//Input form to add a new task to the list
const TodoForm = () => {
    const { dispatch } = useTasksContext();
    const { user } = useAuthContext();

    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    
    //handles user request to add a task
    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(!user){
            setError('You must be logged in');
            return
        }

        const newTask = {content};
        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(newTask),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        //return error if any
        if (!response.ok){
            setError(json.error)
            console.log("error", json)
        }

        //if valid response, add task to database 
        if (response.ok){
            setContent('');
            setError(null);
            console.log("successful", json)
            dispatch({type: 'CREATE_TASK', payload: json})
        }
    }   

    return ( 
        <form className="add" onSubmit={handleSubmit}>
            {user && <span>Hi, {user.email}.</span>}
            <label>Add a new task:</label>
            <input 
                type="text"
                onChange={(e) => setContent(e.target.value)}
                value={content}
            />
            <button>Add</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}
 
export default TodoForm;