import styles from "@/styles/Home.module.css";
import Header from "./Header";
import Form from "./Form";
import NewForm from "./NewForm";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function FormPage() {
  const [selectedGroup, setSelectedGroup] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/group/single/${id}`)
        .then((response) => {
          setSelectedGroup(response.data);
          console.log("selected group: " + JSON.stringify(response.data));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [id]);
  return (
    <div className={styles.container}>
      <Header />
      <NewForm selectedGroup={selectedGroup} />
      {/* <Form /> */}
    </div>
  );
}
