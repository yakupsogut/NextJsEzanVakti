import Head from "next/head"

function Layout({children}) {
  return (
    <div>
        <Head>
            <title>Bu Site Yakup Söğüt Blog </title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
 
      <main><div className="container">{children}</div></main>
     
    </div>
  )
  
}
export default Layout