import { APP_NAME } from "@/config/constants";
import SignupForm from "../../components/Auth/SignupForm";
import { sliceString } from "@/util/strings";

const Signup = () => {
  const { firstHalf, secondHalf } = sliceString(APP_NAME.toUpperCase());

  return (
    <div className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gray-200 text-gray-900 gap-5">
      <div className="flex items-center">
        <span className="font-bold text-xl ">
          <span>{firstHalf}</span>
          <span className="text-primary">{secondHalf}</span>
        </span>
      </div>
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
