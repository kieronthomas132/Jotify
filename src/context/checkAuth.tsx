import { getCurrentAccount } from "../lib/appwrite/api.tsx";
import { useDispatch } from "react-redux";
import {setUser } from '../redux/userSlice.tsx';

const CheckAuth = () => {
  const dispatch = useDispatch();
  const checkAuth = async () => {
    try {
      const currentAccount = await getCurrentAccount();
      if (currentAccount) {
        dispatch(
          setUser({
            id: currentAccount.$id,
            name: currentAccount.name,
            username: currentAccount.username,
            email: currentAccount.email,
            profilePic: currentAccount.profilePic,
          }),
        );
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
    }
  };
  return { checkAuth };
};

export default CheckAuth;
