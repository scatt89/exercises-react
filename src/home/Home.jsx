import './Home.css'
import { Link } from "react-router";

function Home() {
  return (
    <>
        <h1>React+js Vanilla exercises</h1>
        <u>
            <li><Link to='/country-and-capital'>Country and capital game</Link></li>
        </u>
    </>
  )
}

export default Home
