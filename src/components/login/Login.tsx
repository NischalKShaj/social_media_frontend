// <====================== file for creating the login page ==============>

// importing the required modules
import React, { useEffect, useState } from "react";
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
import { FormLogin } from "../../types/types";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../../store/slice/userSlice";
import { RootState } from "../../store/store";

const Login = () => {
  const [formData, setFormData] = useState<FormLogin>({
    email: "",
    password: "",
  });
  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthorized) {
      navigate("/");
    }
  }, [isAuthorized, navigate]);

  // for changing the input of the form fields
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // for submitting the user data
  const handleSubmit = async (e: React.MouseEvent) => {
    console.log("url", process.env.REACT_APP_BASE_URL);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        formData
      );
      if (response.status === 202) {
        Swal.fire({
          title: "Success",
          text: "User logged in successfully",
          icon: "success",
        });
        const { token, user } = response.data;
        localStorage.setItem("access_token", token);
        console.log("user", user);
        dispatch(
          isLoggedIn({
            username: user.username,
            email: user.email,
            profile: user.profile,
            _id: user._id,
          })
        );
        navigate("/");
      }
    } catch (error: any) {
      if (error.response) {
        Swal.fire({
          title: "error",
          text: error.response.data || "something went wrong",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "error",
          text: "something went wrong try after sometime",
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
            Login
          </Typography>
        </Box>

        {/* Email Input */}
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
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
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
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
          Login
        </Button>

        {/* Sign-up Link */}
        <Grid2 container justifyContent="center" sx={{ pt: 2 }}>
          <Typography variant="body2">
            Don&apos;t have an account?
            <Link
              component={RouterLink}
              to="/signup"
              sx={{ color: "black", ml: 1 }}
            >
              Signup
            </Link>
          </Typography>
        </Grid2>
      </Container>
    </Box>
  );
};

export default Login;
