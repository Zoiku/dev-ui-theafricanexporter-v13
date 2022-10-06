import "../../Styles/Settings.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import { StyledBadge } from "../../Material/Avatar";
import { useSelector } from "react-redux";

const Settings = () => {
    const { profile } = useSelector(state => state.session.user);
    return (
        <div className="Settings-Page">
            <div className="user-profile-container">
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar className="user-avatar" alt={profile.firstName} src="/" />
                </StyledBadge>
                <div className="user-short-desc-container">
                    <div>{profile.firstName} {profile.lastName}</div>
                    <div>{profile.email}</div>
                </div>
            </div>

            <div className="user-profile-sections-container">
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { width: '100%', margin: "50px 0" },
                    }}
                    autoComplete="off"
                >

                    <section>
                        <div className="user-profile-section-title">Personal Details</div>
                        <div className="form-controller-input-duo form-controller">
                            <TextField disabled value={profile.firstName} fullWidth label="First Name" variant="outlined" />
                            <TextField disabled value={profile.lastName} fullWidth label="Last Name" variant="outlined" />
                        </div>
                        <div className="form-controller-input form-controller">
                            <TextField disabled value={profile.email} fullWidth label="Email" variant="outlined" />
                        </div>
                    </section>
                </Box>
            </div>
        </div>
    )
}

export default Settings;