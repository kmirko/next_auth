import Link from 'next/link'
import {useRef} from 'react'


export default function HomePage({events}){

  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const enterEmail = emailRef.current.value;
    const enterPassword = passwordRef.current.value;

    const res = await fetch('/api/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: enterEmail,
        password: enterPassword
      })
    })
    const data = await res.json()
  }

  return(<div>
    <Link href='/auth/auth_form'>Auth</Link>
    <h1>Sajt</h1>
    <form onSubmit={handleSubmit}>
      <input type='email' placeholder='email' ref={emailRef}/>
      <input type='password' placeholder='password' ref={passwordRef}/>
      <button>Save</button>
      {events.map(evt=>(
        <h3 key={evt._id}>{evt.email}</h3>
      ))}
    </form>

  </div>
  )
}

export async function getServerSideProps(){
  const res = await fetch('http://localhost:3000/api/login')
  const data = await res.json()
  const events = data.data;

  return{
    props:{events}
  }
}