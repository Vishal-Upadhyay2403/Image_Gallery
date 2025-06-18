import React from 'react';
import {Navbar, Container} from 'react-bootstrap';
import {ReactComponent as Logo} from '../Images/logo.svg';

const NavbarStyle = {
    backgroundColor: '#eeeeee' 
}

const Header = (props)  => {
    return (
        <Navbar style={NavbarStyle} data-bs-theme="light">
            <Container>
              <Logo style={{maxWidth: '12rem', maxHeight: '2rem'}}/>
            </Container>
      </Navbar>
    )
};

export default Header;


