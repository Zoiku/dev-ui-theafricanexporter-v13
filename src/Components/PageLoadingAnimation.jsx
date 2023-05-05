import "../Styles/PageLoadingAnimation.css";
import CircularProgress from '@mui/material/CircularProgress';

const PageLoadingAnimation = () => {
    return (
        <div className="PageLoadingAnimation">
            <div><CircularProgress size={25} sx={{ color: "var(--tae-orange)" }} /></div>
        </div>
    )
};

export default PageLoadingAnimation;