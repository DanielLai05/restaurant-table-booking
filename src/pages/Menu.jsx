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
        featured: true
      },
      {
        name: 'Shrimp Cocktail',
        description: 'Jumbo shrimp served with cocktail sauce and lemon',
        price: '$16'
      },
      {
        name: 'Lobster Bisque',
        description: 'Creamy lobster soup with cognac and fresh herbs',
        price: '$14'
      },
      {
        name: 'Oysters Rockefeller',
        description: 'Baked oysters with spinach, herbs, and parmesan',
        price: '$19'
      },
      {
        name: 'Truffle Fries',
        description: 'Hand-cut fries with truffle oil and parmesan',
        price: '$12'
      },
      {
        name: 'Caesar Salad',
        description: 'Romaine lettuce, parmesan, croutons, classic dressing',
        price: '$11'
      }
    ],
    steaks: [
      {
        name: 'Filet Mignon',
        description: '8oz center-cut tenderloin, the most tender cut',
        price: '$52',
        featured: true
      },
      {
        name: 'Ribeye',
        description: '16oz bone-in ribeye, rich marbling and flavor',
        price: '$58',
        featured: true
      },
      {
        name: 'New York Strip',
        description: '14oz strip loin, perfectly balanced flavor',
        price: '$48'
      },
      {
        name: 'Porterhouse',
        description: '24oz T-bone with both strip and tenderloin',
        price: '$68'
      },
      {
        name: 'Tomahawk Ribeye',
        description: '32oz bone-in ribeye, serves 2-3 people',
        price: '$95'
      },
      {
        name: 'Wagyu Filet',
        description: '6oz Japanese A5 wagyu, ultimate luxury',
        price: '$125'
      }
    ],
    mains: [
      {
        name: 'Grilled Salmon',
        description: 'Atlantic salmon with lemon butter sauce and asparagus',
        price: '$34'
      },
      {
        name: 'Lamb Chops',
        description: 'New Zealand lamb chops with mint chimichurri',
        price: '$42',
        featured: true
      },
      {
        name: 'Lobster Tail',
        description: '10oz cold water lobster tail with drawn butter',
        price: '$48'
      },
      {
        name: 'Chicken Marsala',
        description: 'Pan-seared chicken breast with mushroom marsala sauce',
        price: '$28'
      },
      {
        name: 'Seafood Platter',
        description: 'Lobster, shrimp, scallops, and mussels',
        price: '$56'
      }
    ],
    sides: [
      {
        name: 'Creamed Spinach',
        description: 'Fresh spinach in a rich cream sauce',
        price: '$9'
      },
      {
        name: 'Loaded Baked Potato',
        description: 'With butter, sour cream, bacon, and chives',
        price: '$8'
      },
      {
        name: 'Grilled Asparagus',
        description: 'Fresh asparagus with hollandaise sauce',
        price: '$10'
      },
      {
        name: 'Mac & Cheese',
        description: 'Three cheese blend with breadcrumb topping',
        price: '$11'
      },
      {
        name: 'Sautéed Mushrooms',
        description: 'Wild mushroom medley with garlic and thyme',
        price: '$9'
      },
      {
        name: 'Brussels Sprouts',
        description: 'Roasted with bacon and balsamic glaze',
        price: '$10'
      }
    ],
    desserts: [
      {
        name: 'New York Cheesecake',
        description: 'Classic cheesecake with berry compote',
        price: '$12',
        featured: true
      },
      {
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with molten center and vanilla ice cream',
        price: '$13'
      },
      {
        name: 'Crème Brûlée',
        description: 'Vanilla custard with caramelized sugar',
        price: '$11'
      },
      {
        name: 'Tiramisu',
        description: 'Classic Italian dessert with espresso and mascarpone',
        price: '$12'
      },
      {
        name: 'Key Lime Pie',
        description: 'Tart and creamy with graham cracker crust',
        price: '$10'
      }
    ]
  };

  return (
    <div className="bg-secondary text-light min-vh-100">
      <Container fluid className=" py-5">
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
                <Nav.Item>
                  <Nav.Link eventKey="appetizers" className="px-4 py-2 fw-bold">
                    Appetizers
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="steaks" className="px-4 py-2 fw-bold">
                    Steaks
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="mains" className="px-4 py-2 fw-bold">
                    Main Courses
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="sides" className="px-4 py-2 fw-bold">
                    Sides
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="desserts" className="px-4 py-2 fw-bold">
                    Desserts
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>

            <Col lg={12}>
              <Tab.Content>
                {Object.keys(menuData).map((category) => (
                  <Tab.Pane key={category} eventKey={category}>
                    <Row className="g-4">
                      {menuData[category].map((item, index) => (
                        <Col key={index} md={6} lg={4}>
                          <Card className="h-100 bg-dark text-light border-0 shadow-lg">
                            <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                              <span className="text-muted fs-5">Image</span>
                            </div>
                            <Card.Body className="d-flex flex-column">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <Card.Title className="fw-bold mb-0 fs-5">
                                  {item.name}
                                </Card.Title>
                                {item.featured && (
                                  <Badge bg="warning" text="dark" className="ms-2">
                                    Chef's Pick
                                  </Badge>
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