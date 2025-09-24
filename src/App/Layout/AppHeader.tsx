import { useState } from "react";
import "./styles/header.css";
// import PomeranianLogo from '../Images/start-it-logo.svg';
// import SettingsIcon from '../Images/setting.svg';
// import snowWolf from '../Images/snow-wolf.png';
// import { ArrowDown } from '../Components/Icons/Arrow';
import { RoundedImage } from "../Components/RoundedImage/roundedImage";
import MIO from "../../assets/Logos/MIO2.svg";
import TPM_C from "../../assets/Logos/TPM4.svg";
import TPM_O from "../../assets/Logos/TPM3.svg";
import WMS from "../../assets/Logos/WMS.svg";


// import { PopUpMenu } from './components/PopUpMenu';

export function AppHeader() {
  // const [isArrowOpen, setIsArrowOpen] = useState(false);

  // function toggleArrow() {
  //   setIsArrowOpen(!isArrowOpen);
  //   console.log('arrow open' + isArrowOpen);

  return (
    <header>
      <div className="header-container">
        <img src={MIO} alt="logo" />
        <img src={WMS} alt="logo" className="rti"/>
        <div className="rotate-logo">
          <img src={TPM_C} alt="logo" className="rti"/>
          <img src={TPM_O} alt="logo" className="rti"/>
        </div>
      </div>
    </header>
  );
}
