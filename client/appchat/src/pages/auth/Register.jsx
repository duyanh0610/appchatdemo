import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap"
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const Register = () => {

    const {user,registerInfo, registerUser, registerError,isRegisterLoading, updateRegisterInfo } = useContext(AuthContext)
    return (
        <>
            <Form onSubmit={registerUser} >
                <Row style ={{height:"10vh",justifyContent:"center"}} >
                    <Col xs = {6}>
                        <Stack gap = {3}>
                            <h2> Sign up</h2>
                            <div>
                                <label htmlFor="username">Username </label>
                                <Form.Control type = "text" placeholder = "username" id ="username" onChange={(e)=>updateRegisterInfo({...registerInfo,username: e.target.value})}/>
                            </div>
                            <div>
                                <label htmlFor="email">Email </label>
                                <Form.Control type = "text" placeholder = "email" id ="email" onChange={(e)=>updateRegisterInfo({...registerInfo,email: e.target.value})}/>

                            </div>
                            <div>
                                <label htmlFor="name">Name </label>
                                <Form.Control type = "text" placeholder = "name" id ="name" onChange={(e)=>updateRegisterInfo({...registerInfo,name: e.target.value})}/>
                            </div>
                            <div>
                                <label htmlFor="password">Password </label>
                                <Form.Control type = "password" placeholder = "password" id ="password" onChange={(e)=>updateRegisterInfo({...registerInfo,password: e.target.value})}/>
                            </div>
                            <Button type ="submit" variant="success" className="mx-auto" style={{width:"15%"}}>
                                {isRegisterLoading? "Creating":"Register"}
                            
                            </Button>
                            {
                                
                                registerError?.error &&
                                <Alert variant="danger" style = {{height:"50px"}}>
                                    <p>{registerError?.error}</p>
                                </Alert>
                            }
                            
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </
        >);
}

export default Register;