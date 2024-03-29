import React, { useState } from "react";
import { useRouter } from "next/router";
import { data } from "@/components/data";
import Image from "next/image";
import styles from "@/styles/SingleProfile.module.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LinkIcon from "@mui/icons-material/Link";
import Head from "next/head";
import { Launcher } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
export default function SingleProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [showWhatsAppWidget, setShowWhatsAppWidget] = useState(false);

  const selectedProfile = data.find((item) => item.id === Number(id)) || {};

  if (!selectedProfile) {
    return <div>Loading...</div>;
  }

  const navigateToHome = () => {
    router.push({
      pathname: "/",
    });
  };
  return (
    <>
      <Head>
        <title>ABC Group Bio</title>
        {/* <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main>
        {/* <TopBar /> */}
        <div className={styles.container}>
          <KeyboardBackspaceIcon
            onClick={navigateToHome}
            style={{ marginBottom: "-2rem", cursor: "pointer" }}
          />
          <div className={styles.imageContainer}>
            <Image
              src={selectedProfile.image}
              width={170}
              height={170}
              alt="image"
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <div className={styles.heading}>
              <h1 className={styles.headingtext}>{selectedProfile.name}</h1>
              <div className={styles.linkicon}>
                <LinkedInIcon style={{ cursor: "pointer" }} />
                <LinkIcon style={{ cursor: "pointer" }} />
              </div>
            </div>
            <div className={styles.business}>
              <h2 className={styles.contentheading}>Business Info</h2>
              {/* <h4>{selectedProfile.name}</h4> */}
              <div className={styles.row}>
                <p className={styles.contenttext}>Role & Company </p>
                <p className={styles.span}>
                  {selectedProfile.role}, {selectedProfile.companyName}
                </p>
              </div>
              <div className={styles.row}>
                <p className={styles.contenttext}>City </p>
                <p className={styles.span}>{selectedProfile.city}</p>
              </div>
              <div className={styles.row}>
                <p className={styles.contenttext}>Contact Number </p>
                <a
                  className={styles.span}
                  href={`https://api.whatsapp.com/send?phone=${selectedProfile.phone}&text=Hello`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedProfile.phone}
                </a>
              </div>
              <div className={styles.row}>
                <p className={styles.contenttext}>Region </p>
                <p className={styles.span}>{selectedProfile.region}</p>
              </div>
              <div className={styles.row}>
                <p className={styles.contenttext}>Industry </p>
                <p className={styles.span}>{selectedProfile.industry}</p>
              </div>
              <div className={styles.row}>
                <p className={styles.contenttext}>Years Since </p>
                <p className={styles.span}>{selectedProfile.years}</p>
              </div>
              <div className={styles.row}>
                <p className={styles.contenttext}>Services Offered </p>
                <p className={styles.span}>{selectedProfile.servicesOffered}</p>
              </div>
            </div>

            <div className={styles.personal}>
              <h2 className={styles.contentheading}>Personal Info</h2>
              {/* <h4>{selectedProfile.name}</h4> */}
              <div className={styles.row}>
                <p className={styles.contenttext}>Date Of Birth: </p>
                <p className={styles.span}>{selectedProfile.dob}</p>
              </div>
              <div className={styles.row}>
                <p className={styles.contenttext}>Interests: </p>
                <p className={styles.span}>{selectedProfile.interest}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      {showWhatsAppWidget && (
        <Launcher
          agentProfile={{
            teamName: "Support",
            imageUrl: "https://via.placeholder.com/40",
          }}
          onMessageWasSent={() => {
            // Handle message being sent
          }}
          handleClick={() => {
            // Handle widget click
          }}
          isOpen={showWhatsAppWidget}
          showEmoji
        />
      )}
    </>
  );
}
