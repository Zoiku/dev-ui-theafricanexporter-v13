import "../Styles/PageLoadingAnimation.css";
import CircularProgress from '@mui/material/CircularProgress';

const PageLoadingAnimation = () => {
    return (
        <div className="PageLoadingAnimation">
            <div><CircularProgress sx={{ color: "var(--tae-orange)" }} /></div>
        </div>
    )
};

export default PageLoadingAnimation;