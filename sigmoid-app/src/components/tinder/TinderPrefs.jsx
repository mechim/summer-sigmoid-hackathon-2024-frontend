import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import MyTinderCard from "../tinder/MyTinderCard";
import {
  Button,
  LinearProgress,
  CircularProgress,
  Typography,
} from "@mui/material";
import api from "../../axios";
const propertiesData = [
  "durability",
  "battery",
  "camera",
  "performance",
  "memory",
];
function pairEachElement(arr) {
  let pairs = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      pairs.push([arr[i], arr[j]]);
    }
  }

  return pairs;
}

function TinderPrefs({ onFinish }) {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState(propertiesData);
  const [propertyPairs, setPropertyPairs] = useState([]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    

    setPropertyPairs(pairEachElement(properties));
    setStarted(true);
  }, []);

  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true);

      // try {
      //   const response = await api.post("/ratings/get-tc/2", {parameters_priority: properties});
      //   console.log(response.data);
      //   localStorage.setItem("tinder-cards", JSON.stringify(response.data));
      // } catch (error) {
      //   alert(error.message);
      // }
      setIsLoading(false);
  };

  
    // console.log(propertyPairs.length + " " + started);
    // console.log({parameters_priority: JSON.stringify(properties)});
    if (propertyPairs.length <= 0) {
      if (!started) {
        return;
      }

      localStorage.setItem("prefs", true);
      localStorage.setItem("my-prefs", JSON.stringify(properties));
      // fetchCards();
      onFinish();
      // setCheckPrefs(true);
    }
  }, [propertyPairs]);
  const swiped = (direction, nameToDelete) => {
    console.log("swiped!");
    console.log(propertyPairs[propertyPairs.length - 1]);
    if (propertyPairs[0]) {
      let chosenIndex, loserIndex;

      if (direction == "left") {
        for (let i = 0; i < properties.length; i++) {
          if (properties[i] == propertyPairs[propertyPairs.length - 1][0]) {
            chosenIndex = i;
          }
          if (properties[i] == propertyPairs[propertyPairs.length - 1][1]) {
            loserIndex = i;
          }
        }
      } else if (direction == "right") {
        for (let i = 0; i < properties.length; i++) {
          if (properties[i] == propertyPairs[propertyPairs.length - 1][1]) {
            chosenIndex = i;
          }
          if (properties[i] == propertyPairs[propertyPairs.length - 1][0]) {
            loserIndex = i;
          }
        }
      }

      let tempProps = properties;
      console.log(direction + " " + chosenIndex + " " + loserIndex);
      if (loserIndex < chosenIndex) {
        let temp = properties[loserIndex];
        tempProps[loserIndex] = tempProps[chosenIndex];
        tempProps[chosenIndex] = temp;
      }
      setProperties(tempProps);
      console.log(properties);
    }
  };

  const outOfFrame = async (name) => {
    console.log(name + " left the screen!");
    setPropertyPairs((propertyPairs) =>
      propertyPairs.filter((pair) => pair.toString() !== name)
    );
  };
  const tinderOffset = 350;

  return isLoading ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
      <Typography>Getting products based on your preferences...</Typography>
    </div>
  ) : (
    <div
      style={{
        position: "absolute",
        top: tinderOffset,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        justifyItems: "center",
      }}
    >
      {/* <LinearProgress value={progress} style={{position: 'absolute', top:2*tinderOffset}}/> */}
      <h1 style={{ position: "absolute", top: -tinderOffset }}>
        Set your preferences
      </h1>
      {/* <h2 style={{ position: "absolute" }}>
            No more People Left
        </h2> */}
      {propertyPairs.map((pair) => (
        <>
          <TinderCard
            className="swipe"
            onSwipe={(dir) => swiped(dir, pair.toString())}
            key={pair.toString()}
            onCardLeftScreen={() => outOfFrame(pair.toString())}
            preventSwipe={["down", "up"]}
            swipeRequirementType="velocity"
            swipeThreshold={1}
          >
            <MyTinderCard type="prefs" prefs={pair} />
          </TinderCard>
        </>
      ))}
      {propertyPairs[0] ? (
        <div
          style={{
            position: "relative",
            top: tinderOffset / 1.2,
            width: "85%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button size="large" style={{ color: "black", fontWeight: "bold" }}>
            {propertyPairs[propertyPairs.length - 1][0]}
          </Button>
          <Button style={{ color: "black", fontWeight: "bold" }}>
            {propertyPairs[propertyPairs.length - 1][1]}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default TinderPrefs;
