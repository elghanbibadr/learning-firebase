import React ,{useState,useEffect} from 'react'
import { db } from './FireBase'
import { collection, onSnapshot, query } from 'firebase/firestore'
import trash from "../src/trash-solid.svg";

const Root = () => {
    const [todos,setTodos]=useState([])

    useEffect(()=>{
        const q=query(collection(db,"todos"))
        const unsubscribe = onSnapshot(q,(querySnapshot)=>{
            let todosArray=[];
            querySnapshot.forEach((doc)=>{
                todosArray.push({...doc.data(),id:doc.id});
            })
            setTodos(todosArray)
        })
        return ()=> unsubscribe()
    },[])


    const handleTodoAdded=(e)=>{
        e.preventDefault();
    }

  return (
    <div className='text-center w-[80%] mx-auto bg-red-600 h-[60vh]'>
        <h1 className='text-white mb-3 '>my todos </h1>
        <form onSubmit={handleTodoAdded} className='flex items-center m-4'>
            <input className='px-4 py-2 w-full   ' type='text' placeholder='add todo' />
            <button className='bg-blue-500 py-2 font-bold px-4'>+ </button>
        </form>
        <div className='text-black flex justify-between items-center px-4 py-3 m-4 bg-white'>
            <p className='text-[#222] font-semibold'>learn react</p>
            <img className='h-4 cursor-pointer ' src={trash}  />
        </div>
        {todos.map((todo)=>{
            console.log(todo)
        })}
    </div>
  )
}

export default Root