import styles from "@/styles/Home.module.css";
import Header from "./Header";
import Content from "./Content";
import Form from "./Form";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Header />
      {/* <Content /> */}
      <Form />
    </div>
  );
}
