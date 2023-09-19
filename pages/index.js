import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Login from "@/components/Login";
import Sample from "@/components/Sample";
import Signin from "@/components/Signin/Signin";

export default function Home() {
  return (
    <>
      <Head>
        <title>ABC Group Bio</title>
      </Head>
      <main>
        <div className={styles.maindiv}>
          <Sample />
        </div>
      </main>
      {/* <Signin /> */}
    </>
  );
}
