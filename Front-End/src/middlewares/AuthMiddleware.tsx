import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "src/utils/auth";

type Props = {
    children: ReactNode
}

export const AuthMiddleware = ({children}: Props) => {
    const {isLogged} = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogged) navigate('/signin')
    }, [])

    return (
        <>
            {children}
        </>
    );
}