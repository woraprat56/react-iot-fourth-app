import React from 'react'
import Footer from './../components/Footer'
import Todo from './../assets/todo.png'
import { useState, useEffect } from  'react'
import { supabase } from './../libs/supabaseClient'
import { Link } from 'react-router-dom'


export default function ShowAllTodo() {
  // สร้าง State เพื่อเก็บข้อมูลที่ดึงมาจาก Tabel in Postgres บท Supabase
  const [todos, setTodo] = useState ([])

  // ดึงข้อมูลจาก Table ใน Postgres บน Supabase
  useEffect(()=>{
  // ฟังก์ชันดึงข้อมูลจาก Table Postgres บน Supabase
  const fetchData = async () => {
    // ไปดึงมา
    const {data, error} = await supabase
                                .from('todo_tb')
                                .select('+')
  // หลังจากดึงมา ตรวจสอบก่อนว่า error หรือไม่
  if(error){
    alert('ไม่สามารถดึงข้อมูลได้ กรุณาลองใหม่อีกครั้ง')
    return
  }
  // ถ้ามี error ให้เก็บข้อมูลไว้ใน State
  setTodo(data)
  }

  // เรียกใช้ฟังก์ชันดึงข้อมูลให้ทำงาน
  fetchData()
  } , [])

  // สร้างฟังก์ชันจัดการลบข้อมูล
  const handleDeteClick = async (id) => {
    if( confirm ('คุณต้องการลบข้อมูลหรือไม่ ?')) {
      // ลบข้อมูลออกจาก Table ใน Prostgres บน Supabase
      const { error } = await supabase
                            .from('todo')
                            .delete()
                            .eq('id', id)
      // ตรวจสอบว่ามี error ไหม
      if( error ){
        alert('ไม่สามารถลบข้อมูลได้ กรุณาลองใหม่อีกครั้ง')
        return
      }
      // ลบข้อมูลออกจากตารางที่แสดงหน้าจอ
      setTodos(todos.filter((todo) => todo.id !== id))
    }
  }

  return (
    <div>
      <div className='w-8/12 boder boder border-gray-200 shadow-2xl p-10 mask-auto mt-30 rounded'>
      <img src={Todo} alt="Todo" className='w-30 mx-auto' />

      <h1 className='text-3xl text-center font-bold mt-7 text-blue-700'>
          Todo Management V.1.0
        </h1>

        <h1 className='text-3xl text-center font-bold mt-4 text-blue-700'>
          ข้อมูลงานทั้งหมดที่ต้องทำ
        </h1>
        <div className='mt-5 flex justify-end'>
            <Link to={'/addtodo'} className='bg-blue-500 hover:bg-blue-700 text-white
                                              font-bold py-2 px-4 rounded'>
              เพิ่มงานใหม่
            </Link>
          </div>

        {/* ตารางแสดงข้อมูลที่ดึงมาจาก Subabase */}
        <table className='w-full boder mt-5'>
          <thead>
            <tr className='text-center font-bold bg-gray-200'>
              <td className='boder p-2'>No.</td>
              <td className='boder p-2'>ชื่องาน</td>
              <td className='boder p-2'>รายละเอียดงาน</td>
              <td className='boder p-2'>สถาะงาน</td>
              <td className='boder p-2'>ACTION</td>
            </tr>
          </thead>
        </table>
        <tbody>
          {
            todos.map((todo, index)=>(
            <tr key={todo.id}>
              <td className='boder p-2 text-center'>{index+1}</td>
              <td className='boder p-2'>{todo.todo_name}</td>
              <td className='boder p-2'>{todo.todo_detail}</td>
              <td className='boder p-2 text-center'>
                {
                  todo.todo_complete == true ? 'เสร็จแล้ว' : 'ยังไม่เสร็จ'
                }
              </td>
              <td className='boder p-2 text-center'>
                <Link to={'/updatetodo/'+todo.id}
                      className='text-green-500 hover:text-green-700 mr-3'>
                แก้ไข
                </Link>
                <button onClick={handleDeteClick(todo.id)}
                        className='text-red-500 hover:text-red-700 mr-3
                                    cursor-pointer'>
                  ลบ
                </button>
              </td>
            </tr>
            ))
          }
        </tbody>

      </div>
      <Footer/>
    </div>
  )
}
