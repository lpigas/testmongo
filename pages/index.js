import Link from "next/link";
import clientPromise from '../lib/mongodb'

export default function Home({ isConnected }) {
  return (
    <div className="container">
  

      <main style={{display:'flex' , justifyContent:'center'}}>



        {isConnected ? (
          <h2 className="subtitle">You are connected to MongoDB</h2>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h2>
        )}

            <Link href='./movies'>to movies</Link>

      </main>

    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    await clientPromise
    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}
