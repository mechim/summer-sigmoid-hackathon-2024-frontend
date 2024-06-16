import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import MyTinderCard from "../tinder/MyTinderCard";
import { Button } from "@mui/material";
const productData = [
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9cSGzVkaZvJD5722MU5A-JJt_T5JMZzotcw&s',
        name: 'T9X Note 9'
    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9cSGzVkaZvJD5722MU5A-JJt_T5JMZzotcw&s',
        name: 'Redmi'
    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9cSGzVkaZvJD5722MU5A-JJt_T5JMZzotcw&s',
        name: 'IPhone'
    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9cSGzVkaZvJD5722MU5A-JJt_T5JMZzotcw&s',
        name: 'China'
    },
]

function TinderMain() {
    const [products, setProducts] = useState(productData);
    const [direction, setDirection] = useState('');

  const swiped = (direction, nameToDelete) => {
    console.log('swiped!');
    setDirection(direction.toString());
    if (direction == 'left'){            
           
    } else if (direction == 'right'){
        
    }

  };
  const tinderOffset = 350;

  const outOfFrame = async(name) => {
    console.log(name + " left the screen!");
    setProducts(products => products.filter(product => product.name !== name));
  };

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
        <h1  style={{ position: "absolute" ,top:-tinderOffset}}>For You</h1>
        <h2 style={{ position: "absolute" }}>
            No more products Left
        </h2>
        {products.map((product) => (
            <>
                <TinderCard
                    className="swipe"
                    onSwipe={(dir) => swiped(dir, product.name)}
                    key={product.name}
                    onCardLeftScreen={() => outOfFrame(product.name)}
                    preventSwipe={["down", "up"]}
                    swipeRequirementType="velocity"
                    swipeThreshold={1}
                    >
                        <MyTinderCard title={product.name} image={product.image}/>
                </TinderCard>
            </>
        ))}
        {products[0] ? 
            <div style={{position: 'relative', top: tinderOffset/1.2, width: '85%', display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                <Button size='large' style={{color:'black', fontWeight: 'bold'}}>Nope</Button>
                <Button style={{color:'black', fontWeight: 'bold'}}>Like</Button>

            </div>
            : null
        }
    </div>
  );
}

export default TinderMain;
