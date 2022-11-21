import { homeH1, homeBtn1, homeBtn2, homeBtn3 } from "../strings";
import "./Home.css";
import MainButton from "./MainButton";
import "../../images/bR.png"
function Home() {
  // function handleClick() {
  //   return undefined
  // }
  return (
    <>
      {/* <div className="background-figure"></div> */}
      <h1 className="Homeh1">{homeH1}</h1>
      <div className="buttons-div">
        <MainButton type="button" title={homeBtn1} />
        <MainButton type="button" title={homeBtn2} />
        <MainButton type="button" title={homeBtn3} />
      </div>
    </>
  )
}
export default Home;