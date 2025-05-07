import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type Props = {
    selectedStatus: number;
    setSelectedStatus: (status_id:number) => void;

}

const SelectTaskStatus = ({selectedStatus, setSelectedStatus}: Props) => {
    return (
        <FormControl fullWidth>
            <InputLabel>Selecione um status</InputLabel>
            <Select value={selectedStatus} label="Selecione um status" onChange={e => setSelectedStatus(+e.target.value)}>
                <MenuItem value={1}>Nao iniciado</MenuItem>
                <MenuItem value={2}>Em andamento</MenuItem>
                <MenuItem value={3}>Finalizado</MenuItem>
            </Select>
        </FormControl>
    )
}

export default SelectTaskStatus