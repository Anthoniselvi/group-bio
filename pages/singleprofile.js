import { useRouter } from "next/router";
import { data } from "@/components/data";
import Image from "next/image";
import styles from "@/styles/SingleProfile.module.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
export default function SingleProfile() {
  const router = useRouter();
  const { id } = router.query;
  //   console.log("Data in single: " + JSON.stringify(data));
  //   console.log("id in single: " + id);

  const selectedProfile = data.find((item) => item.id === Number(id)) || {};

  //   console.log("selectedProfile in single: " + JSON.stringify(selectedProfile));
  if (!selectedProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={selectedProfile.image}
          width={150}
          height={150}
          alt=""
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.heading}>
          <h1>{selectedProfile.name}</h1>
          <LinkedInIcon style={{ cursor: "pointer" }} />
        </div>
        <div className={styles.personal}>
          <h2>Personal Info</h2>
          {/* <h4>{selectedProfile.name}</h4> */}
          <p>{selectedProfile.designation}</p>
          <p>{selectedProfile.company}</p>
          <p>{selectedProfile.city}</p>
          <p>{selectedProfile.servicesOffered}</p>
        </div>
        <div className={styles.business}>
          <h2>Business Info</h2>
          {/* <h4>{selectedProfile.name}</h4> */}
          <p>{selectedProfile.designation}</p>
          <p>{selectedProfile.company}</p>
          <p>{selectedProfile.city}</p>
          <p>{selectedProfile.servicesOffered}</p>
        </div>
      </div>
    </div>
  );
}
