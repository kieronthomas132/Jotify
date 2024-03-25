import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { IModelProps } from "../../components/navbar/navbar.tsx";
import { useState } from "react";
import useCheckAuth from "../../context/checkAuth.tsx";
import {
  useCreateNewAccount,
  useLoginAccount,
} from "../../lib/react-query/queries&Mutations.tsx";

const SignUpModal = ({ isOpen, onOpenChange }: IModelProps) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync: createNewAccount } = useCreateNewAccount();

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

    onClose();
    return session;
  };
  const onClose = () => {
    onOpenChange(false);
  };

  return (
    <Modal
      className="bg-[#1C1C1C] text-[#C3C3C3]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSignUp}>
            <ModalHeader className="flex flex-col gap-1">Sign up</ModalHeader>
            <ModalBody>
              <input
                className="bg-[#2E2E2E] p-2.5 text-sm focus:outline-none rounded-full"
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="bg-[#2E2E2E] p-2.5 text-sm focus:outline-none rounded-full"
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="bg-[#2E2E2E] p-2.5 text-sm focus:outline-none rounded-full"
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="bg-[#2E2E2E] p-2.5 text-sm focus:outline-none rounded-full"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                size="sm"
                className="text-[11px] focus:border-none"
                color="danger"
                variant="light"
                onPress={onClose}
              >
                Close
              </Button>
              <Button
                type="submit"
                size="sm"
                className="bg-[#37996B] focus:border-none text-[11px] text-[#EDEDED] border border-[#3DCF8E]"
              >
                Sign up
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SignUpModal;
