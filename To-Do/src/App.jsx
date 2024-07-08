import "./App.css";
import { useState, useEffect } from "react";

export default function App(){
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState(() => {
        const localValue = localStorage.getItem('item');
        if(localValue == 0) return [];
        return JSON.parse(localValue);
    });

    useEffect(() => {
        localStorage.setItem('item', JSON.stringify(tasks));
    }, [tasks]);

    const handleSubmit = (e) =>  {
        e.preventDefault();
        if(!input) return;
        setTasks((curTask) => {
            return [...curTask, {
                id: crypto.randomUUID(),
                title: input,
                completed: false
            }];
        });
        setInput('');
    }
    const handleCheck = (id) =>  {
        setTasks((curTask) => {
            return curTask.map( (task) => {
                if(task.id === id){
                    return {...task, completed: !task.completed}
                }
                return task;
            })
        });
    } 
    const handleDelete = (id) => {
        setTasks((curTask) => {
            return curTask.filter((task) => task.id !== id)
        })
    }
    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit} >
                <input type="text" placeholder="Add a task" value={input} onChange={(e) => setInput(e.target.value)} />
                <button type="submit" aria-label="Add task"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg></button>
            </form>
            <div className="task-item">
                <ol id="item-list">
                    {tasks.map((task) => {
                        return (
                            <li key={task.id} style={{backgroundColor: task.completed? '#50c878': '#F08080', color: 'white'}}>{task.title}
                                <div className="button">
                                    <button onClick={() => handleDelete(task.id)} ><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
                                    <button onClick={() => handleCheck(task.id)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q8 0 15 1.5t14 4.5l-74 74H200v560h560v-266l80-80v346q0 33-23.5 56.5T760-120H200Zm261-160L235-506l56-56 170 170 367-367 57 55-424 424Z"/></svg></button>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </div>
    )
}