import styles from "@/styles/Navbar.module.css";
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const Navbar = ({ opened, setOpened }) => {
  const [searchVisible, setSearchVisible] = useState(false);

  const handleMenuClicked = () => {
    setOpened(!opened);
  };

  const handleSearchIconClicked = () => {
    setSearchVisible(!searchVisible);
  };
  return (
    <div className={styles.nav}>
      {!opened ? (
        <GiHamburgerMenu onClick={handleMenuClicked} className={styles.icon} />
      ) : (
        <ImCross onClick={handleMenuClicked} className={styles.icon} />
      )}

      <h3 style={{ color: "#fff" }}>ABC Group Bio</h3>

      {/* <SearchIcon style={{ color: "#01b4e4", fontSize: "25px" }} /> */}
      {searchVisible ? (
        <>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchInput}
            />
          </div>
          <CloseIcon
            onClick={handleSearchIconClicked}
            className={styles.icon}
            style={{ color: "#01b4e4", fontSize: "30px" }}
          />
        </>
      ) : (
        <SearchIcon
          onClick={handleSearchIconClicked}
          className={styles.icon}
          style={{ color: "#01b4e4", fontSize: "30px" }}
        />
      )}
    </div>
  );
};

export default Navbar;
