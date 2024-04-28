import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearcart } from "../slices/cartSlice";
import { useCreateCounterOrderMutation } from "../slices/ordersApiSlice";
import { toast } from "react-toastify";
function UserDetails() {
  const { userInfo } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [createOrder, { isLoading }] = useCreateCounterOrderMutation();
  const placeorder = async (e) => {
    e.preventDefault();
    try {
      const res = await createOrder({
        token: userInfo.token,
        orderItems: cart.cartItems,
        deliveryAddress: cart.deliveryAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        deliveryPrice: 0,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice - 10,
        firstName,
        lastName,
        email,
      }).unwrap();
      dispatch(clearcart());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data.message);
    }
  };
  return (
    <Row className="justify-content-lg-center mt-5">
      <Col md={8}>
        <div className="login">
          <div className="login-container">
            <h2>Enter Customer Details</h2>
            <form onSubmit={placeorder}>
              <div className="input-group">
                <label htmlFor="firstname">Enter First Name</label>
                <input
                  type="text"
                  id="firstname"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="lastname">Enter Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Enter Email</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit">Continue</button>
              {isLoading && <p>Loading...</p>}
            </form>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default UserDetails;
