import {useRef} from 'react'
import {signIn} from 'next-auth/react'
import Link from 'next/link'


export default function AuthPage(){

  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const enterEmail = emailRef.current.value;
    const enterPassword = passwordRef.current.value;

   const result = await signIn('credentials', {
       redirect: false,
       email: enterEmail,
       password: enterPassword
    })
    console.log(result)
  }

  return(<div>
    <Link href='/'>Home Page</Link>
    <h1>Auth Page</h1>
    <form onSubmit={handleSubmit}>
      <input type='email' placeholder='email' ref={emailRef}/>
      <input type='password' placeholder='password' ref={passwordRef}/>
      <button>Save</button>
 
    </form>

  </div>
  )
}
