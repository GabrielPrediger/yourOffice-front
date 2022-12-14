import { useContext } from "react";
import { UserPermitionContext } from "../context/userPermition";

export function useUserPermition() {
	return useContext(UserPermitionContext);
}
