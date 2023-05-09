import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../Home/slider.css';
import imgSlider1 from '../../images/imgSlider1.jpg';
import imgSlider2 from '../../images/imgSlider2.jpg';
import imgSlider3 from '../../images/imgSlider3.jpeg';
import imgSlider4 from '../../images/imgSlider4.jpg';
import imgSlider5 from '../../images/imgSlider5.jpg';



export default function Slider() {
  return (
<Carousel className='slider'>
      <Carousel.Item  >
        <img
          className="homeImage d-block w-100"
          src={imgSlider5}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>“The more that you read, the more things you will know. The more that you learn, the more places you’ll go.”
           </h3>
          <p>―Dr. Seuss, I Can Read With My Eyes Shut!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item >
        <img
          className="homeImage d-block w-100"
          src={imgSlider1}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3 >“Reality doesn’t always give us the life that we desire, but we can always find what we desire between the pages of books.”</h3>
          <p>―Adelise M. Cullens</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item >
        <img
          className="homeImage d-block w-100"
          src={imgSlider2}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>“A well-read woman is a dangerous creature.”</h3>
          <p>―Lisa Kleypas</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item  >
        <img
          className="homeImage d-block w-100"
          src={imgSlider3}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item  >
        <img
          className="homeImage d-block w-100"
          src={imgSlider4}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>“A reader lives a thousand lives before he dies, said Jojen. The man who never reads lives only one.”</h3>
          <p>―George R.R. Martin</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>  )
}
