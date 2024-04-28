import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useStaffprofileMutation } from "../../slices/staffApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../../slices/authSlice";

function StaffProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [ssn, setSsn] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useStaffprofileMutation();

  useEffect(() => {
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    setEmail(userInfo.email);
    setSsn(userInfo.ssn);
  }, [userInfo.email, userInfo.firstName, userInfo.lastName, userInfo.ssn]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          token: userInfo.token,
          staffId: userInfo._id,
          firstName,
          lastName,
          email,
          ssn,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Row className="justify-content-lg-center mt-5">
      <Col md={8}>
        <div className="login">
          <div className="login-container">
            <h2>{userInfo.firstName}'s Profile</h2>
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
                <label htmlFor="email11">Enter SSN</label>
                <input
                  type="text"
                  id="email11"
                  value={ssn}
                  onChange={(e) => setSsn(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Enter Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Confirm Password</label>
                <input
                  type="password"
                  id="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button type="submit">Update Profile</button>
              {isLoading && <p>Loading...</p>}
            </form>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default StaffProfile;
