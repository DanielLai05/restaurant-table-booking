import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav, Tab, Badge } from 'react-bootstrap';

export default function Menu() {
  const [activeKey, setActiveKey] = useState('appetizers');

  const menuData = {
    appetizers: [
      {
        name: 'Beef Carpaccio',
        description: 'Thinly sliced raw beef tenderloin, arugula, parmesan, capers',
        price: '$18',
        featured: true,
        image: 'https://firebasestorage.googleapis.com/v0/b/restaurant-table-booking-a1302.firebasestorage.app/o/menu-images%2FBeef%20Carpaccio.png?alt=media&token=a5ab752e-0cee-4b61-8294-93264323ae73'
      },
      {
        name: 'Shrimp Cocktail',
        description: 'Jumbo shrimp served with cocktail sauce and lemon',
        price: '$16',
        image: 'https://firebasestorage.googleapis.com/v0/b/restaurant-table-booking-a1302.firebasestorage.app/o/menu-images%2FShrimp%20Cocktail.png?alt=media&token=68926abd-b44a-4c43-8f8e-e98cb975c161'
      },
      {
        name: 'Lobster Bisque',
        description: 'Creamy lobster soup with cognac and fresh herbs',
        price: '$14',
        image: 'https://rasamalaysia.com/wp-content/uploads/2020/05/lobster-bisque-thumb.jpg'
      },
      {
        name: 'Oysters Rockefeller',
        description: 'Baked oysters with spinach, herbs, and parmesan',
        price: '$19',
        image: 'https://www.charlottefashionplate.com/wp-content/uploads/2019/03/422838fb-71e1-4854-827a-88fadeb12f47.jpg'
      },
      {
        name: 'Truffle Fries',
        description: 'Hand-cut fries with truffle oil and parmesan',
        price: '$12',
        image: 'https://www.everylastbite.com/wp-content/uploads/2025/03/Trufflefries11-1-scaled.jpg'
      },
      {
        name: 'Caesar Salad',
        description: 'Romaine lettuce, parmesan, croutons, classic dressing',
        price: '$11',
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop'
      }
    ],
    steaks: [
      {
        name: 'Filet Mignon',
        description: '8oz center-cut tenderloin, the most tender cut',
        price: '$52',
        featured: true,
        image: 'https://www.savorynothings.com/wp-content/uploads/2022/02/filet-mignon-recipe-image-sq-1.jpg'
      },
      {
        name: 'Ribeye',
        description: '16oz bone-in ribeye, rich marbling and flavor',
        price: '$58',
        featured: true,
        image: 'https://www.wholesomeyum.com/wp-content/uploads/2024/01/wholesomeyum-Ribeye-Steak-Recipe-6.jpg'
      }
    ],
    mains: [
      {
        name: 'Grilled Salmon',
        description: 'Atlantic salmon with lemon butter sauce and asparagus',
        price: '$34',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop'
      }
    ],
    sides: [
      {
        name: 'Mac & Cheese',
        description: 'Three cheese blend with breadcrumb topping',
        price: '$11',
        image: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?q=80&w=800&auto=format&fit=crop'
      }
    ],
    desserts: [
      {
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with molten center',
        price: '$13',
        image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=800&auto=format&fit=crop'
      }
    ]
  };

  // Helper to handle broken images
  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop';
  };

  return (
    <div className="bg-secondary text-light min-vh-100">
      <Container fluid className="py-5">
        <Container>
          <h1 className="display-3 text-center fw-bold text-warning mb-2">JEROME'S MENU</h1>
          <p className="text-center fs-5 fst-italic mb-4 text-light">Crafted with passion, served with excellence</p>
        </Container>
      </Container>

      <Container className="py-5">
        <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
          <Row>
            <Col lg={12} className="mb-4">
              <Nav variant="pills" className="justify-content-center flex-wrap gap-2">
                {Object.keys(menuData).map((cat) => (
                  <Nav.Item key={cat}>
                    <Nav.Link
                      eventKey={cat}
                      className="px-4 py-2 fw-bold text-capitalize text-warning border border-warning rounded-pill"
                    >
                      {cat}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>

            <Col lg={12}>
              <Tab.Content>
                {Object.keys(menuData).map((category) => (
                  <Tab.Pane key={category} eventKey={category}>
                    <Row className="g-4">
                      {menuData[category].map((item, index) => (
                        <Col key={index} md={6} lg={4}>
                          <Card className="h-100 bg-dark text-light border-0 shadow-lg overflow-hidden">
                            <div style={{ height: '220px', width: '100%', backgroundColor: '#222' }}>
                              <Card.Img
                                variant="top"
                                src={item.image}
                                onError={addDefaultSrc}
                                style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                              />
                            </div>
                            <Card.Body className="d-flex flex-column">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <Card.Title className="fw-bold mb-0 fs-5">{item.name}</Card.Title>
                                {item.featured && (
                                  <Badge bg="warning" text="dark" className="ms-2">Chef's Pick</Badge>
                                )}
                              </div>
                              <Card.Text className="text-muted flex-grow-1 mb-3">
                                {item.description}
                              </Card.Text>
                              <div className="d-flex justify-content-between align-items-center mt-auto">
                                <span className="fs-4 fw-bold text-warning">{item.price}</span>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
}