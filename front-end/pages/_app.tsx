import Layout from "../components/layout/Layout";
import "../styles/globals.css";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";


<!-- export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
} -->

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default appWithTranslation(App);