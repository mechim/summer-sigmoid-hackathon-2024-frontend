import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import MyTinderCard from "../tinder/MyTinderCard";
import { Button, LinearProgress } from "@mui/material";
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

function TinderPrefs({onFinish}) {
  // const {setCheckPrefs} = props;
  const [properties, setProperties] = useState(propertiesData);
  const [propertyPairs, setPropertyPairs] = useState([]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setPropertyPairs(pairEachElement(properties));
    const ogLength = propertyPairs.length;
    setStarted(true);
  }, []);

  useEffect(() => {
    console.log(propertyPairs.length + " " + started);
    if (propertyPairs.length <= 0){
      if (!started){
        return
      } 

      localStorage.setItem('prefs', true);
      onFinish();
      // setCheckPrefs(true);
    }
  },[propertyPairs])
  const swiped = (direction, nameToDelete) => {
    console.log('swiped!');
    console.log(propertyPairs[propertyPairs.length-1]);
    if (propertyPairs[0]){
        let chosenIndex, loserIndex;

        if (direction == 'left'){            
            for (let i = 0; i < properties.length; i++){
                if (properties[i] == propertyPairs[propertyPairs.length-1][0]){
                    chosenIndex = i;
                }
                if (properties[i] == propertyPairs[propertyPairs.length-1][1]){
                    loserIndex = i;
                }
            }
            
        } else if (direction == 'right'){
            for (let i = 0; i < properties.length; i++){
                if (properties[i] == propertyPairs[propertyPairs.length-1][1]){
                    chosenIndex = i;
                }
                if (properties[i] == propertyPairs[propertyPairs.length-1][0]){
                    loserIndex = i;
                }
            }  
        }

        let tempProps = properties;
        console.log(direction + " " + chosenIndex + " " + loserIndex);
        if (loserIndex < chosenIndex){
            let temp = properties[loserIndex];
            tempProps[loserIndex] = tempProps[chosenIndex];
            tempProps[chosenIndex] = temp;
        }
        setProperties(tempProps);
        console.log(properties);
    }
  };

  const outOfFrame = async(name) => {
    console.log(name + " left the screen!");
    setPropertyPairs(propertyPairs => propertyPairs.filter(pair => pair.toString() !== name));
  };
  const tinderOffset = 350;

  return (
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
        <h1  style={{ position: "absolute" ,top:-tinderOffset}}>Set your preferences</h1>
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
                        <MyTinderCard type='prefs' prefs={pair}/>
                </TinderCard>
            </>
        ))}
        {propertyPairs[0] ? 
            <div style={{position: 'relative', top: tinderOffset/1.2, width: '85%', display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                <Button size='large' style={{color:'black', fontWeight: 'bold'}}>{propertyPairs[propertyPairs.length-1][0]}</Button>
                <Button style={{color:'black', fontWeight: 'bold'}}>{propertyPairs[propertyPairs.length-1][1]}</Button>

            </div>
            : null
        }
    </div>
  );
}

export default TinderPrefs;
