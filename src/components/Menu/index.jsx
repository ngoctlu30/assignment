import React from 'react';
import { Button } from "antd"

import useRouter from '../../hooks/useRoute';

const Menu = () => {
  const router = useRouter();
  return (
    <div className='mb-6'>
      <Button onClick={() => {
        router.push('/')
      }}>Home</Button>
      <Button onClick={() => {
        router.push('/auth')
      }}>Login</Button>
    </div>
  )
}

export default Menu;