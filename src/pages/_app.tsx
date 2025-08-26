import React from 'react';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import "../components/globals.css";
 
const App = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
)

export default App;