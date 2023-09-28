import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Login from "@/components/Login";
import Sample from "@/components/Sample";
import Signin from "@/components/Signin/Signin";
import FormPage from "../components/Home/FormPage";
import AllProfiles from "./allprofiles";
import { useUserAuth } from "@/context/DataContext";
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
