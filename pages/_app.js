import React from 'react'

import Layout from '@layouts/base'

import '@styles/main.scss'

const App = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
)

export default App
