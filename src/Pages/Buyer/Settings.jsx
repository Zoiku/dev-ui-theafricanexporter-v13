import "../../Styles/v2/SettingsPage.css";
import { Stack, Box, TextField } from "@mui/material";
import AvatarProfile from "../../Components/AvatarProfile";
import { ProfileSection, ProfileSectionRow } from "../SettingsPageSections";
const Settings = ({ profile }) => {
  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={2}>
        <AvatarProfile
          variant="circular"
          overlap="circular"
          height={180}
          width={180}
          fontSize={70}
          fullName={profile?.user?.firstName}
        />
        <div>
          <div style={{ fontSize: 40, fontWeight: 700 }}>
            {profile?.firstName} {profile?.lastName}
          </div>
          <div>{profile?.email}</div>
        </div>
      </Stack>

      <div className="profile_sections">
        <ProfileSection title="Personal Details">
          <ProfileSectionRow>
            <TextField
              fullWidth
              label="First Name"
              value={profile?.firstName}
              disabled={true}
            />
            <TextField
              fullWidth
              label="Last Name"
              value={profile?.lastName}
              disabled={true}
            />
          </ProfileSectionRow>
          <ProfileSectionRow>
            <TextField
              fullWidth
              label="Email"
              value={profile?.email}
              disabled={true}
            />
          </ProfileSectionRow>
        </ProfileSection>
      </div>
    </Box>
  );
};

export default Settings;
