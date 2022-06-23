import { useContext } from "react";
import { authContext } from "../contexts";

export const useAuth = () => useContext(authContext);