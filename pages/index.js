import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Login from "@/components/Login";
import Sample from "@/components/Sample";
import Signin from "@/components/Signin/Signin";
import HomePage from "../components/Home/homepage";
import AllProfiles from "./allprofiles";

export default function Home() {
  return (
    <>
      <Head>
        <title>ABC Group Bio</title>
      </Head>
      <main>
        <div className={styles.maindiv}>
          {/* <Sample /> */}
          <AllProfiles />
        </div>
      </main>
    </>
  );
}
