import styles from "@/styles/Navbar.module.css";
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import data from "../data";
import { useRouter } from "next/router";
const Navbar = ({ opened, setOpened }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const router = useRouter();

  const handleMenuClicked = () => {
    setOpened(!opened);
  };

  const handleSearchIconClicked = () => {
    setSearchVisible(!searchVisible);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      const filteredData = data.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.servicesOffered.toLowerCase().includes(searchQuery.toLowerCase())
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
    }
  };

  return (
    <div className={styles.nav}>
      {!opened ? (
        <GiHamburgerMenu onClick={handleMenuClicked} className={styles.icon} />
      ) : (
        <ImCross onClick={handleMenuClicked} className={styles.icon} />
      )}

      <h3 style={{ color: "#fff" }}>ABC Group Bio</h3>

      {searchVisible ? (
        <>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={handleSearchEnter}
              autoFocus // Set autofocus here
              ref={(input) => input && input.focus()} // Programmatically set focus
            />
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
