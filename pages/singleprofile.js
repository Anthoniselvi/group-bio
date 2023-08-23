import { useRouter } from "next/router";
import { data } from "@/components/data";
import Image from "next/image";
import styles from "@/styles/SingleProfile.module.css";
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
      <h1>{selectedProfile.name}</h1>
      <p>{selectedProfile.designation}</p>
      <p>{selectedProfile.company}</p>
      <p>{selectedProfile.city}</p>
      <p>{selectedProfile.servicesOffered}</p>
    </div>
  );
}
