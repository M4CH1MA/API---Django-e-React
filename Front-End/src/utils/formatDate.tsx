export const UseDate = () => {
    const formatDateForApi = (value: string) => {
        const [year, month, day, time] = value.replace('T', '-').split('-');

        return `${day}/${month}/${year} ${time}`;
    }

    const formatAPIdate = (value: string) => {
        const [year, month, day, time] = value.slice(0, -4).replace('T', '-').split('-');

        return `${day}/${month}/${year} ${time}`;
    }

    return {
        formatDateForApi, formatAPIdate
    }
}