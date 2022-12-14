import { useContext } from "react";
import { UserLoggedContext } from "../context/userLogged";

export function useUserLogged() {
	return useContext(UserLoggedContext);
}
