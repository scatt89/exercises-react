import './Home.css'
import { Link } from "react-router";

function Home() {
  return (
    <>
        <h1>React+js Vanilla exercises</h1>
        <u>
            <li><Link to='/country-and-capital'>Country and capital game</Link></li>
            <li><Link to='/http-and-inputs'>Http api and inputs</Link> </li>
        </u>
    </>
  )
}

export default Home
