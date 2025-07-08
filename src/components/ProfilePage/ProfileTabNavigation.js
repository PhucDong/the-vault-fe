import { Tab, Tabs } from "@mui/material";
import CustomPaddingLayout from "../common/CustomPaddingLayout";
import { useMemo, useState } from "react";
import ProfileOverviewTabPanel from "./ProfileOverviewTabPanel";
import ProfileFriendsTabPanel from "./ProfileFriendsTabPanel";
import ProfileAnimeMangaListTabPanel from "./ProfileAnimeMangaListTabPanel";

function a11yProps(index) {
  return {
    id: `user-profile-navTab-${index}`,
    "aria-controls": `user-profile-navTab-panel-${index}`,
  };
}

function ProfileTabNavigation(props) {
  const { currentUser } = props;
  const [value, setValue] = useState(0);

  const animeList = useMemo(() => {
    return currentUser?.collections.filter(
      (collection) => collection.format === "Animes"
    );
  }, [currentUser?.collections]);

  const mangaList = useMemo(() => {
    return currentUser?.collections.filter(
      (collection) => collection.format === "Mangas"
    );
  }, [currentUser?.collections]);

  // console.log("Anime List: ", animeList);
  // console.log("Manga List: ", mangaList);

  // Dynamically define tabs
  const tabs = useMemo(() => {
    const tabArray = [{ label: "Overview", panel: "overview" }];

    if (currentUser?.friendCount > 0) {
      tabArray.push({ label: "Friends", panel: "friends" });
    }
    if (animeList?.length > 0) {
      tabArray.push({ label: "Anime List", panel: "animeList" });
    }
    if (mangaList?.length > 0) {
      tabArray.push({ label: "Manga List", panel: "mangaList" });
    }

    return tabArray;
  }, [currentUser, animeList, mangaList]);

  console.log("Tabs: ", tabs);

  const handleChangeTab = (event, newValue) => {
    console.log("Tab value: ", newValue);
    setValue(newValue);
  };

  return (
    <>
      <CustomPaddingLayout
        sx={{
          marginTop: { xs: "200px", sm: "224px", md: "264px", lg: "286px" },
          marginBottom: { md: "12px" },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChangeTab}
          aria-label="user-profile-tabs"
          variant="scrollable"
          scrollButtons={false}
          sx={{
            "& .MuiTabs-flexContainer": {
              gap: { xs: "20px", sm: "24px", md: "28px", lg: "32px" },
              "& .MuiButtonBase-root": {
                padding: 0,
                minWidth: "auto",
                textTransform: "capitalize",
                color: "primary.light",
                fontWeight: 600,
                fontSize: {
                  xs: "1.075rem",
                  sm: "1.1rem",
                  md: "1.175rem",
                  lg: "1.2rem",
                },
                "&.Mui-selected": {
                  color: "primary.main",
                },
              },
            },
            "& .MuiTabs-indicator": {
              display: "none", // Hides the underline of each selected tab
            },
          }}
        >
          {/* <Tab label="Overview" {...a11yProps(0)} />
          {currentUser?.friendCount > 0 && (
            <Tab label="Friends" {...a11yProps(1)} />
          )}
          {animeList?.length > 0 && (
            <Tab label="Anime List" {...a11yProps(2)} />
          )}
          {mangaList?.length > 0 && (
            <Tab label="Manga List" {...a11yProps(3)} />
          )} */}

          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} {...a11yProps(index)} />
          ))}
        </Tabs>

        {tabs.map((tab, index) => {
          if (tab.panel === "overview") {
            return (
              <ProfileOverviewTabPanel
                key={tab.panel}
                value={value}
                index={index}
                currentUser={currentUser}
                handleChangeTab={handleChangeTab}
              />
            );
          }
          if (tab.panel === "friends") {
            return (
              <ProfileFriendsTabPanel
                key={tab.panel}
                value={value}
                index={index}
                item={currentUser}
              />
            );
          }
          if (tab.panel === "animeList") {
            return (
              <ProfileAnimeMangaListTabPanel
                key={tab.panel}
                value={value}
                index={index}
                panel={tab.panel}
                currentUser={currentUser}
                itemList={animeList}
              />
            );
          }
          if (tab.panel === "mangaList") {
            return (
              <ProfileAnimeMangaListTabPanel
                key={tab.panel}
                value={value}
                index={index}
                panel={tab.panel}
                currentUser={currentUser}
                itemList={mangaList}
              />
            );
          }
          return null;
        })}
      </CustomPaddingLayout>
    </>
  );
}

export default ProfileTabNavigation;
