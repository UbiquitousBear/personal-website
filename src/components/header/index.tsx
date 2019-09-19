import { Component, h } from 'preact'
import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
} from 'reactstrap'

class Header extends Component {

  public render() {
    return (
      <div>
        <Navbar expand="md">
          <Container>
            <NavbarBrand href="/">Shamil Nunhuck</NavbarBrand>
            <Nav className="ml-auto" navbar={true}>
              {/* <NavItem>
                <NavLink href="/curriculum-vitae" >CV / Resume</NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink href="/blog">Blog</NavLink>
              </NavItem>
            </Nav>
          </Container>
        </Navbar>
      </div>
    )
  }
}

export default Header
