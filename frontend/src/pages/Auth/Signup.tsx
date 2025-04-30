import SignupForm from "../../components/Auth/SignupForm";

const Signup = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gray-200 text-gray-900">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
