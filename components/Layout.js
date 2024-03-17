import React from 'react'
import Head from 'next/head'
import Header from './header'
import styles from '../src/styles/header.module.css'

const Layout = ({children, title,description}) => {
  return (
    <>
    <Head>
        <title>{`CRM-AR - ${title}`}</title>
        <meta name={'Description'} content={`CRM-AR - ${description}`} />
    </Head>
    <div className={styles.grid}>
    <Header/>
    {children}
    </div>
  
    </>
  )
}

export default Layout
