import { createContext, useMemo, useState, useEffect} from "react";
import { useAuth } from "../hooks/useAuth";
import { useUserLogged } from "../hooks/useUserLogged";
import api from "../services/api";
import { ICreateUser } from "../Types/CrudTypes";

export const UserPermitionContext = createContext({} as any);

export const UserPermitionProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {

	const { token } = useAuth()
    const { logged } = useUserLogged()

    const [ user, setUser] = useState<ICreateUser[]>([]);
    const [ userLogado, setUserLogado] = useState<any[]>([]);


	
	useEffect(() => {
		api
		.get("/get-user-asc", {headers: {
			Authorization: `Bearer ${token}`
		}})
		.then((response: any) => setUser(response.data))
		.catch((err: any) => {
		console.error("ops! ocorreu um erro" + err);
		});

	}, [])

	useEffect(() => {
		if(logged) setUserLogado(userLogadoInformacao)
	}, [logged])
	
	console.log(logged, 'logged')
	const usuarioLogadoInfos = user.filter((user: any) => user.usuario === logged)
		
	const userLogadoInformacao = usuarioLogadoInfos.map((infos: any) => infos.permissao)
	console.log('userLogado', userLogado)


	const userPermitionValue = useMemo(
		() => ({
			userLogado
		}),
		[userLogado]
	);

	return (
		<UserPermitionContext.Provider value={userPermitionValue}>
			{children}
		</UserPermitionContext.Provider>
	);
};
