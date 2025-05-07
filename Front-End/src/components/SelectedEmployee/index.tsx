import { FormControl, InputLabel, Menu, MenuItem, Select } from "@mui/material"
import { useEffect, useState } from "react"
import { Employee } from "src/models/Employee"
import { useRequest } from "src/utils/request"

type Props = {
    selectedEmployee: number | '',
    setSelectedEmployee: (employee_id: number) => void
}

const SelectEmployee = ({selectedEmployee, setSelectedEmployee}: Props) => {
    const [employeesData, setEmployeesData] = useState<Employee[]>([])

    const {getEmployees} = useRequest();

    const handleGetEmployees = async () => {
        const response = await getEmployees();

        if(!response.detail){
            setEmployeesData(response.data.employees)
        }
    }

    useEffect(() => {
        handleGetEmployees();
    }, [])

    return (
        <FormControl fullWidth>
            <InputLabel>Selecione um funcionario</InputLabel>
            <Select value={selectedEmployee} label="Selecione um funcionario" onChange={e => setSelectedEmployee(+e.target.value)}>
                {employeesData.map((item) => (
                    <MenuItem key={item.id} value={item.id}>{item.name} - {item.email}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}