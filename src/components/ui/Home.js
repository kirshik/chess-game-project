import { homeH1, homeBtn1, homeBtn2, homeBtn3 } from "../strings";
import "./Home.css";
import MainButton from "./MainButton";
import "../../images/bR.png"

function Home() {


  return (
    <>
      <section class="wrapper">
        <div class="top">{homeH1}</div>
        <div class="bottom" aria-hidden="true">{homeH1}</div>
      </section>
      <div className="buttons-div">
        <MainButton type="button" title={homeBtn1} path="/type-menu" />
        <MainButton type="button" title={homeBtn2} path="/type-menu" />
        <MainButton type="button" title={homeBtn3} path="/type-menu" />
      </div>
    </>
  )
}
export default Home;