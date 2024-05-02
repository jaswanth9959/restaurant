import { Card, Row, Col, Badge, Form, ListGroup } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTocart } from "../slices/cartSlice";
import { toast } from "react-toastify";

function MenuItem({ item }) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("Small");
  const [selectedId, setSelectesId] = useState(0);
  const addToCartHandler = (item) => {
    dispatch(addTocart({ ...item, qty, size, selectedId }));
    toast.success("Item is added to cart!");
  };

  const handleChange = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");
    setSize(e.target.value);
    setSelectesId(Number(option));
  };
  // console.log(selectedId);
  return (
    <Card className="text-white" border="warning">
      <Card.Img
        variant="top"
        src={item.image}
        alt="Card image"
        width={350}
        height={350}
      />

      <Card.Body className="textColor">
        <Card.Title>{item.name}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <Col md={3}>Price</Col>
              <Col md={9}>
                <strong>${item.price[selectedId]}</strong>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col md={3}>Description:</Col>
              <Col>{item.description}</Col>
            </Row>
          </ListGroup.Item>
          {item.toppings.length > 0 && (
            <ListGroup.Item>
              <Row>
                <Col md={3}>Toppings:</Col>
                <Col>
                  {item?.toppings?.map((t) => (
                    <Badge className="color mx-1 my-1" key={t}>
                      {t}
                    </Badge>
                  ))}
                </Col>
              </Row>
            </ListGroup.Item>
          )}
          <ListGroup.Item>
            <Row>
              <Col md={3}>Size:</Col>
              <Col>
                <Form.Control
                  as="select"
                  value={size}
                  onChange={(e) => handleChange(e)}
                >
                  {item.options.map((o, id) => (
                    <option key={id} id={Number(id)} value={o}>
                      {o}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row className="align-items-center justify-center">
              <Col md={3}>
                <Card.Text as="div">Qty:</Card.Text>
              </Col>

              <Col>
                <button
                  style={{
                    border: "none",
                  }}
                  onClick={() => setQty((q) => q - 1)}
                >
                  -
                </button>
              </Col>
              <Col>
                <p
                  style={{
                    fontSize: "15px",
                    paddingTop: "5px",
                    marginTop: "5px",
                  }}
                >
                  <strong>{qty}</strong>
                </p>
              </Col>
              <Col>
                <button
                  style={{
                    border: "none",
                  }}
                  onClick={() => setQty((q) => q + 1)}
                >
                  +
                </button>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>
                <button
                  style={{ width: "100%" }}
                  className="btn btn-light my-1 color text-light "
                  onClick={() => addToCartHandler(item)}
                >
                  Add To Cart
                </button>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default MenuItem;
