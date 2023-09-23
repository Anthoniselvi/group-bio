import React, { useState } from "react";
import styles from "@/styles/Navbar.module.css";
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import data from "../data";
import { useRouter } from "next/router";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
const Navbar = ({ opened, setOpened }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const router = useRouter();

  const navigateToHome = () => {
    router.push({
      pathname: "/",
    });
  };
  const handleMenuClicked = () => {
    setOpened(!opened);
  };

  const handleSearchIconClicked = () => {
    setSearchVisible(!searchVisible);
  };

  const performSearch = () => {
    const filteredData = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.offers.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResult(filteredData);
    setSearchVisible(false); // Hide the search input
    router.push({
      pathname: "/filteredprofile",
      query: {
        searchResult: JSON.stringify(filteredData),
        searchQuery: searchQuery,
      },
    });
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  };

  const handleSearchClick = () => {
    performSearch();
  };

  return (
    <div className={styles.nav}>
      {router.pathname === "/form" ? (
        <KeyboardBackspaceIcon onClick={navigateToHome} />
      ) : !opened ? (
        <GiHamburgerMenu onClick={handleMenuClicked} className={styles.icon} />
      ) : (
        <ImCross onClick={handleMenuClicked} className={styles.icon} />
      )}

      {router.pathname === "/form" ? (
        <h3 style={{ color: "#fff" }}>Create Profile</h3>
      ) : (
        <h3 style={{ color: "#fff" }}>ABC Group Bio</h3>
      )}

      {router.pathname === "/form" ? (
        <></>
      ) : searchVisible && router.pathname === "/allprofiles" ? (
        <>
          <div className={styles.searchContainer}>
            <input
              type="text"
              required
              placeholder="Search by Name / Company / Services"
              className={`${styles.searchInput} ${styles.searchInputFocused}`}
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={handleSearchEnter}
              autoFocus // Set autofocus here
              ref={(input) => input && input.focus()}
            />
            <div className={styles.search}>
              <SearchIcon
                style={{ color: "black", fontSize: "20px", fontWeight: 600 }}
                onClick={handleSearchClick} // Call the search function when the icon is clicked
              />
            </div>
          </div>
          <CloseIcon
            onClick={handleSearchIconClicked}
            className={styles.icon}
            style={{ color: "#01b4e4", fontSize: "30px" }}
          />
        </>
      ) : (
        // Check if opened is false before displaying the search icon
        !opened && (
          <SearchIcon
            onClick={handleSearchIconClicked}
            className={styles.icon}
            style={{ color: "#01b4e4", fontSize: "30px" }}
          />
        )
      )}
    </div>
  );
};

export default Navbar;
