import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import MyTinderCard from "../tinder/MyTinderCard";
import { Button, CircularProgress, Typography, } from "@mui/material";
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
       <Typography
        gutterBottom
        variant="h3"
        sx={{
          textAlign: "center",
          color: "#D993A7",
          fontFamily: "Brush Script MT, cursive",
          position: "absolute", 
          top: -tinderOffset,
          marginTop: "20px"
        }}
      >
        {" "}
        For You
      </Typography>
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
            <MyTinderCard title={card.product.name + ", $" + card.product.price} image={card.product.tinder_image_url} />
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
          <Button  style={{color: "#000", fontFamily: "Brush Script MT, cursive", fontWeight: "bold", fontSize:"22px" }}>
            Nope
          </Button>
          <Button style={{ color: "#000", fontFamily: "Brush Script MT, cursive", fontWeight: "bold", fontSize:"22px" }}>Like</Button>
        </div>
      ) : null}
    </div>
  );
}

export default TinderMain;
