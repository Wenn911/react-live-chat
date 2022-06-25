import { useContext } from "react";
import { authContext } from "../contexts/index.js";

export const useAuth = () => useContext(authContext);