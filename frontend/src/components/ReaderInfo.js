import React from 'react';
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import '../css/bookCard.css';
import { Link } from 'react-router-dom';

export default function ReaderInfo(props) {
    return (
        <div>
            <Card >
          {/* <Card.Img className='card-image ' variant="top" src="https://picsum.photos/200/300" /> */}
          <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>{props.email}</Card.Text>
            <Card.Text>{props.phone}</Card.Text>
            <Card.Text>{props.type}</Card.Text>
            <Card.Text>{props.status}</Card.Text>
            {/* <Link className='btn btn-dark w-100' to={'/' +props.id}>show more</Link> */}
          </Card.Body>
        </Card>
        </div>
      )
}
