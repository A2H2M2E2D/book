import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getAuthUser } from '../healper/Storage';


export default function Guest() {
    const auth =getAuthUser();
  return <> 
        
        {!auth ? <Outlet/> : <Navigate to={"/"}/>}
        </>;
};
