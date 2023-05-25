import { useState } from 'react';
import { Container, Nav, Navbar, Stack } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom';

const Menu = () => {
    const id = 1;
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    return (
        <>
            <Navbar bg="dark" className="mb-4" >
                <Container>
                    {/* <div className="container-fluid">
                        <div className="navbar-header">
                            <NavLink className="navbar-brand" to="/">Chat App</NavLink>
                        </div>
                        <ul className="nav navbar-collapse">
                            <li className="active"><NavLink className="/homepage" to="/homepage">Homepage</NavLink></li>
                            <li><NavLink className="nav-link" to={`/${id}/profile`}>Profile</NavLink></li>
                            <li><NavLink className="nav-link" to={`/${id}/conversation`}>Conversations</NavLink></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><NavLink className="nav-link" to="/auth/signin"> Sign In</NavLink></li>
                            <li><NavLink className="nav-link" to="/auth/signup"> Sign Up</NavLink></li>

                        </ul>
                    </div> */}
                    <Link to="/" className='link-light text-decoration-none'>
                        <h3>Chat App</h3>
                    </Link>

                    <Nav>
                        {isLoggedIn ? (
                            <h4 className='link-light text-decoration-none'>
                                Welcome, <Link className='text-decoration-none'>username</Link>
                            </h4>
                        ) : (
                            <Stack direction='horizontal' gap={4}>
                                <Link className='link-light text-decoration-none' to='/auth/signin'>
                                    Sign in
                                </Link>
                                <Link className='link-light text-decoration-none' to='/auth/signup'>
                                    Sign up
                                </Link>
                            </Stack>
                        )}
                    </Nav>











                </Container>
            </Navbar>
        </>
    );
}

export default Menu;