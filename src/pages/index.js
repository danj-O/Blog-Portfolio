import React from "react"
import Layout from '../components/Layout'
import '../styles/index.scss'
import Head from '../components/Head'

const IndexPage = () =>{
  return(
    <div>
      <Layout>
        <Head title="home"/>
        <h1> Hello!</h1>
        <h2>im a guy who makes stuff</h2>
      </Layout>
    </div>
  )
}
export default IndexPage