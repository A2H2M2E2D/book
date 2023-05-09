import {Navigate, createBrowserRouter} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import App from "./App";
import BookDetails from "./pages/bookDetails/BookDetails";
import ManageBook from "./pages/manage-books/ManageBook";
import AddBook from "./pages/manage-books/AddBook";
import UpdateBook from "./pages/manage-books/UpdateBook";
import ManageReader from "./pages/manage-readers/ManageReader";
import AddReader from "./pages/manage-readers/AddReader";
import UpdateReader from "./pages/manage-readers/UpdateReader";
import ReaderDetails from "./pages/readerDetails/ReaderDetails";
import ManageRequest from "./pages/manage-request/ManageRequest";
import AddRequest from "./pages/manage-request/AddRequest";
import Chapter from "./pages/manage-books/Chapter";
import Guest from "./middleware/Guest";
import Admin from "./middleware/Admin";
import AddChapter from "./pages/manage-books/AddChapter";
import UpdateChapter from "./pages/manage-books/UpdateChapter";
import MyProfile from "./pages/Reader-profile/MyProfile";
import Reader from "./middleware/Reader";


export const routes = createBrowserRouter([
    {
        path:'',
        element:<App />,
        children:[
              {
                path: "/",
                element: <Home/>,
              },
              {
                path: ":id",
                element: <BookDetails/>,
              },
             
              {
                path: "/view/:id",
                element: <ReaderDetails/>,
              },
              // Geust middleware 
              {
                element:<Guest/>,
                children:[
                  {
                    path: "/login",
                    element: <Login/>,
                  },
                  {
                    path: "/register",
                    element: <Register/>,
                  }, 
                ]
              },
                //  Admin middleware for manage READERS
              {
                path: "/manage-readers",
                element:<Admin/>,
                children: [
                  {
                    path:'',
                    element:<ManageReader/>
                  },
                  {
                    path:'add',
                    element:<AddReader/>
                  },
                  {
                    path:':id',
                    element:<UpdateReader/>
                  } 
                ]
            }, 
               //  Admin middleware for manage CHAPTERS
               {
                path: "/manage-chapters",
                element:<Admin/>,
                children: [
                  {
                    path:'',
                    element:<Chapter/>
                  },
                  {
                    path:'addchapter',
                    element:<AddChapter/>
                  },
                  {
                    path:':id',
                    element:<UpdateChapter/>
                  } 
                ]
            },

            {
              path: "/myProfile",  //   
              element: <MyProfile/>,
            },
            
            // Reader middleware 
            {
              element:<Reader/>,
              children:[
                
                {
                  path: "/addRequest",
                  element: <AddRequest/>,
                }, 
               
              ]
            },
            //  Admin middleware 
            {
              path: "/manage-books",
              element:<Admin/>,
              children: [
                { 
                  path:'',
                  element:<ManageBook/>
                },
                {
                  path:'add',
                  element:<AddBook/>
                },
                {
                  path:':id',
                  element:<UpdateBook/>
                },
              ]
          },

             //  Admin middleware 
          {
            path: "/manage-request",
            element:<Admin/>,
            children: [
              {
                path:'',
                element:<ManageRequest/>
              },
              
                           
            ]
        }, 

        ],
    },

    {
        path:'*',
        element:<Navigate to={'/'} />,
    },


    
  ]);