import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signup } from "../../models/auth";
import { useAuth } from "../../contexts/AuthContext";

const SignupForm = () => {
  const navigate = useNavigate();
  const authCtx = useAuth();
  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { fullname, email, password } = data;

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      const payload = { fullname, email, password };
      const data = await signup(payload);
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({ fullname: "", email: "", password: "" });
        authCtx.login(data.accessToken);
        toast.success("Signed up successfully!");
        navigate("/dashboard");
      }
    } catch (error: any) {
      if (error.message) {
        toast.error(error.message);
      }
      console.log("Something went wrong!", error);
    }
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="fullname">Fullname</label>
      <input
        id="fullname"
        type="text"
        placeholder="enter fullname"
        value={data.fullname}
        onChange={(e) => setData({ ...data, fullname: e.target.value })}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder="enter email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="enter password"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;
