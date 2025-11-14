import React from 'react';
import { Container, Row, Col, Button, Card, Carousel, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import products from '../data/products';
import ProductCard from '../components/ProductCard';
import assets from '../data/assets';

function Section({ title, children, className="" }) {
  return (
    <section className={`py-4 ${className}`}>
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 m-0">{title}</h2>
        </div>
        {children}
      </Container>
    </section>
  );
}

function Home() {
  const featured = products.slice(0, 4);
  const bestSellers = products.slice(4, 8);
  const newArrivals = [...products].reverse().slice(0, 8);
  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);

  return (
    <div>
      <section className="text-white">
        <Carousel interval={5000} fade indicators>
          <Carousel.Item>
            <div className="py-5" style={{background:`linear-gradient( rgba(14,42,71,.85), rgba(14,42,71,.85) ), url(${assets.hero}) center/cover no-repeat`}}>
              <Container>
                <Row className="align-items-center" style={{minHeight:360}}>
                  <Col md={8} className="mb-3 mb-md-0">
                    <h1 className="display-6 fw-bold">Tune Up Your Gaming</h1>
                    <p className="lead text-light">Build powerful rigs with trusted parts and fast Canadian shipping.</p>
                    <Button as={Link} to="/shop" size="lg" className="btn-theme">Shop Now</Button>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="py-5" style={{background:`linear-gradient( rgba(20,20,20,.7), rgba(20,20,20,.7) ), url(${assets.banners.wide1}) center/cover no-repeat`}}>
              <Container>
                <Row className="align-items-center" style={{minHeight:360}}>
                  <Col md={8}>
                    <h2 className="display-6 fw-bold">Pro Graphics Cards</h2>
                    <p className="lead">Latest GPUs with great deals this week.</p>
                    <Button as={Link} to="/shop" variant="light">Explore Deals</Button>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="py-5" style={{background:`linear-gradient( rgba(36,15,52,.75), rgba(36,15,52,.75) ), url(${assets.banners.wide2}) center/cover no-repeat`}}>
              <Container>
                <Row className="align-items-center" style={{minHeight:360}}>
                  <Col md={8}>
                    <h2 className="display-6 fw-bold">Upgrade For Less</h2>
                    <p className="lead">Save on storage, memory, and accessories.</p>
                    <Button as={Link} to="/shop" variant="danger">Get Started</Button>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>
        </Carousel>
      </section>

      <Section title="Shop by Category">
        <Row className="g-3">
          {['CPU','GPU','Motherboard','Memory','Storage','PSU','Case','Monitor'].map((c) => (
            <Col xs={6} md={3} key={c}>
              <Card className="h-100 border-0 shadow-sm overflow-hidden">
                <div className="position-relative" style={{height:140, background:`url(${assets.categories[c]}) center/cover`}}>
                  <div className="position-absolute bottom-0 start-0 end-0 p-2 text-white" style={{background:'linear-gradient(to top, rgba(0,0,0,.65), rgba(0,0,0,0))'}}>
                    <div className="fw-semibold">{c}</div>
                    <small className="text-light">Shop now</small>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Section>

      <Section title="Featured Products">
        <Row xs={1} sm={2} md={4} className="g-3">
          {featured.map(p => (
            <Col key={p.id}><ProductCard product={p} /></Col>
          ))}
        </Row>
      </Section>

      <section className="py-4">
        <Container>
          <Row className="g-3">
            <Col md={4}>
              <div className="rounded" style={{background:`url(https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop) center/cover`, height:180}} />
            </Col>
            <Col md={4}>
              <div className="rounded" style={{background:`url(https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=1200&auto=format&fit=crop) center/cover`, height:180}} />
            </Col>
            <Col md={4}>
              <div className="rounded" style={{background:`url(https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1200&auto=format&fit=crop) center/cover`, height:180}} />
            </Col>
          </Row>
        </Container>
      </section>

      <Section title="Best Sellers">
        <Tabs defaultActiveKey="best" className="mb-3">
          <Tab eventKey="best" title="Best Sellers">
            <Row xs={1} sm={2} md={4} className="g-3 mt-0">
              {bestSellers.map(p => (
                <Col key={p.id}><ProductCard product={p} /></Col>
              ))}
            </Row>
          </Tab>
          <Tab eventKey="new" title="New Arrivals">
            <Row xs={1} sm={2} md={4} className="g-3 mt-3">
              {newArrivals.map(p => (
                <Col key={p.id}><ProductCard product={p} /></Col>
              ))}
            </Row>
          </Tab>
          <Tab eventKey="top" title="Top Rated">
            <Row xs={1} sm={2} md={4} className="g-3 mt-3">
              {topRated.map(p => (
                <Col key={p.id}><ProductCard product={p} /></Col>
              ))}
            </Row>
          </Tab>
        </Tabs>
      </Section>

      <Section title="Top Brands" className="bg-light">
        <Row className="g-3 text-center">
          {assets.brands.map((src, idx) => (
            <Col key={idx} md={2} sm={4} xs={6}>
              <div className="p-3 border rounded bg-white d-flex align-items-center justify-content-center" style={{height:72}}>
                <img alt="brand" src={src} style={{maxHeight:40, maxWidth:'100%', objectFit:'contain'}} />
              </div>
            </Col>
          ))}
        </Row>
      </Section>

      <section className="py-5" style={{background:'linear-gradient(90deg, #0f172a, #1e293b)'}}>
        <Container>
          <Row className="align-items-center g-4 text-white">
            <Col md={6}>
              <h2 className="display-6 fw-bold">Get Special Price Up To 70% Off</h2>
              <p className="lead text-light">Limited time offers on peripherals, headsets and controllers.</p>
              <Button as={Link} to="/shop" variant="danger" size="lg">Grab the Deal</Button>
            </Col>
            <Col md={6}>
              <img alt="promo" src="https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1200&auto=format&fit=crop" className="img-fluid rounded shadow" />
            </Col>
          </Row>
        </Container>
      </section>

      <Section title="Popular Products">
        <Row xs={1} sm={2} md={4} className="g-3">
          {products.slice(0,8).map(p => (
            <Col key={p.id}><ProductCard product={p} /></Col>
          ))}
        </Row>
      </Section>

      <Section title="Why Shop With Us" className="bg-light">
        <Row className="g-3 text-center">
          {[{t:'Fast Shipping',s:'Across Canada'},{t:'24/7 Support',s:'We are here to help'},{t:'Secure Payments',s:'Trusted checkouts'},{t:'Easy Returns',s:'Hassle-free'}].map((it,idx)=> (
            <Col md={3} sm={6} xs={6} key={idx}>
              <Card className="h-100 border-0">
                <Card.Body>
                  <div className="h4">★</div>
                  <div className="fw-semibold">{it.t}</div>
                  <div className="text-muted small">{it.s}</div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Section>

      <Section title="What Customers Say">
        <Row className="g-3">
          {[{q:'Great parts and quick delivery!',a:'Alex'},{q:'Prices are solid and checkout was easy.',a:'Maya'},{q:'My go-to shop for PC builds.',a:'Jordan'}].map((t, i) => (
            <Col md={4} key={i}>
              <Card className="h-100">
                <Card.Body>
                  <p className="mb-2">{t.q}</p>
                  <div className="text-muted">— {t.a}</div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Section>

      <Section title="Stay Updated" className="bg-light">
        <div className="d-flex flex-column flex-md-row gap-2">
          <input className="form-control" placeholder="Email address" />
          <Button className="btn-theme">Subscribe</Button>
        </div>
      </Section>
    </div>
  );
}

export default Home;