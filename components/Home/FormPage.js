import styles from "@/styles/Home.module.css";
import Header from "./Header";
import Form from "./Form";

export default function FormPage() {
  return (
    <div className={styles.container}>
      <Header />

      <Form />
    </div>
  );
}
