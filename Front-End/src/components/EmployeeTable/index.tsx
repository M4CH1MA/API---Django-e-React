import { useNavigate } from "react-router";
import { Employee } from "src/models/Employee";
import { useAuth } from "src/utils/auth";
import { useRequest } from "src/utils/request";
import { Card, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material"
import { DeleteTwoTone, EditTwoTone } from "@mui/icons-material";

type Props = {
    employeeList: Employee[];
    refreshList: () => void;
}

const EmployeeTable = ({employeeList, refreshList}: Props) => {
    const {handlePermissionExists} = useAuth();
    const {deleteEmployee} = useRequest();

    const navigate = useNavigate();
    const handleEditEmployee = (id: number) => {
        navigate(`/employees/edit/${id}`);
    }

    const handleDeleteEmployee = async (id:number) => {
        await deleteEmployee(id);

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
                                        <TableCell>Nome</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell align="right">Acoes</TableCell>
                                    </TableRow>
                                </TableHead>
        
                                <TableBody>
                                    {employeeList.map((employee) => (
                                        <TableRow hover key={employee.id}>
                                            <TableCell>
                                                <Typography fontWeight="bold" gutterBottom>
                                                    #{employee.id}
                                                </Typography>
                                            </TableCell>
        
                                            <TableCell>
                                                <Typography fontWeight="bold" gutterBottom>
                                                    {employee.name}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography fontWeight="bold" gutterBottom>
                                                    {employee.email}
                                                </Typography>
                                            </TableCell>
        
                                            <TableCell align="right">
                                                {handlePermissionExists('change_employee') && 
                                                    <Tooltip title="Editar Funcionario" arrow>
                                                        <IconButton
                                                            color='primary'
                                                            size='small'
                                                        >
                                                            <EditTwoTone onClick={() => handleEditEmployee(employee.id)} />
                                                        </IconButton>
                                                    </Tooltip>
                                                }
        
                                                {handlePermissionExists('delete_employee') &&
                                                    <Tooltip title="Demitir funcionario" arrow>
                                                        <IconButton
                                                            color='error'
                                                            size='small'
                                                        >
                                                            <DeleteTwoTone onClick={() => handleDeleteEmployee(employee.id)} />
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

export default EmployeeTable;