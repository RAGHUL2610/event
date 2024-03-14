import React from 'react';
import StaffLayout from './StaffLayout';
import { Outlet } from 'react-router-dom';
export default function SHome() {
  return (
    <div>
      <StaffLayout/>
      <Outlet/>
    </div>
  )
}
