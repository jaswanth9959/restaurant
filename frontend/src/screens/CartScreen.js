import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { BsTrash3Fill } from "react-icons/bs";
import { toast } from "react-toastify";
import { addTocart, removefromcart } from "../slices/cartSlice";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, itemsPrice } = cart;

  // NOTE: no need for an async function here as we are not awaiting the
  // resolution of a Promise
  const addToCartHandler = (pizza, qty) => {
    dispatch(addTocart({ ...pizza, qty }));
  };

  const sizeHandler = (pizza, e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");
    const selectedId = Number(option);
    dispatch(addTocart({ ...pizza, size: e.target.value, selectedId }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removefromcart(id));
    toast.warning("Item is removed from Cart!");
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/paymentmethod");
  };

  return (
    <Row className="mb-3 ">
      <Link to="/" style={{ color: "#fe5f1e" }}>
        <h2>Menu</h2>
      </Link>
      <Col md={10} className="mx-auto text-center">
        <h1 style={{ marginBottom: "20px" }}>Cart</h1>
        {cartItems.length === 0 ? (
          <div className="my-3 text-center">
            <Image src="images/empty-cart.png" width={600} />
            <h3 className="my-3">
              Your cart is empty{" "}
              <Link to="/" style={{ color: "#fe5f1e" }}>
                Go Back
              </Link>
            </h3>
          </div>
        ) : (
          <>
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item
                  key={item._id}
                  style={{ border: "1px solid orange", marginBottom: "10px" }}
                >
                  <Row className="py-auto d-flex align-items-center justify-content-center">
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={2} className="textColor">
                      {item.name}
                    </Col>
                    <Col md={2}>
                      <strong>${item.price[item.selectedId]}</strong>
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.stock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.size}
                        onChange={(e) => sizeHandler(item, e)}
                      >
                        {item.options.map((o, id) => (
                          <option key={id} id={Number(id)} value={o}>
                            {o}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <BsTrash3Fill />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Row className="mt-3">
              <Col md={8}></Col>
              <Col md={4}>
                <Card border="warning">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h2>
                        Subtotal (
                        {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                        items
                      </h2>
                      <Row>
                        <Col>
                          <h4>
                            <strong>
                              {" "}
                              ${itemsPrice}
                              {/* {cartItems
                                .reduce(
                                  (acc, item) => acc + item.qty * item.price,
                                  0
                                )
                                .toFixed(2)} */}
                            </strong>
                          </h4>
                        </Col>
                        <Col>
                          <Button
                            type="button"
                            className=" btn btn-block color text-light"
                            style={{ border: "none" }}
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                          >
                            Next
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Col>
    </Row>
  );
};

export default CartScreen;
