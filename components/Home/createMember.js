import styles from "@/styles/Home.module.css";
import Header from "./Header";
import Content from "./Content";

export default function CreateMember() {
  return (
    <div className={styles.container}>
      <Header />
      <Content />
    </div>
  );
}
