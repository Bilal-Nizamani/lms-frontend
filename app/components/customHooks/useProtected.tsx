import useAuth from "./useAuth";
import { redirect } from "next/navigation";

interface Protected {
  children: React.ReactNode;
}
export default function Protected({ children }: Protected) {
  const isAuthenticated = useAuth();
  return isAuthenticated ? children : redirect("/");
}
