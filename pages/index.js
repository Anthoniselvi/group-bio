import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Login from "@/components/Login";

export default function Home() {
  return (
    <>
      <Head>
        <title>ABC Group Bio</title>
      </Head>
      <main>
        {/* <Navbar /> */}
        <div className={styles.maindiv}>
          <Login />
        </div>
      </main>
    </>
  );
}
