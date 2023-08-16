import React, { useState } from 'react';
import { Container, FormControl, TextField, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import styles from "./style.module.css";
import { SectionImage } from "../../components/SectionImage";

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, { username, password })
      .then((response) => {
        console.log(response.data.message); // Display login status (success/failure)
        // Redirect to product-inventory page upon successful login
        if (response.data.message === 'Login successful') {
          navigate('/product-inventory'); // Redirect to the product-inventory page
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <SectionImage
      src="Asset/Login/bg_login.png"
      alt="banner"
      objectPosition="center"
    >
      <Container className={styles.container}>
        <FormControl className={styles.form}>
          <TextField
            type="text"
            size="small"
            label="Username"
            variant="outlined"
            fullWidth
            InputProps={{ style: { background: 'white' }}}
            InputLabelProps={{ style: { fontWeight: 'bold', color: 'black'} }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField 
            type="password"
            size="small"
            label="Password"
            variant="outlined"
            fullWidth
            InputProps={{ style: { background: 'white' }}}
            InputLabelProps={{ style: { fontWeight: 'bold', color: 'Black' }}}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            className={styles.button}
            style={{ alignSelf: "flex-center", paddingInline: "40px" }}
            variant="contained"
            onClick={handleLogin} // Add onClick event handler to call handleLogin
          >
            Masuk
          </Button>
        </FormControl>
      </Container>
    </SectionImage>
  );
};
