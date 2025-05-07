import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import EmployeeTable from "src/components/EmployeeTable";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import TaskTable from "src/components/TaskTable";
import { PermissionMiddleware } from "src/middlewares/PermissionMiddleware";
import { Employee } from "src/models/Employee";
import { Task } from "src/models/Task";
import { useRequest } from "src/utils/request";

const Tasks = () => {
    const [requestLoading, setRequestLoading] = useState(true);
    const [taskData, setTaskData] = useState<Task[]>([])

    const {getTasks} = useRequest();

    const handleGetTasks = async () => {
        const response = await getTasks();

        if(!response.detail){
            setTaskData(response.data.tasks);
            setRequestLoading(false);
        }
    }

    useEffect(() => {
        handleGetTasks()
    }, [])

    return (
        <PermissionMiddleware codeName="view_task">
            <Helmet>
                <title>Tarefas</title>
            </Helmet>

            <PageTitleWrapper>
                <PageTitle heading="Tarefas" subHeading="Consulte as tarefas da empresa e execute acoes para cada tarefa" />
            </PageTitleWrapper>

            <Container maxWidth='xl' sx={{
                marginX: requestLoading ? '-10%' : 0,
                transition: 'all .5s'
            }}>
                <TaskTable 
                    tasksList={taskData}
                    refreshList={handleGetTasks}
                />
            </Container>
        </PermissionMiddleware>
    )
}

export default Tasks;

