// <======================== file to show the homepage ===================>

// importing the required modules
import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import axios from "axios";
import { Post } from "../../types/types";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Alert,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Swal from "sweetalert2";

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/`);
        if (response.status === 202) {
          console.log(response.data);
          setPosts(response.data.posts);
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchData();
  }, []);

  // Handling the opening of the menu
  const handleClick = (event: React.MouseEvent<HTMLElement>, post: Post) => {
    console.log("Selected Post:", post);
    setAnchorEl(event.currentTarget);
    setSelectedPost(post);
  };

  // Handling menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    if (selectedPost) {
      console.log("Editing Post ID:", selectedPost._id); // Debug
      setHeading(selectedPost.heading || "");
      setDescription(selectedPost.description || "");
      setImage(null);
      setOpenModal(true);
    } else {
      console.error("No post selected for editing!");
    }
    handleClose();
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (selectedPost) {
      console.log("Deleting post", selectedPost);
      const token = localStorage.getItem("access_token");
      const id = user._id;
      const postId = selectedPost._id;
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/delete-post/${id}/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setPosts((prevPost) =>
            prevPost.filter((post) => post._id !== postId)
          );
          Swal.fire({
            title: "success",
            text: "post deleted successfully",
            icon: "success",
          });
        }
      } catch (error) {
        console.error("error", error);
        Swal.fire({
          title: "error",
          text: "something went wrong",
          icon: "error",
        });
      }
    }
    handleClose();
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedPost) {
      console.error("No post selected for editing!");
      return;
    }

    console.log("Submitting changes for Post ID:", selectedPost._id);
    try {
      const token = localStorage.getItem("access_token");
      const id = user._id;
      const postId = selectedPost._id;
      const formData = new FormData();
      formData.append("heading", heading);
      formData.append("description", description);
      if (image) formData.append("image", image);

      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/edit-post/${id}/${postId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  heading,
                  description,
                  image: response.data.post.image,
                }
              : post
          )
        );
        Swal.fire({
          title: "Success",
          text: "Post edited successfully",
          icon: "success",
        });
        handleModalClose();
        setSelectedPost(null);
      }
    } catch (error) {
      console.error("error", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
      });
      handleModalClose();
      setSelectedPost(null);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          background: "linear-gradient(to right, #1e293b, #6d28d9, #1e293b)",
          color: "#ffffff",
          padding: 3,
          overflowY: "auto",
        }}
      >
        {posts.length === 0 ? (
          <Alert
            severity="info"
            sx={{
              width: "100%",
              background: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
              fontSize: "1.2rem",
              textAlign: "center",
            }}
          >
            No posts uploaded yet. Be the first to create a post!
          </Alert>
        ) : (
          <Box
            sx={{
              maxWidth: "600px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {posts
              .sort((a, b) => {
                return b._id.localeCompare(a._id);
              })
              .map((post) => (
                <Card
                  key={post._id}
                  sx={{
                    backgroundColor: "#1e293b",
                    color: "#fff",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {/* Post Header */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 2,
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar
                        src={post.user?.profile || "/default-avatar.png"}
                        alt={post.user?.username}
                        sx={{ width: 32, height: 32 }}
                      />
                      <Typography variant="subtitle2">
                        {post.user?.username || "Anonymous"}
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={(e) => handleClick(e, post)}
                      sx={{ color: "white" }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>

                  {/* Post Image */}
                  {post.image && (
                    <CardMedia
                      component="img"
                      sx={{
                        width: "100%",
                        aspectRatio: "1/1",
                        objectFit: "cover",
                      }}
                      image={post.image}
                      alt={post.heading}
                    />
                  )}

                  {/* Post Content */}
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mb: 1 }}
                    >
                      {post.heading || "Untitled Post"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#aaa", whiteSpace: "pre-wrap" }}
                    >
                      {post.description || "No Description Available"}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
          </Box>
        )}

        {/* Menu for Edit/Delete */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              backgroundColor: "#1e293b",
              color: "white",
              "& .MuiMenuItem-root": {
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              },
            },
          }}
        >
          <MenuItem onClick={handleEdit}>
            <EditIcon sx={{ mr: 1 }} />
            Edit Post
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <DeleteIcon sx={{ mr: 1 }} />
            Delete Post
          </MenuItem>
        </Menu>
        <Dialog open={openModal} onClose={handleModalClose}>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <Button
              variant="contained"
              component="label"
              sx={{ marginBottom: 2 }}
            >
              Upload Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </Button>
            {image && <Typography>{image.name}</Typography>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Update Post</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Home;
