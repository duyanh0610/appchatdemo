import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap"
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const Register = () => {
   const {user} =  useContext(AuthContext)
    return (
        <>
            <Form >
                <Row style ={{height:"10vh",justifyContent:"center"}} >
                    <Col xs = {6}>
                        <Stack gap = {3}>
                            <h2> Sign up</h2>
                            <h2>{user.name}</h2>
                            <div>
                                <label htmlFor="username">Username </label>
                                <Form.Control type = "text" placeholder = "username" id ="username"/>
                            </div>
                            <div>
                                <label htmlFor="email">Email </label>
                                <Form.Control type = "text" placeholder = "email" id ="email"/>
                            </div>
                            <div>
                                <label htmlFor="name">Name </label>
                                <Form.Control type = "text" placeholder = "name" id ="name"/>
                            </div>
                            <div>
                                <label htmlFor="password">Password </label>
                                <Form.Control type = "password" placeholder = "password" id ="password"/>
                            </div>
                            <Button type ="submit" variant="success" className="mx-auto" style={{width:"15%"}}>
                                Register
                            </Button>
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </
        >);
}

export default Register;