import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import img1 from '../../img/wcamt.png';
import img2 from '../../img/head.png';
import img3 from '../../img/remote.png';
import img4 from '../../img/mousetc.png';
import './HeroSlide.css';
import Title from '../Title';



function TopCategories() {
  const categories = [
    {
      name: 'Webcam',
      image: img1, // Example image
    },  
    {     
      name: 'Gaming Mouse',
      image: img4, // Example image
    },
    {
      name: 'Headphones',
      image: img2, // Example image
    },
    {
      name: 'Gaming Controllers',
      image: img3, // Example image
    },
  ];

  return (
    <section className="x_main-top-categories py-md-5 py-4">
      <div className="App" style={{ backgroundSize: 'cover', backgroundAttachment: 'fixed',  padding: '50px 0',
   }}>
        <div className="container">
           <Title text="SHOP BY CATEGORIES" theme="dark" align="center" />
          {/* <h2 className="text-center text-white mb-5 xyz_subtitle">SHOP BY CATEGORIES</h2> */}
          <div className="row justify-content-center">
            {categories.map((category, index) => (
              <div key={index} className="col-lg-3 col-md-6 col-sm-10 mb-md-4 mb-2">
                <div className="category-card" >
                  <div className="category-image-container" >
                    <img src={category.image} alt={category.name} className="img-fluid category-image" />
                  </div>
                  <h5 className="category-name">{category.name}</h5>
                  <a href="#" className="shop-now-link">Shop Now <span className="arrow-icon">&#8594;</span></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopCategories;

