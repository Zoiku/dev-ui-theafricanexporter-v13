import "../Styles/Tutorial.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { inWebTut } from "../Styles/Modal";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectFade } from "swiper";
import getStarted from "../Assets/Allura - Feedback Session.svg";
import AuthService from "../Services/Auth";
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';

const Tutorial = ({ openDrawer, role, user }) => {
    const [loading, setLoading] = useState(false);
    const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);
    const tutorialType = {
        MERCHANT: <iframe className="tutorialEmbededContainer" title="tutorial" src="https://pitch.com/embed/45f1c9b9-0b1d-4d10-a6b5-7c8162b868e8" allow="fullscreen" allowFullScreen={true} style={{ border: 0 }}></iframe>,
        BUYER: <iframe className="tutorialEmbededContainer" title="tutorial" src="https://pitch.com/embed/6c2bdfaf-3e54-4d5a-a7a0-b16797f0a9c9" allow="fullscreen" allowFullScreen={true} style={{ border: 0 }}></iframe>
    }

    const handleClose = async () => {
        setLoading(true);
        const id = user?.profile?.id;
        const authService = new AuthService();
        try {
            const { errors } = await authService.isLoggedBefore(id);
            if (errors.length === 0) {
                window.location.reload();
            } else {
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <div className="tutorialComponentContainer">
            <Modal
                open={openDrawer}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="tutorialModal" sx={inWebTut}>
                    <div className="tutorialComponent">
                        <div onClick={handleClose} className="skipTutorialContainer">
                            {loading ?
                                <CircularProgress size={15} sx={{ color: "var(--tae-orange)" }} />
                                :
                                <span className="skipTutorialContent">Skip Tutorial</span>
                            }
                        </div>

                        <Swiper
                            effect={"fade"}
                            navigation={true}
                            pagination={true}
                            modules={[Pagination, Navigation, EffectFade]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <div className="tutorialSwipeContainer">
                                    <div className="tutorialSwipe">
                                        <div className="tutorialContent tutorial-page-01">
                                            <div className="get-started-img-container">
                                                <div className="get-started-img">
                                                    <img src={getStarted} alt="" />
                                                </div>
                                            </div>

                                            <div className="tutorialContentBodyContainer">
                                                <div className="tutorialContentBody">
                                                    <div className="hello-message">Hello <span className="colored">{capitalizeFirstLetter(String(role).toLowerCase())}</span>, welcome to TheAfricanExporter!</div>
                                                    <div className="extra-message-to-hello">Swipe for a quick app walkthough</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                {tutorialType[`${role}`]}
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default Tutorial;