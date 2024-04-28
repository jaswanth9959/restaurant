import { Navbar, Nav, Container, Image, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaUserAlt, FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

import { useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/userSlice";
import { logout } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
function Header() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header>
      <Navbar
        expand="md"
        bg="dark"
        variant="dark"
        collapseOnSelect
        className="color"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <Image src={Logo} />
              <strong>PizzaHeaven</strong>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingBag /> <strong>Cart</strong>
                  <Badge
                    pill
                    style={{ backgroundColor: "orange", margin: "4px" }}
                    bg="warning"
                  >
                    {cartItems.length}
                  </Badge>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <>
                  {userInfo.role === "user" && (
                    <>
                      <LinkContainer to="/profile">
                        <Nav.Link>
                          <FaUserAlt />{" "}
                          <strong>Hi, {userInfo.firstName}</strong>
                        </Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/myorders">
                        <Nav.Link>
                          <FaShoppingCart /> <strong>Orders</strong>
                        </Nav.Link>
                      </LinkContainer>
                    </>
                  )}
                  {userInfo.role !== "user" && (
                    <>
                      <LinkContainer to="/staffprofile">
                        <Nav.Link>
                          <FaUserAlt />{" "}
                          <strong>Hi, {userInfo.firstName}</strong>
                        </Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/board">
                        <Nav.Link>
                          <strong>Dashboard</strong>
                        </Nav.Link>
                      </LinkContainer>
                    </>
                  )}

                  <Nav.Link onClick={logoutHandler}>
                    <IoLogOut /> <strong>Logout</strong>
                  </Nav.Link>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUserAlt /> <strong>SignIn</strong>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
