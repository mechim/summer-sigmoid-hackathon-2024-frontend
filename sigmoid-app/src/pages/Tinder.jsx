import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import './Tinder.css'
import MyTinderCard from "../components/tinder/MyTinderCard";
import { Button } from "@mui/material";
const propertiesData = [
    'Camera',
    'Battery',
    'Durability',
    'Performance',
    'Memory'
]
function pairEachElement(arr) {
    let pairs = [];

    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        pairs.push([arr[i], arr[j]]);
      }
    }

    return pairs;
  }
const offset = 350;

function Tinder() {
  const [properties, setProperties] = useState(propertiesData);
  const [propertyPairs, setPropertyPairs] = useState([]);
  const [direction, setDirection] = useState('');
//   const 
  useEffect(() => {
    console.log("KILL YOURSELF");
    setPropertyPairs(pairEachElement(properties));
  }, []);

  const swiped = (direction, nameToDelete) => {
    console.log('swiped!');
    setDirection(direction.toString());
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
    setPropertyPairs(propertyPairs => propertyPairs.filter(pair => pair.toString() !== name));
    console.log(propertyPairs[propertyPairs.length]);
    if (direction == 'left'){
        
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: offset,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        justifyItems: "center",
      }}
    >
        <h1  style={{ position: "absolute" ,top:-offset}}>Set your preferences...</h1>
        <h2 style={{ position: "absolute" }}>
            No more People Left
        </h2>
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
                    <MyTinderCard type='prefs' prefs={pair}/>
            </TinderCard>


        </>

        ))}
        {propertyPairs[0] ? 
            <div style={{position: 'relative', top: offset/1.2, width: '85%', display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                <Button size='large' style={{color:'black', fontWeight: 'bold'}}>{propertyPairs[propertyPairs.length-1][0]}</Button>
                <Button style={{color:'black', fontWeight: 'bold'}}>{propertyPairs[propertyPairs.length-1][1]}</Button>

            </div>
            : null
        }
        


    </div>
  );
}

export default Tinder;
