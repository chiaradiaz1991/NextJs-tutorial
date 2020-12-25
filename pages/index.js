import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
// import someDatabaseSDK from 'someDatabaseSDK' // if Database
// const databaseClient = someDatabaseSDK.createClient(...)

// if it is a SSR instead of getStaticProps use getServerSideProps with parameter context or ctx
// export async function getServerSideProps(context) { 
//   return {
//     props: {
//       // props for your component
//     }
//   }
// }

// import useSWR from 'swr'; is hook built with React
// function Profile() {
//   const { data, error } = useSWR('/api/user', fetch)

//   if (error) return <div>failed to load</div>
//   if (!data) return <div>loading...</div>
//   return <div>hello {data.name}!</div>
// }


export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  //if I want to fetch and external API
  // Instead of the file system,
  // fetch post data from an external API endpoint
  // const res = await fetch("..");
  // return res.json();

  // Instead of the file system,
  // fetch post data from a database
  // return databaseClient.query('SELECT posts...')

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
