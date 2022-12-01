import { createContext, useEffect, useMemo, useState, useCallback} from "react";
import { useAuth } from "../hooks/useAuth";

export const UserLoggedContext = createContext({} as any);

export const UserLoggedProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {

	const [logged, setLogged] = useState<string | null>()
	const [disconnect, setDisconnect] = useState<boolean>(false)
	const { removeLocalStorage, setToken, timer } = useAuth()

	useEffect(() => {	  
		setLogged(logged)
        if(logged){
            localStorage.setItem('Username', logged)
        }
		console.log(logged, 'logged')
		console.log(disconnect, 'disconnect')

	}, [logged, disconnect])

	const handleDisconnect = useCallback(() => {
		console.log('ENTROU NO handleDisconnect');

		setLogged(null)
		removeLocalStorage()
		setDisconnect(true)
		setToken(null)
		console.log(disconnect, 'disconnect');
	}, [disconnect, removeLocalStorage, setToken])

    useEffect(() => {
        if (performance.navigation.type === performance.navigation.TYPE_RELOAD && disconnect !== true) {
          const userRefreshed = localStorage.getItem('Username')
          if(userRefreshed){
              setLogged(userRefreshed);
          }
        } else {
          console.info( "This page is not reloaded");
        }
  }, [disconnect])

	const userLoggedValue = useMemo(
		() => ({
			logged,
			setLogged,
			handleDisconnect
		}),
		[handleDisconnect, logged]
	);

	return (
		<UserLoggedContext.Provider value={userLoggedValue}>
			{children}
		</UserLoggedContext.Provider>
	);
};
