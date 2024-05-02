import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateStaffMutation } from "../../slices/staffApiSlice";
import { LinkContainer } from "react-router-bootstrap";
function StaffAdd() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [ssn, setSsn] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [createStaff, { isLoading, error }] = useCreateStaffMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      window.alert("passwords did not match!");
    } else {
      try {
        await createStaff({
          firstName,
          lastName,
          email,
          role,
          ssn,
          password,
        }).unwrap();
        navigate("/board/staff");
      } catch (err) {
        // toast.error(err?.data?.message || err.error);
        window.alert(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Row className="justify-content-md-center mt-5">
      <Col md={6}>
        <LinkContainer to="/board/staff">
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
              <h2 className="textColor">Add Staff</h2>
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
                <div className="input-group">
                  <label htmlFor="pass">Enter SSN</label>
                  <input
                    type="text"
                    id="pass"
                    value={ssn}
                    onChange={(e) => setSsn(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="role" style={{ marginRight: "20px" }}>
                    {" "}
                    Role
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="staff">Staff</option>
                    <option value="delivery">Delivery</option>
                  </select>
                </div>
                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="passwordc"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="password">Confirm Password</label>
                  <input
                    type="password"
                    id="passwordc"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Add</button>
                {isLoading && <p>Loading...</p>}
              </form>
            </div>
          </div>
        )}
      </Col>
    </Row>
  );
}

export default StaffAdd;
