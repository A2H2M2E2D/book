import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getAuthUser } from '../healper/Storage';


export default function Reader() {
    const auth =getAuthUser();
  return <>
       {auth && auth.type === 0 ? <Outlet/> : <Navigate to={"/"}/>}
         </>;
};
