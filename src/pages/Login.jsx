/* * 👇
 *This is Login Page
 *Created and styled with Styled Component
 */

// import useState Hook from React
import { useState } from "react";

// uselocation to get page lcoation
import { useLocation } from "react-router-dom";

// import styled Components
import styled from "styled-components";

import { mobile } from "../responsive";
// import useNavigate to navigate through pages
import { useNavigate } from "react-router-dom";

// import useDispatch and useSelector
import { useDispatch, useSelector } from "react-redux";

// import login function from apiCalls
import { login } from "../redux/apiCalls";

import { useEffect } from "react";

// import responsive back button
import ResBackButton from "../Components/ResBackButton";

//all components container
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
// components wrapper
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
// login text
const Title = styled.h1`
  font-family: "Lexend", sans-serif;
  font-size: 24px;
  font-weight: bolder;
  color: #555555;
`;
// form for login
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
// input for login
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  font-family: "Lexend", sans-serif;
  &:focus {
    outline: 0.1px solid lightgrey;
  }
`;
// login button
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  font-family: "Lexend", sans-serif;
  background-color: #202020;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;
// link text
const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  font-family: "Lexend", sans-serif;
  text-decoration: underline;
  cursor: pointer;
`;
// error text shows when login fails
const ErrorText = styled.p`
  color: red;
  font-family: "Lexend", sans-serif;
  margin-top: 0;
`;

const Login = () => {
  // disptach to call reducers
  const dispatch = useDispatch();
  //usenavigate to switch pages
  const navigate = useNavigate();
  // login error state
  const loginError = useSelector((state) => state.user.error);
  const isFetching = useSelector((state) => state.user.isFetching);

  // get location to determine category
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // handleLogin function that will execute login function by dispatching username and pasword
  const handleLogin = (e) => {
    // prevent refreshing the page when clicked
    e.preventDefault();
    login(dispatch, { username, password });
  };



  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button onClick={handleLogin}>LOGIN</Button>
          {!isFetching && loginError && (
            <ErrorText>WRONG USERNAME OR PASSWORD</ErrorText>
          )}
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link
            onClick={() => {
              navigate("/register");
            }}
          >
            CREATE A NEW ACCOUNT
          </Link>
        </Form>
      </Wrapper>
      <ResBackButton />
    </Container>
  );
};

export default Login;
