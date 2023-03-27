import Layout from '@/components/Layout'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {signIn, useSession} from 'next-auth/react' ;
import { getError } from '@/utils/error';
import {toast} from 'react-toastify' ;
import { useRouter } from 'next/router';

const loginScreen = () => {
    const {data:session}=useSession() ;
    const router =useRouter() ;
    const {redirect}= router.query; 

    useEffect(()=>{
        if(session?.user){
  router.push(redirect || '/') ; 

        }
    },[router,session,redirect])
    const {handleSubmit, register,formState:{errors}}=useForm() ;
    const submitHandler=async({email,password})=>{
      try{
       const result = await signIn('credentials',{
        redirect:false,
        email,
        password,
       });
        if(result.error){
            toast.error(result.error) ;
        }

      }
      catch(err){
 toast.error(getError(err)) ; 
      }
    }
  return (
   <Layout title="Login">
    <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
        <h1 className='mb-4 text-xl'>Login</h1>
        <div className='mb-4'>
            <label htmlFor='email'>Email</label>
            <input
            {...register('email',{required :'Please enter email', 
        pattern:{
            value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        }
        })}
            type ='email' id='email' name='email' className='w-full' autoFocus />
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
        </div>
        <div className='mb-4'>
            <label htmlFor='password'>Password</label>
            <input
            
            {...register('password',{required :'Please enter password',
            minLength:{
                value:5,
                message:'Password must be at least 5 characters'
            }
        })}
            type ='password' id='password' name='password' className='w-full' autoFocus />

            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
        </div>
        <div className='mb-4'>
            <button className='primary-button' >Login</button>
            </div>
            <div className='mb-4'>
            Don&apos;t have an account? &nbsp;
            <Link href='/register'>Register</Link>
            </div>
    </form>
   </Layout>
  )
}

export default loginScreen
