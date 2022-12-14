import { createContext, useEffect, useMemo, useState } from "react";
import { useUserLogged } from "../hooks/useUserLogged";
import api from "../services/api";
import { IRefreshToken } from "../Types/RefreshTokenTypes";

export const AuthContext = createContext({} as any);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {

	const [token, setToken] = useState<string>()
	
	const [refreshToken, setRefreshToken] = useState<IRefreshToken>()
	const { logged, disconnect } = useUserLogged()

	useEffect(() => {	  
		setToken(token)
		console.log(token, 'token')
		console.log(refreshToken, 'refreshToken')

	}, [refreshToken, token])
	
	useEffect(() => {
		  if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
			console.log('Reloaded')
			const tokenRefreshed = localStorage.getItem('Refresh Token')
			if(tokenRefreshed){
				setToken(tokenRefreshed);
			}
		  }
	}, [])

	const removeLocalStorage = () => {
		console.log('ENTROU NO removeLocalStorage');
		localStorage.setItem('Refresh Token', '');
	}
	
	useEffect(() => {
			const timer = setTimeout(() => {
				if(token){
					console.log('ENTROU NO TIMEOUT');
					api
						.post("/refresh-token", { refreshToken: refreshToken?.id })
						.then((response: any) => {
							setToken((prevState: any) => (response.data.token)); 
							localStorage.setItem('Refresh Token', response.data.token);
						})
						.catch((err: any) => {
							console.error("ops! ocorreu um erro" + err);
						}); 
									
					return;   			
				}
				clearTimeout(timer);
			}, 2000000)
		
	}, [disconnect, logged, refreshToken?.expiresIn, refreshToken?.id, token])

	const authProviderValue = useMemo(
		() => ({
			token,
			setToken,
			refreshToken,
			setRefreshToken,
			removeLocalStorage
		}),
		[refreshToken, token]
	);

	return (
		<AuthContext.Provider value={authProviderValue}>
			{children}
		</AuthContext.Provider>
	);
};
