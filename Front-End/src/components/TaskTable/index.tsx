import { useNavigate } from "react-router";
import { useAuth } from "src/utils/auth";
import { useRequest } from "src/utils/request";
import { Card, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material"
import { DeleteTwoTone, EditTwoTone } from "@mui/icons-material";
import { Task } from "src/models/Task";
import { UseDate } from "src/utils/formatDate";

type Props = {
    tasksList: Task[];
    refreshList: () => void;
}

const TaskTable = ({tasksList, refreshList}: Props) => {
    const {handlePermissionExists} = useAuth();
    const {deleteTask} = useRequest();
    const {formatAPIdate} = UseDate();

    const navigate = useNavigate();
    const handleEditTask = (id: number) => {
        navigate(`/tasks/edit/${id}`);
    }

    const handleDeleteTask = async (id:number) => {
        await deleteTask(id);

        refreshList();
    }


    return (
        <Container maxWidth='lg'>
                    <Card>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Titulo</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Prazo</TableCell>
                                        <TableCell align="right">Acoes</TableCell>
                                    </TableRow>
                                </TableHead>
        
                                <TableBody>
                                    {tasksList.map((task) => (
                                        <TableRow hover key={task.id}>
                                            <TableCell>
                                                <Typography fontWeight="bold" gutterBottom>
                                                    #{task.id}
                                                </Typography>
                                            </TableCell>
        
                                            <TableCell>
                                                <Typography fontWeight="bold" gutterBottom>
                                                    {task.title}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography fontWeight="bold" gutterBottom>
                                                    {task.status}
                                                </Typography>
                                            </TableCell>
        

                                            <TableCell>
                                                <Typography fontWeight="bold" gutterBottom>
                                                    {task.due_date ? formatAPIdate(task.due_date) : 'Sem prazo'}
                                                </Typography>
                                            </TableCell>

                                            <TableCell align="right">
                                                {handlePermissionExists('change_task') && 
                                                    <Tooltip title="Editar Tarefa" arrow>
                                                        <IconButton
                                                            color='primary'
                                                            size='small'
                                                        >
                                                            <EditTwoTone onClick={() => handleEditTask(task.id)} />
                                                        </IconButton>
                                                    </Tooltip>
                                                }
        
                                                {handlePermissionExists('delete_task') &&
                                                    <Tooltip title="Excluir uma tarefa" arrow>
                                                        <IconButton
                                                            color='error'
                                                            size='small'
                                                        >
                                                            <DeleteTwoTone onClick={() => handleDeleteTask(task.id)} />
                                                        </IconButton>
                                                </Tooltip>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Container>
    )
}

export default TaskTable;