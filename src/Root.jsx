import React ,{useState,useEffect} from 'react'
import { db } from './FireBase'
import { collection, onSnapshot, query,addDoc, doc,getDocs,deleteDoc } from 'firebase/firestore'
import trash from "../src/trash-solid.svg";
import update from "../src/pen-to-square-regular.svg";
const Root = () => {
    const [todos,setTodos]=useState([])
    const [taskTitle,setTaskTitle]=useState("")
    const [loading,setLoading]=useState(false)
    const [deleteClicked,setDeletedClicked]=useState(false)
  const todosCollectionRef=collection(db, "todo");
    const handleTaskChanges=(e) => {
        
        setTaskTitle(e.target.value)
    }

    // update todo
    const updateTodo=async(id,task)=>{
   
    }

    const handleUpdate=()=>{}

      // delete todo
      const handleDelete = async (e) => {
        setDeletedClicked(true)
        const deletedTodo=e.currentTarget.parentElement;
          await deleteDoc(doc(db, "todo", deletedTodo.id));
        
        setDeletedClicked(false)
      };

    // fetch data
    useEffect(() => {
        const getTodos = async () => {
            setLoading(true)
          const todosSnapshot = await getDocs(todosCollectionRef);
          setTodos(todosSnapshot.docs.map((doc)=>({...doc.data(),id:doc.id})))
          setLoading(false)
        };
        getTodos();
      }, []);

    // add data
    const addTodo=async(e)=>{
        e.preventDefault();
        if (taskTitle===""){
            alert('please enter a task title')
             return
        }
      const docRef = await addDoc(todosCollectionRef, { task: taskTitle });
    setTaskTitle("");
    }

  

  return (
    <div className='text-center w-[80%] py-10 mx-auto bg-red-600 '>
        <h1 className='text-white mb-3 '>my todos </h1>
        <form onSubmit={addTodo} className='flex items-center m-4'>
            <input className='px-4 py-2 w-full   '  onChange={handleTaskChanges}  value={taskTitle}  type='text' placeholder='add todo' />
            <button className='bg-blue-500 py-2 font-bold px-4'>+ </button>
        </form>
        {loading && <h1>loading ...</h1>}
        { !loading &&  todos.length===0 && <h2 className='text-white font-semibold'>there is no todo</h2>}
        { !loading &&  todos.length !==0 &&   todos.map(({ task,id})=>{
            return  <div id={id} className='text-black flex justify-between items-center px-4 py-3 m-4 bg-white'>
            <p className='text-black font-semibold'>{task}</p>
            <div className='flex items-center'>
              <img className='h-4 mx-2 cursor-pointer ' onClick={handleDelete} src={trash}  />
              <img className='h-4 cursor-pointer ' onClick={handleUpdate} src={update}  />
            </div>
        </div>
        })}

       
       
    </div>
  )
}

export default Root