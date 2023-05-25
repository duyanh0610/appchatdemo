import { useState } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap"


const Login = () => {
    const [username, setUsername] = useState('')
    const [password,setPassword] = useState('')

    async function handleSubmit() {
        const response = await fetch("http://localhost:3001")
    }
    return (
        <>
            <Form >
                <Row style={{ height: "10vh", justifyContent: "center" }} >
                    <Col xs={6}>
                        <Stack gap={3}>
                            <h2> Sign up</h2>
                            <div>
                                <label htmlFor="username">Username </label>
                                <Form.Control type="text" placeholder="username" id="username" onChange={(e)=>{setUsername(e.target.value)}} />
                            </div>
                            <div>
                                <label htmlFor="password">Password </label>
                                <Form.Control type="password" placeholder="password" id="password" onChange={(e)=>{setPassword(e.target.value)}} />
                            </div>
                                <Button type="submit" variant="success" className="mx-auto" style={{ width: "15%",margin:"auto" }}>
                                Sign in
                            </Button>
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </>);
}

export default Login;