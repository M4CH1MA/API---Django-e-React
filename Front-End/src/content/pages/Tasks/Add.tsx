import { Button, Container, LinearProgress, Snackbar, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import SelectEmployee from "src/components/SelectEmployee";
import SelectTaskStatus from "src/components/SelectTaskStatus";
import { PermissionMiddleware } from "src/middlewares/PermissionMiddleware";
import { UseDate } from "src/utils/formatDate";
import { useRequest } from "src/utils/request";

const AddTask = () => {
    const [requestLoading, setRequestLoading] = useState(false);
    const [infoMessage, setInfoMessage] = useState('');
    const [titleInput, setTitleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [dateTimeInput, setDateTimeInput] = useState('');
    const [selectedStatus, setSelectedStatus] = useState(1);
    const [selectedEmployee, setSelectedEmployee] = useState<number | ''>('');

    const navigate = useNavigate();
    const {formatDateForApi} = UseDate();
    const {addTask} = useRequest();

    const handleAdd = async () => {
        const [title, description, employee_id, status_id] = [titleInput, descriptionInput, selectedEmployee, selectedStatus];
        const due_date = dateTimeInput ? formatDateForApi(dateTimeInput) : null;

        if(!title || !employee_id){
            setInfoMessage('Prencha todos os campos obrigatorios');
            return;
        }

        setRequestLoading(true);
        const response = await addTask({title, description, due_date, employee_id, status_id});
        setRequestLoading(false);

        if(response.detail){
            setInfoMessage(response.detail);
            return;
        }

        navigate('/tasks')
    }

    return (
        <PermissionMiddleware codeName="add_task">
            <Helmet>
                <title>Adicionar uma tarefa</title>
            </Helmet>

            {requestLoading && <LinearProgress sx={{height: 2}} color="primary" />}

            <PageTitleWrapper>
                <PageTitle heading="Adicionar uma tarefa" subHeading="Adicione uma tarefa e defina titulo, descricao, prazo, funcionario, ..." />
            </PageTitleWrapper>

            <Snackbar 
                open={infoMessage != ''}
                onClose={() => setInfoMessage('')}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                message={infoMessage}
            />

            <Container maxWidth='lg'>
                <Stack maxWidth={700} spacing={3} >
                    <TextField fullWidth label="Titulo* " value={titleInput} onChange={e => setTitleInput(e.target.value)} />
                    <TextField fullWidth label="Descricao " value={descriptionInput} onChange={e => setDescriptionInput(e.target.value)} />
                    <TextField type="datetime-local" fullWidth value={dateTimeInput} onChange={e => setDateTimeInput(e.target.value)} />

                    <SelectEmployee selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee}  />
                    <SelectTaskStatus selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />

                    <Button variant="outlined" sx={{width: 90, mt: 3.5}} onClick={requestLoading ? () => null : handleAdd} disabled={requestLoading}>
                        Adicionar
                    </Button>
                </Stack>
            </Container>
        </PermissionMiddleware>
    )

}

export default AddTask;