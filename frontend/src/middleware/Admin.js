import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getAuthUser } from '../healper/Storage';


export default function Admin() {
    const auth =getAuthUser();
  return <>
       {auth && auth.type === 1 ? <Outlet/> : <Navigate to={"/"}/>}
         </>;
};
