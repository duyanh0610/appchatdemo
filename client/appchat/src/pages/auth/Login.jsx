import { useContext, useState } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap"
import { AuthContext } from "../../contexts/AuthContext";


const Login = () => {
    const {user,loginInfo, loginUser, loginError,isLoginLoading, updateLoginInfo } = useContext(AuthContext)

    return (
        <>
            <Form onSubmit={loginUser} >
                <Row style={{ height: "10vh", justifyContent: "center" }} >
                    <Col xs={6}>
                        <Stack gap={3}>
                            <h2> Sign in</h2>
                            <div>
                                <label htmlFor="username">Username </label>
                                <Form.Control type="text" placeholder="username" id="username" onChange={(e)=> updateLoginInfo({...loginInfo,username: e.target.value})} />
                            </div>
                            <div>
                                <label htmlFor="password">Password </label>
                                <Form.Control type="password" placeholder="password" id="password" onChange={(e)=> updateLoginInfo({...loginInfo,password: e.target.value})} />
                            </div>
                            <Button type ="submit" variant="success" className="mx-auto" style={{width:"15%"}}>
                                {isLoginLoading? "Creating":"Sign in"}
                            </Button>
                            {
                                
                                loginError?.error &&
                                <Alert variant="danger" style = {{height:"50px"}}>
                                    <p>{loginError?.error}</p>
                                </Alert>
                            }
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </>);
}

export default Login;