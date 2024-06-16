import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import './Tinder.css'
import MyTinderCard from "../components/tinder/MyTinderCard";
import { Button } from "@mui/material";
import TinderMain from "../components/tinder/TinderMain";
import TinderPrefs from "../components/tinder/TinderPrefs";
import { tryStatement } from "@babel/types";
import api from "../axios";
function Tinder() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [loadingMessage, setLoadingMessage] = useState('');
  // const [havePrefs, setHavePrefs] = useState(false);
  // const [checkPrefs, setCheckPrefs] = useState(false);
  // const [cards, setCards] = useState({});
  // const finishPrefs = () => {
  //   setCheckPrefs(true);
  // }

  // const handleCards = (_cards) => {
  //   setCards(_cards);
  // }
  // useEffect(() => {
  //   const checkPrefs = async() => {
  //     const prefs = localStorage.getItem('prefs');
  //     if (prefs == 'true'){
  //       setHavePrefs(true);
  //     } else {
  //       setHavePrefs(false);
  //     }
  //   } 
  //   checkPrefs();
    
  // }, [checkPrefs])
  
  return (
    // havePrefs? <TinderMain/> 
    // : <TinderPrefs onFinish={finishPrefs}/>
    <></>
  );
}

export default Tinder;
