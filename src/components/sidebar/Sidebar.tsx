// <======================= file for the sidebar =================>

// importing the required modules
import React from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { isLoggedOut } from "../../store/slice/userSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { username, email, profile } = useSelector(
    (state: RootState) => state.user.user
  );
  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(isLoggedOut());
    Swal.fire({
      title: "success",
      text: "user logged out",
      icon: "success",
    });
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleNewPost = () => {
    navigate("/post");
  };

  return (
    <Box
      sx={{
        width: "250px",
        height: "100vh",
        background: "linear-gradient(to right, #1e293b, #6d28d9, #1e293b)",
        color: "#ffffff",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 4,
          minHeight: "150px",
        }}
      >
        <Avatar
          src={profile || "/default-profile.png"}
          alt={username}
          sx={{ width: 80, height: 80, mb: 2 }}
        />
        <Typography variant="h6">{username}</Typography>
        <Typography variant="body2">{email}</Typography>

        {isAuthorized ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
              mt: 4,
            }}
          >
            <Button
              fullWidth
              variant="contained"
              onClick={handleNewPost}
              color="primary"
              sx={{
                bgcolor: "#f53c3c",
                "&:hover": { bgcolor: "#e33b3b" },
              }}
            >
              Create
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={handleLogout}
              sx={{
                bgcolor: "#f53c3c",
                "&:hover": { bgcolor: "#e33b3b" },
              }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
              mt: 4,
            }}
          >
            <Button
              fullWidth
              variant="contained"
              onClick={handleLogin}
              color="primary"
              sx={{
                bgcolor: "#f53c3c",
                "&:hover": { bgcolor: "#e33b3b" },
              }}
            >
              Login
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
