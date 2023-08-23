import React from "react";
import App from "next/app";
import Router from "next/router";
import Layout from "@/components/TopBar/Layout";
import "../styles/globals.css";

class MyApp extends App {
  componentDidMount() {
    // Scroll to top when navigating to a new page
    Router.events.on("routeChangeComplete", () => {
      window.scrollTo(0, 0);
    });
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
