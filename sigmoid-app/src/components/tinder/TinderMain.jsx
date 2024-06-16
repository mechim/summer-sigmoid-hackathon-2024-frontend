import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import MyTinderCard from "../tinder/MyTinderCard";
import { Button, CircularProgress } from "@mui/material";
import api from "../../axios";

function TinderMain() {
  const [cards, setCards] = useState([]);
  // const [direction, setDirection] = useState('');
  // const [ids, setIds] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
       try {
        const response = await api.post("/ratings/get-tc/2", {parameters_priority: JSON.parse(localStorage.getItem("my-prefs"))});
        console.log(response.data);
        // localStorage.setItem("tinder-cards", JSON.stringify(response.data));
        setCards(response.data.cards.reverse());
      } catch (error) {
        alert(error.message);
      }
      // console.log(JSON.parse(localStorage.getItem("tinder-cards")));
      // setCards(JSON.parse(localStorage.getItem("tinder-cards")).cards);
      localStorage.setItem("ids", JSON.stringify([]));
    };
    console.log('kill yourself');
    fetchCards();
  }, []);

  const handleLike = (id) => {
    const newIds = [...JSON.parse(localStorage.getItem("ids")), id];
    // setIds(newIds);
    localStorage.setItem("ids", JSON.stringify(newIds));
  };
  const swiped = (direction, idToLike) => {
    console.log("swiped!");
    // setDirection(direction.toString());
    if (direction == "right") {
      handleLike(idToLike);
    }
  };
  const tinderOffset = 350;

  const outOfFrame = async (id) => {
    console.log(id + " left the screen!");
    setCards((cards) =>
    cards.filter((card) => card.product.id !== id)
    );
  };
  function findProperty (item){
    let max, maxInd;
    max = item.values[0];
    for (let i = 0; i < item.values.length-1; i++){
      if (item.values[i]> max){
        max = item.values[i];
        maxInd = i;
      }
    }
    console.log(item.product.category.parameters_list[maxInd]);
    return [item.product.category.parameters_list[maxInd], max];
    
    
  }

  return (
    !cards[0]? <div style={{position: 'absolute', top:tinderOffset, left:170}}> 
    <CircularProgress/>
    {/* Getting recommendations based on your preferences... */}
    </div> :
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
      <h1 style={{ position: "absolute", top: -tinderOffset }}>For You</h1>
      <h2 style={{ position: "absolute" }}>No more products Left</h2>
      {cards.map((card) => (
        <>
          <TinderCard
            className="swipe"
            onSwipe={(dir) => swiped(dir, card.product.id)}
            key={card.product.name}
            onCardLeftScreen={() => outOfFrame(card.product.id)}
            preventSwipe={["down", "up"]}
            swipeRequirementType="velocity"
            swipeThreshold={1}
          >
            <MyTinderCard title={card.product.name + ", $" + card.product.price} image={card.product.tinder_image_url} text={findProperty(card)} />
          </TinderCard>
        </>
      ))}
      {cards[0] ? (
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
            Nope
          </Button>
          <Button style={{ color: "black", fontWeight: "bold" }}>Like</Button>
        </div>
      ) : null}
    </div>
  );
}

export default TinderMain;
