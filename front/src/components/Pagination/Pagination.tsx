import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface data {
    itemsPerPage: number;
    totalItems: number;
    paginate: (value: any) => void;
}

export default function PaginationMenu({ itemsPerPage, totalItems, paginate }: data) {

    const [page, setPage] = React.useState(1);
    const pageNumbers = Math.ceil(totalItems / itemsPerPage);

    const handleChange = (event: any, value: any) => {
        setPage(value);
        paginate(value);
    };

    return (
        <Stack spacing={10}>
            <Pagination page={page} onChange={handleChange} count={pageNumbers} color="primary" />
        </Stack>
    );
}