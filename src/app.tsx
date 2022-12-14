import React, { useMemo } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PageNotFound } from './components/pages/PageNotFound'
import { useAuth } from './hooks/useAuth'
import { authRoutes, notAuthErrorRoute, notAuthRoutes } from './routes'

const App: React.FC = () => {
    const { token } = useAuth()

    const routes = useMemo(() => {
        if (token) {
          return authRoutes
        } 

        return notAuthRoutes

    }, [token])

    return (
        <BrowserRouter>
            <Routes>
                {
                  routes.map((route, index) =>
                    <Route key={index} path={`/${route.path}`} element={route.element} />
                  )
                }
                <Route path={`*`} element={<PageNotFound />} />

            </Routes>
        </BrowserRouter>
    )
}

export default App
