import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  useGetUserByIDQuery,
  useUpdateUserMutation,
} from "../../slices/userSlice";
import { LinkContainer } from "react-router-bootstrap";

function UserEdit() {
  const { id: userId } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const { data: user, isLoading, error } = useGetUserByIDQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        userId,
        firstName,
        lastName,
        email,
      }).unwrap();
      window.alert("user Update Successful!");
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
    }
  }, [user]);
  return (
    <Row className="justify-content-md-center mt-5">
      <Col md={6}>
        <LinkContainer to="/board/users">
          <Button className="btn-color mb-3" variant="light">
            {" "}
            Back
          </Button>
        </LinkContainer>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error?.data?.message || error.error}</p>
        ) : (
          <div>
            <div className="login-container">
              <h2 className="textColor">Edit Customer</h2>
              <form onSubmit={submitHandler}>
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
                {/* <div className="input-group">
                  <label htmlFor="pass">Enter SSN</label>
                  <input
                    type="text"
                    id="pass"
                    value={ssn}
                    onChange={(e) => setSsn(e.target.value)}
                    required
                  />
                </div> */}
                {/* <div className="input-group">
                  <label htmlFor="password">Confirm Password</label>
                  <input
                    type="password"
                    id="passwordc"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div> */}
                <button type="submit">Edit</button>
                {loadingUpdate && <p>Loading...</p>}
              </form>
            </div>
          </div>
        )}
      </Col>
    </Row>
  );
}
export default UserEdit;
