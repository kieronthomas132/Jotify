import {Button, User} from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hook.tsx";
import { useLogoutUser } from "../../lib/react-query/queries&Mutations.tsx";
import { logoutUser } from "../../redux/userSlice.tsx";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import PopoverContentComponent from "../notes/popoverContentComponent.tsx";
import Notes from "../notes/notes.tsx";
export interface IModelProps {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

const topBarMenuVariant = {
  initial: {
    rotate: 0,
    y: 0,
  },
  animate: {
    rotate: 45,
    y: 6,
  },
};

const middleBarMenuVariant = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0,
  },
};
const bottomBarMenuVariant = {
  initial: {
    rotate: 0,
    y: 0,
  },
  animate: {
    rotate: -45,
    y: -6,
  },
};
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mutateAsync: logout } = useLogoutUser();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(state => state.user)
  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logoutUser());
      localStorage.removeItem("cookieFallback");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="border-b relative border-b-[#2E2E2E] p-2">
      <div className="flex items-center mx-auto justify-between w-[90%]">
        <div className="flex items-center gap-7">
          {/*{showDivSpans && (*/}
            <span
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className=" flex md:hidden flex-col gap-1 cursor-pointer"
            >
              <motion.div
                className="w-[20px] bg-white h-[2px]"
                variants={topBarMenuVariant}
                initial="initial"
                animate={isMenuOpen ? "animate" : ""}
              />
              <motion.div
                variants={middleBarMenuVariant}
                initial="initial"
                animate={isMenuOpen ? "animate" : ""}
                className="w-[20px] bg-white h-[2px]"
              />
              <motion.div
                className="w-[20px] bg-white h-[2px]"
                variants={bottomBarMenuVariant}
                initial="initial"
                animate={isMenuOpen ? "animate" : ""}
              />
            </span>
           {/*)}*/}

          <h1 className="font-[600] text-[30px]">Jotify</h1>
        </div>
        <div className='flex items-center gap-5'>
          <span className='md:flex hidden'>
          <User name={user.name} description={`@${user.username}`} classNames={{name: "font-[300]", description: "font-[600]"}} avatarProps={{src: user.profilePic}}/>
          </span>
          <Button
            onClick={handleLogout}
            size="sm"
            className="bg-[#37996B] text-[11px] text-[#EDEDED] border border-[#3DCF8E]"
          >
            Logout
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="absolute left-6 top-[70px] z-20 w-[90%] bg-[#2E2E2E] p-2 rounded-lg">
          <div className="mb-6">
            <PopoverContentComponent />
          </div>
          <div className="flex w-full items-center border-b-2  border-[#1C1C1C] justify-between">
            <h1 className=" text-[20px] font-[600]  mb-1">Notes</h1>
          </div>
          <ul>
            <Notes />
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
