import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import MainButton from './MainButton';
import "./NavHeader.css";



function NavHeader(props) {
  return (
    <Navbar bg="dark" expand="lg" className="navbar navbar-dark bg-dark">
      <Container className='nav-bar'>
        <Navbar.Brand><Link className="nav-link" to="/">Chess Game</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {/* <Nav.Link as={Link} to="/">Choose Game Mode</Nav.Link> */}
          </Nav>
          <div className='log-out'>
            <p>Welcome <span>{props.username}</span></p>
            <MainButton type="button" title="Log Out" onClick={props.logOut} />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavHeader;