import { useState } from "react";
import {
  useCreateNewAccount,
  useLoginAccount,
} from "../../lib/react-query/queries&Mutations.tsx";
import useCheckAuth from "../../context/checkAuth.tsx";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);

  const navigate = useNavigate();
  const { mutateAsync: createNewAccount, isPending: isCreatingAccount } = useCreateNewAccount();

  const { mutateAsync: loginAccount } = useLoginAccount();

  const { checkAuth } = useCheckAuth();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !username || !password || !email) {
      throw Error();
    }

    const newAccount = await createNewAccount({
      email,
      password,
      username,
      name,
    });

    if (!newAccount) {
      throw new Error();
    }

    const session = await loginAccount({ email: email, password: password });

    if (!session) {
      throw new Error();
    }
    await checkAuth();

    if (session) {
      navigate("/home/notes");
    }

    return session;
  };

  return (
    <div className="w-full h-[100vh] flex flex-col gap-4 items-center justify-center">
      <h1 className="text-[6vw]">Sign up</h1>
      <form
        className="flex flex-col w-full justify-center items-center gap-4"
        onSubmit={handleSignUp}
      >
        <input
          className="bg-[#2E2E2E] border border-[#3DCF8E] w-[80%] md:w-[30%] p-3 text-sm focus:outline-none rounded-full"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="bg-[#2E2E2E] border border-[#3DCF8E] w-[80%] md:w-[30%] p-3 text-sm focus:outline-none rounded-full"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="bg-[#2E2E2E] border border-[#3DCF8E] w-[80%] md:w-[30%] p-3 text-sm focus:outline-none rounded-full"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative w-[80%] md:w-[30%]">
          <input
            className="bg-[#2E2E2E] border border-[#3DCF8E]  w-full p-3 text-sm focus:outline-none rounded-full"
            type={seePassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute top-[3px] right-2 m-3 cursor-pointer"
            onClick={() => setSeePassword(!seePassword)}
          >
            {seePassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <Button
          type="submit"
          className="bg-[#37996B] w-[260px] text-[14px] text-[#EDEDED] border border-[#3DCF8E]"
        >
          {isCreatingAccount ? "Signing up" : "Sign up"}
        </Button>
      </form>
      <div>
        <span className="items-center justify-center flex flex-col gap-2">
          <a href="/login">
            <Button className="bg-[#2E2E2E] w-[260px] text-[14px] text-[#EDEDED] border border-[#3E3E3E]">
              Already have an account? Login!
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

export default Signup;
