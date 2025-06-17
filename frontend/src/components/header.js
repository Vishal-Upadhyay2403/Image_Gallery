import React from 'react';
import {Navbar, Container} from 'react-bootstrap';

const NavbarStyle = {
    backgroundColor: 'lightblue' 
}

const Header = (props)  => {
    return (
        <Navbar style={NavbarStyle} data-bs-theme="light">
            <Container>
              <Navbar.Brand href="/">{props.title}</Navbar.Brand>
            </Container>
      </Navbar>
    )
};

export default Header;


