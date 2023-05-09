import React,{useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { getAuthUser } from '../../healper/Storage';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function UpdateChapter() {
  let {id} = useParams();
    const auth = getAuthUser();
    const [chapter, setChapter] =useState({
      loading: false,
      err: [],
      title:'',
      description:'',
      reload:false,
      success: null
  });
  
  const updateChapter = (e) => {
    e.preventDefault();
    setChapter({...chapter, loading:true, err:[]});
    axios.put("http://localhost:3000/book/updatechapter/"+ id, {
      title:chapter.title,
      description:chapter.description,
    } ,{
      headers: {
        token: auth.token ,
      }
    })
    .then((resp) =>{
        setChapter({
        ...chapter,
        loading:false,
        success:'Chapter Updated Successfully !!',
        reload:chapter.reload+1,
       })
    })
    .catch((err) => {
        setChapter({
        ...chapter,
        loading:false,
        success:null,
        err:'Something went wrong , TRY again later !'
      })
    });
  
  };
  
  
  useEffect(() => {
    axios.get("http://localhost:3000/book/showChapterByid/"+ id,{
      headers: {
        token: auth.token ,
      }
    }) 
    .then((resp) =>{
        setChapter({
        ...chapter,
        title: resp.data.title ,
        description: resp.data.description,
       
      }); 
    })
    .catch((err) => {
        setChapter({
        ...chapter,
        loading:false,
        success:null,
        err:'Something went wrong , TRY again later !'
      })
    });
  
  }, [chapter.reload])
  

  return (
    <div className='login-container p-3'>
        
    <h1>Update Chapter</h1>
    
    {chapter.success && (
  <Alert  variant='success' className='p-2'>
    {chapter.success}
  </Alert>
 )}



    <Form onSubmit={updateChapter}>
        {/* Chapter Title */}
      <Form.Group className="mb-3" controlId="formBasicChapterTitle">
        <Form.Label>Chapter Title : </Form.Label>
        <Form.Control type="text" 
                      placeholder="title"
                      value={chapter.title}
                      onChange={(e) => setChapter({ ...chapter, title :e.target.value})}  />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicChapterDescription">
        <Form.Label>Description : </Form.Label>
        <textarea type="text" 
                      placeholder="description"
                      value={chapter.description}
                      onChange={(e) => setChapter({ ...chapter, description :e.target.value})}  
                      rows={5}
        ></textarea>
      </Form.Group>
       
      
      <Button className='btn btn-dark w-100' variant="primary" type="submit">
        Update Chapter
      </Button>
    </Form>
    
    
    </div>  
  )
}
