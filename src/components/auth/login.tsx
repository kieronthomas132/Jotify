import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useLoginAccount } from "../../lib/react-query/queries&Mutations.tsx";
import { useNavigate } from "react-router";
import useCheckAuth from "../../context/checkAuth.tsx";
import { motion } from "framer-motion";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync: loginAccount, isPending: isLoggingInPending } =
    useLoginAccount();
  const [seePassword, setSeePassword] = useState(false);
  const navigate = useNavigate();

  const { checkAuth } = useCheckAuth();

  const errorVariant = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  useEffect(() => {
    setTimeout(() => {
      if (error) {
        setError(null);
      }
    }, 5000);
  }, [error]); // Add dependency array to useEffect

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(email.trim() === "" && password.trim() === "") {
      setError("Please enter a valid email address and password")
      return;
    }

    if (email.trim() === "") {
      setError("Please enter a valid email address");
      return;
    }


    if (password.trim() === "") {
      setError("Please enter a valid password");
      return;
    }

    try {
      const session = await loginAccount({ email, password });

      if (!session) {
        setError("Invalid email or password");
        return;
      }

      setError(null);

      const isLoggedIn = await checkAuth();

      if (isLoggedIn) {
        navigate("/home/notes");
      }

      return session;
    } catch (error) {
      setError("There was an error, please try again");
      console.error("Login error:", error);
    }
  };
  return (
    <div className="w-full h-[100vh] flex flex-col gap-4 items-center justify-center">
      <h1 className="text-[6vw]">Login</h1>
      {error && (
        <motion.span
          variants={errorVariant}
          initial="initial"
          animate="animate"
          className="bg-[#CCCCCC] text-tiny font-[600] text-black p-2 rounded-lg"
        >
          {error}
        </motion.span>
      )}
      <form
          className="flex flex-col w-full justify-center items-center gap-4"
          onSubmit={handleLogin}
      >
        <input
            className="bg-[#2E2E2E] border border-[#3DCF8E] w-[80%] md:w-[30%] p-3 text-sm focus:outline-none rounded-full"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <div className="relative w-[80%] md:w-[30%]">
          <input
              className="bg-[#2E2E2E] border border-[#3DCF8E] w-full p-3 text-sm focus:outline-none rounded-full"
              type={seePassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          <span
              className="absolute top-[3px] right-2 m-3 cursor-pointer"
              onClick={() => setSeePassword(!seePassword)}
          >
          {seePassword ? <FaEye/> : <FaEyeSlash/>}
        </span>
        </div>
        <Button
            type="submit"
            className="bg-[#37996B] focus:border-none w-[260px] text-[14px] text-[#EDEDED] border border-[#3DCF8E]"
        >
          {!isLoggingInPending ? "Login" : "Logging in..."}
        </Button>
      </form>
      <div>
        <span className="items-center justify-center flex flex-col gap-2">
          <a href="/sign-up">
            <Button type='submit' className="bg-[#2E2E2E] focus:border-none w-[260px] text-[14px] text-[#EDEDED] border border-[#3E3E3E]">
              Don't have an account? Sign up here!
            </Button>
          </a>
          <a href="/">
            <Button className="bg-[#2E2E2E] w-[260px] text-[14px] text-[#EDEDED] border border-[#3E3E3E]">
              Back to Homepage
            </Button>
          </a>
        </span>
      </div>
    </div>
  );
};

export default Login;
