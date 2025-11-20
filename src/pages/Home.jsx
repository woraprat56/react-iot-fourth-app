import React from 'react'
import Footer from './../components/Footer'
import Todo from './../assets/todo.png'
import { useState } from  'react'

export default function Home() {
  const [secureCode, setSecureCode] =useState('')
  const handleAccessClick = () =>{
    if((secureCode.trim) == ''){
      alert("ป้อน Secure Code ด้วย")
      return;
    }

    if((secureCode.trim) == 'iotsau'){
      window.location.href = '/showalltodo'
    }else{
      alert("Secure Code ไม่ถูกต้อง");
      return;
    }
  }
  
  return (
    <div>
      <div className='w-8/12 boder boder border-gray-200 shadow-2xl p-10 mask-auto mt-30 rounded'>
      <img src={Todo} alt="Todo" className='w-50 mx-auto' />
        <h1 className='text-3xl text-center font-bold mt-10 text-blue-700'>
          Todo Management V.1.0
        </h1>
        <input type="text" placeholder="Enter secuse code to access web..." 
              className="p-3 mt-8 w-full border rouded"/>
        <button onClick={handleAccessClick}
                className='p-3 mt-5 w-full bg-red-700 hover:bg-red-800
                        text-white rounded cursor-pointer'>
          เข้าสู่ระบบ
        </button>
      </div>

      <Footer/>
    </div>
  )
}
