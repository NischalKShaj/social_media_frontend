// <========================== file to create the post for the users =================>

// importing the required modules
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Input,
} from "@mui/material";
import Sidebar from "../sidebar/Sidebar";
import { FormPost } from "../../types/types";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const [formData, setFormData] = useState<FormPost>({
    heading: "",
    description: "",
    image: null,
  });

  const user = useSelector((state: RootState) => state.user.user);
  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/login");
    }
  });

  const navigate = useNavigate();

  // for handling input change
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // for handling image change
  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: file,
      });
    }
  };

  // submitting the form
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const id = user._id;
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/create-post/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        console.log(response.data);
        Swal.fire({
          title: "success",
          text: "Post uploaded successfully",
          icon: "success",
        });
        navigate("/");
      }
    } catch (error: any) {
      Swal.fire({
        title: "error",
        text: "something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to right, #1e293b, #6d28d9, #1e293b)",
          padding: "1em",
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
            padding: "2em 2.5em",
            color: "#ffffff",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -30,
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
            <Typography variant="h5" color="black">
              Create Post
            </Typography>
          </Box>

          {/* Heading input */}
          <TextField
            fullWidth
            margin="normal"
            label="Heading"
            variant="outlined"
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            id="heading"
            placeholder="Enter post heading"
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

          {/* Description Input */}
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            variant="outlined"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            id="description"
            placeholder="Enter post description"
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

          {/* Image Upload */}
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body2" color="textSecondary" mb={1}>
              Upload Image
            </Typography>
            <Input
              type="file"
              name="image"
              onChange={handleImageChange}
              inputProps={{
                accept: "image/*",
              }}
              sx={{
                color: "#fff",
                "& .MuiInputBase-root": {
                  color: "#fff",
                },
              }}
            />
          </Box>

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
              mt: 3,
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#f53c3c",
              },
            }}
          >
            Create Post
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Post;
