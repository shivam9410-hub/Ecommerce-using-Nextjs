import { Store } from '@/utils/Store'
import { signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' ;
import {Menu} from '@headlessui/react'; 
import DropdownLink from './DropdownLink'
import Cookies from 'js-cookie'
const Layout = ({title ,children}) => {
  const logoutClickHandler=()=>{Cookies.remove('cart') ;
    dispatch({type:'CART_RESET'});
    signOut({callbackUrl:'/login'}) ;


  }

const {status,data:session}=useSession() ;
  const {state,dispatch}=useContext(Store) ;

  const {cart} = state; 
  const [cartItemCount,setCartItemsCount]=useState(0) ;
  useEffect(()=>{ 
    setCartItemsCount(cart.cartItems.length) ;
  },[cart.cartItems])
  return (
    <>
      <Head>
      <title>{title? title+' - Amazona':'Amazona'}</title>
 <meta name="description" content='Ecommerce website'/>
 <link rel="icon" href="/favicon.ico"/>
    </Head>
    <ToastContainer position='bottom-center' limit={1}/>
    <div className="flex min-h-screen flex-col justify-between ">
      <header>
  <nav className='flex  h-12 justify-between shadow-md items-center px-4'>
    <Link href='/'> Amazona</Link>
    <div>
        <Link legacyBehavior href="/cart"><a className='m-2'>Cart{cartItemCount>0 &&(
          <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
        {cartItemCount}
          </span>
        )}</a></Link>
        
          {status==='loading'?('Loading'):session?.user?
          <Menu as="div" className="relative inline-block">
            <Menu.Button  className="text-blue-600">
              {session.user.name}
            </Menu.Button>
            <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg bg-white">
              <Menu.Item>
                <DropdownLink className="dropdown-link" href="/profile">
             Profile
                </DropdownLink>
              </Menu.Item>
              <Menu.Item>
                <DropdownLink className="dropdown-link" href="/order-history">
             Order History
                </DropdownLink>
              </Menu.Item>
              <Menu.Item>
                <a className='dropdown-link' href='#' onClick={logoutClickHandler}>logout</a>
              </Menu.Item>
            </Menu.Items>
          </Menu>
          :(
            <Link legacyBehavior href="/login">
              <a className='p-2'>Login</a></Link>
          )}
    
    </div>
  </nav>
      </header>
   <main className='container m-auto mt-4 px-4'>
 {children}
   </main>
    <footer className='flex justify-center items-center h-10 shadow-inner'>
   footer
    </footer>
    </div>
    </>
  )
}

export default Layout
