import { TaskContext } from "../context/TaskContext";
import { useContext } from "react";

//custom hook for useTaskContext
export const useTasksContext = () => {
    const context = useContext(TaskContext);

    if(!context){
        throw Error("useTasksContext must be used inside a TaskContextProvider")
    }

    return context;
}