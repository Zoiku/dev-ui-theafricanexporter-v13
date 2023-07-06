import "../../../Styles/v2/AppMenu.css";
import { Box, Stack, Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";
import { menuList, bottomMenuList } from "./AppMenuLists";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useState } from "react";
import { Link } from "react-router-dom";
import DrawerModal from "./DrawerModal";
import { tutorialVideos } from "../../../Styles/v2/box";
import Tip from "./Tip";
import { TutorialVideos } from "./TutorialVideoList";
import SubscriptionsRoundedIcon from "@mui/icons-material/SubscriptionsRounded";

const TutorialMenuItem = ({ icon, title, onClick }) => (
  <Stack
    direction="row"
    alignItems="center"
    className="app-menu-item tutorial-app-menu-item"
    spacing={2}
    onClick={onClick}
  >
    <Tooltip placement="right" title={title}>
      <Stack
        direction="row"
        alignItems="center"
        className="app-menu-icon tutorial-app-menu-icon"
      >
        {icon}
      </Stack>
    </Tooltip>
  </Stack>
);

const TutorialFrameItem = ({ title, iframeSrc }) => (
  <Stack spacing={1}>
    <div style={{ fontWeight: 500 }}>{title}</div>
    <Box height={250} style={{ overflow: "clip", borderRadius: 5 }}>
      <iframe
        frameBorder={0}
        width="100%"
        height="100%"
        src={iframeSrc}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </Box>
  </Stack>
);

const AppMenu = ({ base }) => {
  const [openTutotialVideos, setOpenTutorialVideos] = useState(false);
  const toggleOpenTutorialVideos = (open) => () => {
    setOpenTutorialVideos(open);
  };

  return (
    <div>
      <div>
        {openTutotialVideos && (
          <DrawerModal
            title="Tutorial Videos"
            openState={openTutotialVideos}
            toggleOpenState={toggleOpenTutorialVideos}
            boxStyle={tutorialVideos}
            modalClassName="tutorial_modal_container"
            leftSlide={true}
          >
            <Box>
              <Tip>
                <div>
                  Can't find the video you are looking for? Send an email to{" "}
                  <strong>
                    <a
                      style={{ color: "#000" }}
                      href="mailto:hello@theafricanexporter.com"
                    >
                      hello@theafricanexporter.com
                    </a>
                  </strong>{" "}
                  indicating the issue you would like covered in a tutorial
                  video.
                </div>
              </Tip>
              <Stack marginY={2} spacing={5}>
                {TutorialVideos[base]?.map((video, index) => (
                  <TutorialFrameItem
                    key={index}
                    title={video?.title}
                    iframeSrc={video?.iframeSrc}
                  />
                ))}
              </Stack>
            </Box>
          </DrawerModal>
        )}
      </div>

      <menu className="app-menu">
        <div className="app-menu-items">
          {menuList[base]?.map((menuLink, index) => (
            <div key={index} style={{ marginBottom: 15 }}>
              <NavLink
                end
                className="app-menu-item"
                to={`/${base}/${menuLink.to}`}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Stack
                    className="app-menu-icon"
                    direction="row"
                    alignItems="center"
                  >
                    {menuLink.icon}
                  </Stack>
                  <div className="app-menu-label">{menuLink.label}</div>
                </Stack>
              </NavLink>
            </div>
          ))}

          {base !== "admin" && (
            <Stack className="tutorial-app-menu-items">
              <TutorialMenuItem
                title="Tutorial Videos"
                icon={<SubscriptionsRoundedIcon />}
                onClick={toggleOpenTutorialVideos(true)}
              />
            </Stack>
          )}
        </div>
      </menu>
    </div>
  );
};

export const AppBottomMenu = ({ base }) => {
  const [openTutotialVideos, setOpenTutorialVideos] = useState(false);
  const toggleOpenTutorialVideos = (open) => () => {
    setOpenTutorialVideos(open);
  };
  const pathname = window.location.pathname;
  const [value, setValue] = useState(pathname);
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div>
        <DrawerModal
          title="Tutorial Videos"
          openState={openTutotialVideos}
          toggleOpenState={toggleOpenTutorialVideos}
          boxStyle={tutorialVideos}
          modalClassName="tutorial_modal_container"
          leftSlide={true}
        >
          <Box>
            <Tip>
              <div>
                Can't find the video you are looking for? Send an email to{" "}
                <strong>
                  <a
                    style={{ color: "#000" }}
                    href="mailto:hello@theafricanexporter.com"
                  >
                    hello@theafricanexporter.com
                  </a>
                </strong>{" "}
                indicating the issue you would like covered in a tutorial video.
              </div>
            </Tip>
            <Stack marginY={2} spacing={5}>
              {TutorialVideos[base]?.map((video, index) => (
                <TutorialFrameItem
                  key={index}
                  title={video?.title}
                  iframeSrc={video?.iframeSrc}
                />
              ))}
            </Stack>
          </Box>
        </DrawerModal>
      </div>

      <menu
        className="app-bottom-menu"
        style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      >
        <BottomNavigation showLabels value={value} onChange={handleChange}>
          {bottomMenuList[base]?.map((menuLink, index) => (
            <BottomNavigationAction
              key={index}
              component={Link}
              to={`/${base}/${menuLink.to}`}
              value={`/${base}/${menuLink.to}`}
              label={menuLink.label}
              icon={menuLink.icon}
            />
          ))}

          {base !== "admin" && (
            <BottomNavigationAction
              icon={<SubscriptionsRoundedIcon />}
              label="Tutorials"
              value={null}
              onClick={toggleOpenTutorialVideos(true)}
            />
          )}
        </BottomNavigation>
      </menu>
    </div>
  );
};

export default AppMenu;
