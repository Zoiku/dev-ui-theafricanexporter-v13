import {
    GridToolbarContainer,
    GridToolbarExport,
} from '@mui/x-data-grid';
import { TextButton as ValidateButton } from "../Material/Button.js";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { SEND_REQUEST, REQUEST_FAILED, REQUEST_SUCCESSFUL } from "../Reducers/Actions";
import AdminService from "../Services/Admin";
import { clearAlerts } from "../Redux/Features/Alert.js"

const handleGroupValidation = (users, dispatch, rootDispatch, setRefreshTable) => {
    dispatch({ type: SEND_REQUEST });
    const adminService = new AdminService();
    try {
        users.map(async (user) => {
            const { errors } = await adminService.approveMerchant(user);
            if (errors.length > 0) {
                dispatch({ type: REQUEST_FAILED });
            } else {
                dispatch({ type: REQUEST_SUCCESSFUL });
                setRefreshTable(prev => !prev);
                rootDispatch(clearAlerts());
            }
        });
    } catch (error) {
        dispatch({ type: REQUEST_FAILED });
    }
}

const Toolbar = () => {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

const CustomToolBar1 = (users, dispatch, rootDispatch, setRefreshTable, state) => {
    return (
        <GridToolbarContainer>
            <ValidateButton loading={state.requestState.loading} onClick={() => handleGroupValidation(users, dispatch, rootDispatch, setRefreshTable)} disabled={users?.length < 2 ? true : false} size='small' startIcon={<GroupAddIcon />} variant='text'>Group Validate</ValidateButton>
        </GridToolbarContainer>
    );
}

export default Toolbar;
export { CustomToolBar1 }