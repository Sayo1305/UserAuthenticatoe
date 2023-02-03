import React from 'react'
import { Link} from 'react-router-dom';
const Home = () => {
  return (
    <div>
      <div className='SignIn'>User Authentication </div>
      <div className='HomeBox'>
            <Link className='UserBox Home' to ={'/Login'}>Login</Link>
            <Link className='UserBox Home' to={'/Register'}> Register </Link>
      </div>
    </div>
  )
}

export default Home