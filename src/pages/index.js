import React from "react"
import { Link } from "gatsby"
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
        <p>Need a dev? <Link to="/contact">Contact Me!</Link></p>
      </Layout>
    </div>
  )
}
export default IndexPage