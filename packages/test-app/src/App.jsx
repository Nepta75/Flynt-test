import React from "react";
import { Container } from "react-bootstrap";
import { useRoutes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { routes } from './routes';
import loadable from '@loadable/component'

export const App = () => {

    const mapRoutesForUse = (routes) => {
        return routes.map(({ path, componentName, children }) => {
            const Component = loadable(() => import(`./pages/${componentName}`), {
                resolveComponent: components => components[componentName],
            });
            return {
                path,
                element: <Container key={path}><Component /></Container>,
                children: children && mapRoutesForUse(children)
            };
        });
    };
    const ProjectRoutes = () => useRoutes(mapRoutesForUse(routes));

    return (
        <>
            <Navbar />
            <ProjectRoutes />
        </>
    )
}


