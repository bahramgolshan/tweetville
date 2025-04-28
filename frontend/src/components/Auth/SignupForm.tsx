import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signup } from "../../models/auth";

const SignupForm = () => {
  const navigate = useNavigate();
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

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      const payload = { email, password };
      const data = await signup(payload);

      if (data.error) {
        toast.error(data.error);
      } else {
        setData({ email: "", password: "" });
        toast.success("Signed up successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Something went wrong!", error);
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

export default SignupForm;
