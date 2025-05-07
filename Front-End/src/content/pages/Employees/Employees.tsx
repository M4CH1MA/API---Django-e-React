import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import EmployeeTable from "src/components/EmployeeTable";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { PermissionMiddleware } from "src/middlewares/PermissionMiddleware";
import { Employee } from "src/models/Employee";
import { useRequest } from "src/utils/request";

const Employees = () => {
    const [requestLoading, setRequestLoading] = useState(true);
    const [employeeData, setEmployeeData] = useState<Employee[]>([])

    const {getEmployees} = useRequest();

    const handleGetEmployees = async () => {
        const response = await getEmployees();

        setEmployeeData(response.data.employees);
        setRequestLoading(false);
    }

    useEffect(() => {
        handleGetEmployees()
    }, [])

    return (
        <PermissionMiddleware codeName="view_employee">
            <Helmet>
                <title>Funcionarios</title>
            </Helmet>

            <PageTitleWrapper>
                <PageTitle heading="Funcionarios" subHeading="Consulte os funcionarios da empresa e execute acoes em cada funcionarios" />
            </PageTitleWrapper>

            <Container maxWidth='xl' sx={{
                marginX: requestLoading ? '-10%' : 0,
                transition: 'all .5s'
            }}>
                <EmployeeTable 
                    employeeList={employeeData}
                    refreshList={handleGetEmployees}
                />
            </Container>
        </PermissionMiddleware>
    )
}

export default Employees;

