import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";

const data = [
  {
    name: "John Doe",
    url: "https://via.placeholder.com/300/FF5733/FFFFFF?text=John+Doe",
  },
  {
    name: "Jane Smith",
    url: "https://via.placeholder.com/300/33FF57/FFFFFF?text=Jane+Smith",
  },
  {
    name: "Steve Brown",
    url: "https://via.placeholder.com/300/3357FF/FFFFFF?text=Steve+Brown",
  },
];

function Tinder() {
  const [people, setPeople] = useState(data);
  useEffect(() => {
    console.log("KILL YOURSELF");
  }, []);

  const swiped = (direction, nameToDelete) => {
    console.log("swiped!");
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
    setPeople((people) => people.filter((person) => person.name !== name));
    console.log(people);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        justifyItems: "center",
      }}
    >
      {/* <div className="cardContainer"> */}
      <h2 style={{ position: "absolute", top: 500 }}>No more People Left</h2>
      {people.map((person) => (
        <TinderCard
          className="swipe"
          onSwipe={(dir) => swiped(dir, person.name)}
          key={person.name}
          onCardLeftScreen={() => outOfFrame(person.name)}
          preventSwipe={["down", "up"]}
        >
          <div
            style={{
              // backgroundImage: 'url(' + person.url + ')',
              position: "relative",
              // backgroundSize: 'cover',
              backgroundColor: "gray",
              backgroundPosition: "center",
              width: 300,
              maxWidth: 600,
              height: 400,
              maxHeight: 800,
              borderRadius: 15,
              marginTop: 800,
              borderColor: "black",
              border: "solid black 2px",
              //   boxShadow: 0px 18px 50px -5px rgba(0, 0, 0, 0.3),
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              padding: 20,
              boxSizing: "border-box",
              color: "white",
              fontSize: 24,
            }}
          >
            <h3>{person.name}</h3>
          </div>
        </TinderCard>
      ))}
      {/* </div> */}
    </div>
  );
}

export default Tinder;
