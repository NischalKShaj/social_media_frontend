// <========================= file to implement the signup of the user =============>

// importing the required modules
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Link,
  Grid2,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FormSignup } from "../../types/types";
import axios from "axios";
import Swal from "sweetalert2";

const Signup = () => {
  const [formData, setFormData] = useState<FormSignup>({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // for handling the input fields event
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // for passing the data to the backend
  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("url", process.env.REACT_APP_BASE_URL);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/signup`,
        formData
      );

      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "User signed successfully!",
          icon: "success",
        });
      }
      navigate("/login");
    } catch (error: any) {
      if (error.response && error.response.data.errors) {
        const errorMessage = error.response.data.errors.map(
          (err: { msg: string }) => err.msg
        );
        Swal.fire({
          title: "Error!",
          text: errorMessage.join(" "),
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong try after sometime",
          icon: "error",
        });
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #1e293b, #6d28d9, #1e293b)",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          position: "relative",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(25px)",
          border: "2px solid #e4dfdf",
          borderRadius: "15px",
          padding: "7.5em 2.5em 4em",
          color: "#ffffff",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#c6c3c3",
            width: "140px",
            height: "70px",
            borderRadius: "0 0 20px 20px",
          }}
        >
          <Typography variant="h4" color="black">
            Signup
          </Typography>
        </Box>

        {/* Username input */}
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          variant="outlined"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          id="username"
          placeholder="Enter your username"
          required
          sx={{
            "& .MuiInputBase-root": {
              color: "#ffffff",
            },
            "& .MuiInputLabel-root": {
              color: "#ffffff",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ffffff",
              },
              "&:hover fieldset": {
                borderColor: "#c6c3c3",
              },
            },
          }}
        />

        {/* Email Input */}
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          id="email"
          placeholder="Enter your email"
          required
          sx={{
            "& .MuiInputBase-root": {
              color: "#ffffff",
            },
            "& .MuiInputLabel-root": {
              color: "#ffffff",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ffffff",
              },
              "&:hover fieldset": {
                borderColor: "#c6c3c3",
              },
            },
          }}
        />

        {/* Password Input */}
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          id="password"
          placeholder="Enter your password"
          required
          sx={{
            "& .MuiInputBase-root": {
              color: "#ffffff",
            },
            "& .MuiInputLabel-root": {
              color: "#ffffff",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ffffff",
              },
              "&:hover fieldset": {
                borderColor: "#c6c3c3",
              },
            },
          }}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          color="error"
          sx={{
            height: "45px",
            fontSize: "16px",
            fontWeight: "medium",
            borderRadius: "50px",
            textTransform: "uppercase",
            mt: 2,
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: "#f53c3c",
            },
          }}
        >
          Signup
        </Button>

        {/* Sign-up Link */}
        <Grid2 container justifyContent="center" sx={{ pt: 2 }}>
          <Typography variant="body2">
            Already have an account? Continue to
            <Link
              component={RouterLink}
              to="/login"
              sx={{ color: "black", ml: 1 }}
            >
              Login
            </Link>
          </Typography>
        </Grid2>
      </Container>
    </Box>
  );
};

export default Signup;
