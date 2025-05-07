import { Box, Button, Container, Typography } from "@mui/material";
import { ReactNode } from "react"
import { useNavigate } from "react-router";
import { useAuth } from "src/utils/auth";

type Props = {
    children: ReactNode;
    codeName: string
}

export const PermissionMiddleware = ({children, codeName}: Props) => {
    const navigate = useNavigate();

    const {handlePermissionExists} = useAuth();

    const handleRefreshPage = () => {
        navigate(0);
    }

    if(!handlePermissionExists(codeName)){
        return (
            <Container maxWidth='sm' sx={{mt: 16}}>
                <Box textAlign="center">
                    <img alt="status-500" height={260} src="/static/images/status/500.svg"/>

                    <Typography variant="h2" sx={{my: 2}}>
                        Voce nao tem permissao para acessar essa area
                    </Typography>

                    <Typography color='text.secundary' sx={{mb: 4}}>
                        Se voce solicitou para a Administracao para acessar essa area, clique no botao abaixo e atualize a pagina!
                    </Typography>

                    <Button onClick={handleRefreshPage} variant='contained' sx={{ml: 1}}>
                        Atualizar a pagina
                    </Button>
                </Box>
            </Container>
        )
    }

    return (
        <>
            {children}
        </>
    )
}
