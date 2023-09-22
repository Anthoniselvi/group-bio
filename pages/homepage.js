import Content from "@/components/Home/Content";
import Header from "@/components/Home/Header";
import ProgressSlider from "@/components/Home/ProgressSlider";
import styles from "@/styles/Home.module.css";
import { useState } from "react";

export default function HomePage() {
  const [filledFields, setFilledFields] = useState({
    name: false,
    course: false,
    year: false,
    location: false,
    phone: false,
    company: false,
    designation: false,
    industry: false,
    offers: false,
    linkedin: false,
  });

  const calculateProgressPercentage = () => {
    const totalFields = Object.keys(filledFields).length;
    const filledCount = Object.values(filledFields).filter(
      (value) => value || value === ""
    ).length;
    return (filledCount / totalFields) * 100;
  };

  return (
    <div className={styles.container}>
      <Header />
      <ProgressSlider progressPercentage={calculateProgressPercentage()} />
      <Content />
    </div>
  );
}
