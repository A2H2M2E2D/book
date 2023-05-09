import React from 'react';
import Card from 'react-bootstrap/Card';
import '../css/bookCard.css';
import { Link } from 'react-router-dom';
import { getAuthUser } from '../healper/Storage';



export default function BookCard(props) {
  const auth = getAuthUser();



  return (
    <div className='mb-5'>
        <Card style={{ height: '600px ' }}>
      <Card.Img className='card-image' 
                variant="top" 
                src={props.image}
       />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Title>{props.author} </Card.Title>
        <Card.Text>{props.field}</Card.Text>
        <Card.Text>{props.description} </Card.Text>
        <Card.Text>{props.publicationDate}</Card.Text>
  
    
        {auth && (auth.type ===1 || auth.type ===0) && ( 

        <Link className='btn btn-dark w-100' 
              to={'/' +props.id}>
              Read more</Link>

        )} 

        
      </Card.Body>
    </Card>
    </div>
  )
}
