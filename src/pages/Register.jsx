/* * 👇
 *This is Register  page
 *Created and styled with Styled Component
 *It is for registeration of new users
 */

// import styled Components
import styled from "styled-components";

// useDispatch to call register reducers
import { useDispatch } from "react-redux";

// imprt responsive design
import { mobile } from "../responsive";

// import react useState
import { useState } from "react";

// import register function from apiCalls
import { register } from "../redux/apiCalls";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-family: "Lexend";
  font-weight: 300;
  color: #555555;
  font-weight: bolder;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  font-family: "Lexend", sans-serif;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
  font-family: "Lexend", sans-serif;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  font-family: "Lexend", sans-serif;
  padding: 15px 20px;
  background-color: #202020;
  color: white;
  cursor: pointer;
`;

// error text shows when sign up fails
const ErrorText = styled.p`
  color: red;
  font-family: "Lexend", sans-serif;
  margin-top: 0;
`;

const Register = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  // handleRegister function that call function by and dispatch email,username, and password
  const handleRegister = (e) => {
    if (username && password && email) {
      e.preventDefault();
      register(dispatch, { email, username, password });
    } else {
      setError(true);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Input
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          {error && <ErrorText>WRONG CREDENTIALS</ErrorText>}
          <Button onClick={handleRegister}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
