import { useSelector } from "react-redux";
import { useAppSelector } from "./hooks";

export default function useAuth() {
  const { user } = useAppSelector((state) => state.auth);
  if (user) {
    return true;
  } else {
    return false;
  }
}
