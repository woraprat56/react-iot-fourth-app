import React from 'react'
import todo from './../assets/todo.png'
import Footer from './../components/Footer'
import { Link, useparams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './../libs/supabaseClient'

export default function UpdateTodo() { 
  // สร้างเก็บข้อมูลส่งต่อท้าย  URL มา
  const {id} = useparams()
  
  // สร้าง state เพื่อเก็บข้อมูลที่ต้องการบน Complete
 const[todo_name, setTodoName] = useState('')
 const[todo_detail, setTodoDetail] = useState('')
 const[todo_complete, setTodoComplete] = useState(false)

 useEffect(()=>{
  // ฟังก์ชันดึงข้อมูล
  const fetchData = async () => {
    const { data, error } = await supabase
                          .from('todo_tb')
                          .select('')
                          .Single()
  
  if(error){
    alert('ไม่สามารถดึงข้อมูลได้ กนุณาลองใหม่อีกครั้ง')
    return;
  }

  // ถ้าไม่มี error ให้เก็บข้อมูลใว้ State
  setTodoName(data.todo_name)
  setTodoDetail(data.todo_detail)
  setTodoComplete(data.todo_complete)
  }

  // เรียกใช้ฟังก์ชันดึงข้อมูล
  fetchData()
 },[])

// ฟังก์ชันสำหรับการบันทึกข้อมูลไปยัง Table ใน Postges บน supabase
const handleSaveClick = async () => {
  // บันทึกข้อมูลไปยัง Table ใน Postges บน supabase
const { error } = await supabase
                        .from('todo')
                        .update({
                          todo_name: todo_name,
                          todo_detail: todo_detail,
                          todo_complete: todo_complete
                        })
  // ตรวจสอบ error
  if(error){
    alert('ไม่สามารถบันทึกแก้ไขข้อมูลได้ กรุณาลองให่อีกครั้ง')
    return;
  }
  // แสดงข้อความแจ้งผล และ redirect กลับไปที่หน้าจอ /showlltodo
  alert('บันทึกแก้ไขข้อมูลเรียบร้อย')
  window.location.href = '/showlltodo'
}

  return (
    <div>
      <div className='w-8/12 border border-gray-200 shadow p-10 mx-auto mt-30 rounded'>
        <img src={todo} alt="todo" className='w-30 mx-auto'/>
       
          <h1 className='text-3xl text-center font-bold mt-7 text-blue-700'>
            Todo Management V.1.0            
          </h1>
 
          <h1 className='text-xl text-center font-bold mt-4 text-blue-700'>
            แก้ไขข้อมูลงาน          
          </h1>
 
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              ชื่องาน
            </label>
            <input
              value={todo_name} onClick = {(e) => setTodoName(e. target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter todo name..."
            />
          </div>
 
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              รายละเอียดงาน
            </label>
            <input
            value={todo_name} onClick = {(e) => setTodoDetail(e. target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter todo detail..."
            />
          </div>
 
          {/* เสร็จ ไม่เสร็จ */}
          <div className="flex  my-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              รายละเอียดงาน
            </label>
             <select className='w-full boder p-2 rounded'
                      value={todo_complete == true? '1' : '0'}
                      onChange={(e) => setTodoComplete(e.target.value == '1'? true : false)}>
              <option value="1">เสร็จ</option>
              <option value="0">ไม่เสร็จ</option>
             </select>
          </div>
 
          <button onClick={handleSaveClick}
            className="bg-blue-500 hover:bg-blue-700 text-white w-full
            font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            บันทึกแก้ไขงาน
          </button>
 
          <Link to='/showalltodo' className='block w-full text-center mx-auto mt-5'>          
              กลับไปหน้าแสดงข้อมูลงาน
          </Link>
 
         
      </div>
 
      <Footer/>
    </div>
  )
}