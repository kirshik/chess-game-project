import { homeH1, homeBtn1, homeBtn2, homeBtn3 } from "../strings";
import { Link } from 'react-router-dom';
import "./Home.css";
import MainButton from "./MainButton";
import "../../images/bR.png"

function Home() {


  return (
    <>
      <h1 className="Homeh1">{homeH1}</h1>
      <div className="buttons-div">
        <MainButton type="button" title={homeBtn1} path="/board" />
        <MainButton type="button" title={homeBtn2} path="/board" />
        <MainButton type="button" title={homeBtn3} path="/board" />
      </div>
    </>
  )
}
export default Home;