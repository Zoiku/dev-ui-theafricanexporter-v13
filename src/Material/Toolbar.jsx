import {
    GridToolbarContainer,
    GridToolbarExport,
} from '@mui/x-data-grid';

const Toolbar = () => {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

export default Toolbar;