import { useAppSelector } from "./hooks";

export default function useAuth() {
  const user = useAppSelector((state) => state.auth.token);
  if (user) {
    return true;
  } else {
    return false;
  }
}
