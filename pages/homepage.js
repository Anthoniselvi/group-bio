import Content from "@/components/Home/Content";
import Header from "@/components/Home/Header";
import ProgressSlider from "@/components/Home/ProgressSlider";
import styles from "@/styles/Home.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Header />
      <ProgressSlider />
      <Content />
    </div>
  );
}
