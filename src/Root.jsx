import React ,{useState,useEffect} from 'react'
import { db } from './FireBase'
import { collection, onSnapshot, query,addDoc, doc,getDocs,deleteDoc } from 'firebase/firestore'
import trash from "../src/trash-solid.svg";

const Root = () => {
    const [todos,setTodos]=useState([])
    const [taskTitle,setTaskTitle]=useState("")
    const [loading,setLoading]=useState(false)
    const [deleteClicked,setDeletedClicked]=useState(false)

    const handleTaskChanges=(e) => {
        
       

        setTaskTitle(e.target.value)
    }

      // delete todo
      const handleDelete = async (e) => {
        setDeletedClicked(true)
        const deletedTodo=e.currentTarget.parentElement;
        try {
          await deleteDoc(doc(db, "todo", deletedTodo.id));
          console.log("Document successfully deleted!");
        } catch (e) {
          console.error("Error removing document: ", e);
        }
        setDeletedClicked(false)
      };

    // fetch data
    useEffect(() => {
        const fetchTodos = async () => {
            setLoading(true)
          const todosCollection = collection(db, "todo");
          const todosSnapshot = await getDocs(todosCollection);
          const todosList = [];
          todosSnapshot.forEach((doc) => {
            console.log(doc.data())
            const todo = doc.data();
            todosList.push({
              id: doc.id,
              task: todo.task,
            });
          });
          setTodos(todosList);
          setLoading(false)
        };
        fetchTodos();
      }, [deleteClicked]);

    // add data
    const handleTodoAdded=async(e)=>{
        e.preventDefault();
        if (taskTitle===""){
            alert('please enter a task title')
             return
        }
         try {
      const docRef = await addDoc(collection(db, "todo"), {
        task: taskTitle,
      });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    setTaskTitle("");
    }

  

  return (
    <div className='text-center w-[80%] py-10 mx-auto bg-red-600 '>
        <h1 className='text-white mb-3 '>my todos </h1>
        <form onSubmit={handleTodoAdded} className='flex items-center m-4'>
            <input className='px-4 py-2 w-full   '  onChange={handleTaskChanges}  value={taskTitle}  type='text' placeholder='add todo' />
            <button className='bg-blue-500 py-2 font-bold px-4'>+ </button>
        </form>
        {loading && <h1>loading ...</h1>}
        { !loading &&  todos.length===0 && <h2 className='text-white font-semibold'>there is no todo</h2>}
        { !loading &&  todos.length !==0 &&   todos.map(({ task,id})=>{
            return  <div id={id} className='text-black flex justify-between items-center px-4 py-3 m-4 bg-white'>
            <p className='text-black font-semibold'>{task}</p>
            <img className='h-4 cursor-pointer ' onClick={handleDelete} src={trash}  />
        </div>
        })}

       
       
    </div>
  )
}

export default Root