import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../models/auth";
import { useAuth } from "../../contexts/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const authCtx = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = data;

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const payload = { email, password };
      const data = await login(payload);
      authCtx.login(data.accessToken);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Logged in successfully!");
        navigate("/");
      }
    } catch (error) {
      console.log("Something went wrong!", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <form onSubmit={formSubmit}>
      <label>Email</label>
      <input
        type="email"
        placeholder="enter email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <label>Password</label>
      <input
        type="password"
        placeholder="enter password"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
