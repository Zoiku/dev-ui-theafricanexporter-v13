import {
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarQuickFilter,
    GridToolbarFilterButton
} from '@mui/x-data-grid';
import { TextButton as ValidateButton } from "../Material/Button.js";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { SEND_REQUEST, REQUEST_FAILED, REQUEST_SUCCESSFUL } from "../Reducers/Actions";
import AdminService from "../Services/Admin";
import { clearAlerts } from "../Redux/Features/Alert.js"

const handleGroupValidation = (users, dispatch, rootDispatch, setRefreshTable, handleFailedActivate) => {
    dispatch({ type: SEND_REQUEST });
    const adminService = new AdminService();
    try {
        users.map(async (user) => {
            const { errors } = await adminService.approveMerchant(user);
            if (errors.length > 0) {
                dispatch({ type: REQUEST_FAILED });
                handleFailedActivate("Could not process request, please try again", 3000);
            } else {
                dispatch({ type: REQUEST_SUCCESSFUL });
                setRefreshTable(prev => !prev);
                rootDispatch(clearAlerts());
            }
        });
    } catch (error) {
        dispatch({ type: REQUEST_FAILED });
        handleFailedActivate("Could not process request, please try again", 3000);
    }
}

const Toolbar = () => {
    return (
        <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <GridToolbarFilterButton />
                <GridToolbarExport />
            </div>
            <GridToolbarQuickFilter />
        </GridToolbarContainer>
    );
}

const CustomToolBar1 = (users, dispatch, rootDispatch, setRefreshTable, state, handleFailedActivate) => {
    return (
        <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <GridToolbarFilterButton />
                <ValidateButton loading={state.requestState.loading} onClick={() => handleGroupValidation(users, dispatch, rootDispatch, setRefreshTable, handleFailedActivate)} disabled={users?.length < 2 ? true : false} size='small' startIcon={<GroupAddIcon />} variant='text'>Multi-Validate</ValidateButton>
            </div>
            <GridToolbarQuickFilter />
        </GridToolbarContainer>
    );
}

export default Toolbar;
export { CustomToolBar1 }