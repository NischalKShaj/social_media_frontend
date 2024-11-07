// <============================ files to create the custom types ===============>

// interface for the user signup
export interface FormSignup {
  username: string;
  email: string;
  password: string;
}

// interface for user login
export interface FormLogin {
  email: string;
  password: string;
}

// interface for a user
export interface User {
  username: string;
  email: string;
  _id: string;
  profile: string;
}

// interface for setting the state for the post
export interface Post {
  _id: string;
  heading: string;
  description: string;
  image: string;
  user: {
    username: string;
    profile: string;
  };
}

// interface for passing the post form
export interface FormPost {
  heading: string;
  description: string;
  image: File | null;
}
