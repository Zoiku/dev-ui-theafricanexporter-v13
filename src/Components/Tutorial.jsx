import merchantStep1 from "../Assets/Walkthrough Images/Walkthrough (Merchant)/Step 1.png";
import merchantStep2 from "../Assets/Walkthrough Images/Walkthrough (Merchant)/Step 2.png";
import merchantStep3 from "../Assets/Walkthrough Images/Walkthrough (Merchant)/Step 3.png";
import merchantStep4 from "../Assets/Walkthrough Images/Walkthrough (Merchant)/Step 4.png";
import merchantStep5 from "../Assets/Walkthrough Images/Walkthrough (Merchant)/Step 5.png";
import merchantStep6 from "../Assets/Walkthrough Images/Walkthrough (Merchant)/Step 6.png";
import merchantStep7 from "../Assets/Walkthrough Images/Walkthrough (Merchant)/Step 7.png";
import buyerStep1 from "../Assets/Walkthrough Images/Walkthrough (Buyer)/Step 1.png";
import buyerStep2 from "../Assets/Walkthrough Images/Walkthrough (Buyer)/Step 2.png";
import buyerStep3 from "../Assets/Walkthrough Images/Walkthrough (Buyer)/Step 3.png";
import buyerStep4 from "../Assets/Walkthrough Images/Walkthrough (Buyer)/Step 4.png";
import buyerStep5 from "../Assets/Walkthrough Images/Walkthrough (Buyer)/Step 5.png";
import buyerStep6 from "../Assets/Walkthrough Images/Walkthrough (Buyer)/Step 6.png";
import buyerStep7 from "../Assets/Walkthrough Images/Walkthrough (Buyer)/Step 7.png";
import buyerStep8 from "../Assets/Walkthrough Images/Walkthrough (Buyer)/Step 8.png";
import buyerStep9 from "../Assets/Walkthrough Images/Walkthrough (Buyer)/Step 9.png";
import buyerStep10 from "../Assets/Walkthrough Images/Walkthrough (Buyer)/Step 10.png";
import buyerStep11 from "../Assets/Walkthrough Images/Walkthrough (Buyer)/Step 11.png";
import "../Styles/Tutorial.css";
import { useState, useCallback } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { inWebTut } from "../Styles/Modal";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper";
import gettingStarted from "../Assets/Tutorial/Pitch meeting-bro.svg";
import completedTutorial from "../Assets/Tutorial/Pitch meeting-pana.svg";
import ImageViewer from "react-simple-image-viewer";
import AuthService from "../Services/Auth";
import { initUser } from "../Redux/Features/Session";
import { useDispatch } from "react-redux";
import { capitalizeFirstLetter } from "./Misc";
import CustomProgress from "./v2/components/CustomProgress";

const Tutorial = ({ user }) => {
  const { role } = user;
  const rootDispatch = useDispatch();
  // eslint-disable-next-line
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [slideFinish, setSlideFinish] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);
  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  const tutorialType = {
    MERCHANT: [
      merchantStep1,
      merchantStep2,
      merchantStep3,
      merchantStep4,
      merchantStep5,
      merchantStep6,
      merchantStep7,
    ],
    BUYER: [
      buyerStep1,
      buyerStep2,
      buyerStep3,
      buyerStep4,
      buyerStep5,
      buyerStep6,
      buyerStep7,
      buyerStep8,
      buyerStep9,
      buyerStep10,
      buyerStep11,
    ],
  };

  const handleAction = async () => {
    setLoading(true);
    const id =
      role === "BUYER"
        ? user.profile.id
        : role === "MERCHANT" && user.profile.user.id;
    const authService = new AuthService();
    try {
      const { errors } = await authService.isLoggedBefore(id);
      if (errors.length === 0) {
        setLoading(false);
        if (role === "MERCHANT") {
          rootDispatch(
            initUser({ user: { ...user.profile.user, isLoggedBefore: true } })
          );
        } else if (role === "BUYER") {
          rootDispatch(initUser({ isLoggedBefore: true }));
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return isViewerOpen ? (
    <ImageViewer
      src={tutorialType[`${role}`]}
      currentIndex={currentImage - 1}
      onClose={closeImageViewer}
      disableScroll={true}
      backgroundStyle={{
        backgroundColor: "rgba(0,0,0,0.9)",
      }}
      closeOnClickOutside={true}
    />
  ) : (
    <div className="TutorialPageContainer">
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="TutorialComponentContainer" sx={inWebTut}>
          <Swiper
            tabIndex={currentImage}
            effect={"fade"}
            navigation={true}
            pagination={{ type: "bullets" }}
            modules={[EffectFade, Pagination, Navigation]}
            initialSlide={currentImage}
            onReachEnd={() => setSlideFinish(true)}
          >
            <SwiperSlide className="TutorialSwiperSlideContainer">
              <div className="TutorialContentContainer">
                <div className="TutorialContent">
                  <div className="tutorialTitle1">
                    Hello{" "}
                    <span className="">{capitalizeFirstLetter(role)}</span>
                  </div>
                  <div className="tutorialArtImageContainer">
                    <img
                      src={gettingStarted}
                      alt=""
                      className="tutorialArtImage"
                    />
                  </div>
                  <div className="tutorialTitle3">
                    Welcome to <span>TheAfricanExporter.com</span>
                  </div>
                  <div className="tutorialTitle4">
                    Swipe for a quick walkthrough
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {tutorialType[`${role}`].map((src, index) => (
              <SwiperSlide className="TutorialSwiperSlideContainer" key={index}>
                <img
                  onClick={() => openImageViewer(index + 1)}
                  className="TutorialSwiperSlideImage"
                  src={src}
                  alt=""
                />
              </SwiperSlide>
            ))}

            <SwiperSlide className="TutorialSwiperSlideContainer">
              <div className="TutorialContentContainer">
                <div className="TutorialContent">
                  <div className="tutorialCompleted">
                    <span>Congratulations!</span>
                  </div>
                  <div className="tutorialArtImageContainer2">
                    <img
                      src={completedTutorial}
                      alt=""
                      className="tutorialArtImage"
                    />
                  </div>
                  <div>
                    Get started by clicking the "<strong>Get Started</strong>"
                    below
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          {loading ? (
            <div className="tutorialLoadingProgress">
              <div>
                <CustomProgress size={13} tutorialLoading={true} />
              </div>
            </div>
          ) : (
            <div onClick={handleAction} className="tutorialSkipContainer">
              {slideFinish ? (
                <div className="tutorialProgressComplete">Get Started</div>
              ) : (
                <div className="tutorialProgressIncomplete">Skip Tutorial</div>
              )}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Tutorial;
