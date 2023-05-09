import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import '../css/header.css';
import {MdLogout} from 'react-icons/md';
import {SiBrandfolder} from 'react-icons/si';
import {RiUserSettingsFill} from 'react-icons/ri';
import {RiListSettingsFill} from 'react-icons/ri';
import {BsFillSendPlusFill} from 'react-icons/bs';
import {CgUserList} from 'react-icons/cg';
import {IoMdLogIn} from 'react-icons/io';
import { getAuthUser, removeAuthUser } from '../healper/Storage';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import {RiListSettingsLine} from 'react-icons/ri';
import {FaUserCircle} from 'react-icons/fa';
import {BsSendPlusFill} from 'react-icons/bs';
import {HiOutlineClipboardDocumentList} from 'react-icons/hi2';




export default function Header() {
  const navigate = useNavigate();
  const auth = getAuthUser();
  const Logout = () => {
    removeAuthUser();
    navigate("/");

  };
  return (
    <>
    <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand >
      <Link className='nav-link'  to={"/"} style={{ fontSize: '30px' }} >
        Li<SiBrandfolder />rary</Link> 
      </Navbar.Brand>

      <Nav className="me-auto">         {/* me ==> margin engd & ms ==> margin start */} 
      {/* Admin Routes */}
        
        {auth && auth.type === 1 && (
           <>
           <Link className='nav-link' to={"/manage-readers"}>
           <RiUserSettingsFill size='2rem'/> Manage Reader</Link>

           <Link className='nav-link' to={"/manage-books"}>
           <RiListSettingsFill size='2rem'/> Manage Library</Link>

           <Link className='nav-link' to={"/manage-chapters"}>
           <HiOutlineClipboardDocumentList  size={'2rem'}/> Manage Chapters</Link>

           <Link className='nav-link' to={"/manage-request"}>
           <BsSendPlusFill size='2rem'/> Requests</Link>
            </>
        )}

        

      </Nav>
       

      <Nav className="ms-auto">

        {/* عاملت فايل للريدر ف فولدر ال ميدل وير */}
        {auth && auth.type === 0 && (
          <>
          <Dropdown>
      <Dropdown.Toggle  variant="dark" id="dropdown-basic">
        <RiListSettingsLine size={'26px'} />
      </Dropdown.Toggle>

      <Dropdown.Menu variant="dark">
        <Dropdown.Item >
        <Link className='nav-link' to={"/myProfile"}>
           <FaUserCircle size='2rem'/> Profile</Link>
        </Dropdown.Item>

        <Dropdown.Item >
        <Link className='nav-link' to={"/addRequest"}>
           <BsFillSendPlusFill size='2rem'/> Request</Link>
        </Dropdown.Item>

        {/* <Dropdown.Item >
        <Link className='nav-link' to={"/myHistorySearch"}>
           <BsFillSendPlusFill size='2rem'/> My search</Link>
        </Dropdown.Item> */}

      </Dropdown.Menu>
    </Dropdown>



          </>
         )}


        {/* authentcatied route */}
         {auth && 
         <Link className='nav-link' to={"/"} onClick={Logout}>
         <MdLogout size='24px'/> 
         {/* LogOut */}
         </Link>
       }

        {/* un-authentcatied route */}
         {!auth && <>
             <Link className='nav-link' to={"/login"}>
             <IoMdLogIn size='24px'/>
             Login
             </Link>
             
             <Link className='nav-link' to={"/register"}>
              <CgUserList size='24px'/> Register </Link>
              </>
        }
          

       
             </Nav>
    </Container>
  </Navbar>
  </>
    )
}
