import "../Styles/SessionTimeout.css";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { SmallPrimary } from "../Material/Button"
import { useDispatch } from "react-redux";
import { endSession } from "../Redux/Features/Session";
import { useEffect, useRef, useState } from "react";

const SessionTimeout = ({ session }) => {
    const [timeoutReminder, setTimeoutReminder] = useState(false);
    const timeoutRef = useRef(null);
    const rootDispatch = useDispatch();
    const handleLogout = () => {
        rootDispatch(endSession());
    }

    const timeout = () => {
        setTimeoutReminder(false);
        clearInterval(timeoutRef.current);
        timeoutRef.current = null;
        handleLogout();
    }

    useEffect(() => {
        const { isLogged } = session;
        if (isLogged) {
            const { expires } = session.user;
            const expiresIn = new Date((expires * 1000) - (60 * 60));
            if (!timeoutRef.current) {
                timeoutRef.current = setInterval(() => {
                    const current = new Date();
                    const reminder = new Date(new Date(expiresIn) - 1000 * (60 * 5));
                    if (current > expiresIn) {
                        timeout();
                    } else if (current >= reminder) {
                        setTimeoutReminder(true);
                    }
                }, 1000);
            }
        } else {
            setTimeoutReminder(false);
            clearInterval(timeoutRef.current);
            timeoutRef.current = null;
        }
        // eslint-disable-next-line
    }, [session]);

    return (
        <div className={timeoutReminder ? 'SessionTimeoutContainer' : 'hide'}>
            <div className="session-timeout">
                <div><InfoOutlinedIcon className="icons" /></div>
                <div>You will be logged out in 5 minutes, please <span className="highlight-text-color"> re-login</span> to continue.</div>
            </div>
            <div>
                <SmallPrimary onClick={handleLogout}>Logout</SmallPrimary>
            </div>
        </div>
    )
}

export default SessionTimeout;