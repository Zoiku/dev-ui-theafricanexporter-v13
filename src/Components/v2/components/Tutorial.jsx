import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../../Styles/v2/Tutorial.css";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Box, Stack, capitalize } from "@mui/material";
import { inWebTut } from "../../../Styles/Modal";
import { tutorialType } from "./TutorialImages";
import { Swiper, SwiperSlide } from "swiper/react";
import getStarted from "../../../Assets/Tutorial/Pitch meeting-bro.svg";
import endTutorial from "../../../Assets/Tutorial/Pitch meeting-pana.svg";
import { EffectFade, Navigation, Pagination } from "swiper";
import AuthService from "../../../Services/Auth";
import { setAlert } from "../../../Redux/Features/Alert";
import { useDispatch } from "react-redux";
import CustomProgress from "./CustomProgress";
import ImageViewer from "react-simple-image-viewer";
import { initUser } from "../../../Redux/Features/Session";

const Tutorial = ({ openTutorialView, setOpenTutorialView }) => {
  const rootDispatch = useDispatch();
  const [loadingState, setLoadingState] = useState(false);
  const [reachEnd, setReachEnd] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const user = useSelector((state) => state?.session?.user);
  const role = user?.role;

  const openImage = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImage = () => {
    setIsViewerOpen(false);
  };

  const toggleReachEnd = (open) => () => {
    setReachEnd(open);
  };

  const triggerSnackBarAlert = (message, severity) => {
    const payload = {
      message,
      severity,
    };
    rootDispatch(setAlert(payload));
  };

  const handleGetStarted = () => {
    const doAction = async () => {
      setLoadingState(true);
      const authService = new AuthService();
      const id = role === "BUYER" ? user?.profile?.id : user?.profile?.user?.id;
      try {
        const { errors } = await authService.isLoggedBefore(id);
        if (errors.length === 0) {
          if (role === "MERCHANT") {
            rootDispatch(
              initUser({ user: { ...user.profile.user, isLoggedBefore: true } })
            );
          } else if (role === "BUYER") {
            rootDispatch(initUser({ isLoggedBefore: true }));
          }
          setOpenTutorialView(false);
        } else {
          triggerSnackBarAlert(
            "Problem processing request, please try again",
            "error"
          );
        }
      } catch (error) {
        throw error;
      }
      setLoadingState(false);
    };

    doAction();
  };

  return isViewerOpen ? (
    <ImageViewer
      src={tutorialType[`${role}`]}
      currentIndex={currentImage - 1}
      onClose={closeImage}
      disableScroll={true}
      backgroundStyle={{
        backgroundColor: "rgba(0,0,0,0.9)",
      }}
      closeOnClickOutside={true}
    />
  ) : (
    <div className="TutorialPageContainer">
      {user && role && (
        <Modal open={openTutorialView}>
          <Box className="TutorialComponent" sx={inWebTut}>
            <Swiper
              effect={"fade"}
              className="swiper_component"
              navigation={true}
              pagination={{ type: "bullets" }}
              initialSlide={currentImage}
              modules={[EffectFade, Pagination, Navigation]}
              onReachEnd={toggleReachEnd(true)}
            >
              <SwiperSlide className="swiper_slide">
                <div className="swiper_slide_content_container">
                  <Stack
                    direction="column"
                    className="swiper_slide_content"
                    spacing={3}
                  >
                    <div className="swiper_slide_title">
                      Hello{" "}
                      <span>
                        <strong>
                          {capitalize(String(role).toLowerCase())}
                        </strong>
                      </span>
                    </div>

                    <div className="swiper_slide_content_image_container">
                      <img src={getStarted} alt="" />
                    </div>

                    <Stack
                      className="swiper_slide_content_saluation"
                      spacing={1}
                    >
                      <div>
                        Welcome to{" "}
                        <span>
                          <strong>TheAfricanExporter.com</strong>
                        </span>
                      </div>
                      <div>Swipe for quick walkthrough</div>
                    </Stack>
                  </Stack>
                </div>
              </SwiperSlide>

              {tutorialType[role]?.map((src, index) => (
                <SwiperSlide
                  key={index}
                  className="swiper_slide swiper_slide_image_container"
                >
                  <img onClick={() => openImage(index + 1)} src={src} alt="" />
                </SwiperSlide>
              ))}

              <SwiperSlide className="swiper_slide">
                <div className="swiper_slide_content_container">
                  <Stack
                    direction="column"
                    className="swiper_slide_content"
                    spacing={3}
                  >
                    <div className="swiper_slide_title">
                      <span>
                        <strong>Congratulations!</strong>
                      </span>
                    </div>

                    <div className="swiper_slide_content_image_container">
                      <img src={endTutorial} alt="" />
                    </div>

                    <Stack
                      className="swiper_slide_content_saluation"
                      spacing={1}
                    >
                      <div>
                        Get started by clicking the "
                        <strong>Get Started</strong>" below
                      </div>
                    </Stack>
                  </Stack>
                </div>
              </SwiperSlide>
            </Swiper>

            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              className="LoadingSwiperAction"
              marginTop={5}
              height={40}
            >
              {loadingState ? (
                <div>
                  <CustomProgress size={15} tutorialLoading={true} />
                </div>
              ) : reachEnd ? (
                <div
                  onClick={handleGetStarted}
                  className="loading_swiper_action_active"
                >
                  Get Started
                </div>
              ) : (
                <div
                  onClick={handleGetStarted}
                  className="loading_swiper_action_not_active"
                >
                  Skip Tutorial
                </div>
              )}
            </Stack>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Tutorial;
