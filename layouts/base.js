import React from 'react'

import Head from 'next/head'

import Header from '@components/header'
import Footer from '@components/footer'

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        {/* https://realfavicongenerator.net/favicon_result?file_id=p1fq1desev158cdb21vq21n051qir6 */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#81005e" />
        <link rel="shortcut icon" href="/icons/favicon.ico" /> */}
        <meta name="msapplication-TileColor" content="#81005e" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <Header/>
      {children}
      <Footer />
    </>
  )
}

export default Layout
