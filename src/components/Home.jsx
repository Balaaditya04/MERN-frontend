// import { useState } from "react";

// export default function Home() {
//   const [score, setScore] = useState(0);
//   const [wickets, setWickets] = useState(0); 

//   const Runs = () => {
//     setScore(score + 1);
//   };

//   const handleWicket = () => { 
//     if (wickets < 10) {
//       setWickets(wickets + 1);
//     }
//   };

//   return (
//     <>
//       <p>Score: {score}</p>
//       <p>Wickets: {wickets}</p>
//       <button onClick={Runs}>Run</button>
//       <button onClick={handleWicket}>Wicket</button>
//     </>
//   );
// 


import { useState } from "react";

export default function Home() {
  const [score, setScore] = useState(0);
  const [wickets, setWickets] = useState(0);

  const handleRun = () => {
    setScore(score + 1);
  };

  const handleWicket = () => {
    if (wickets < 10) {
      setWickets(wickets + 1);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>

      <div>
        <button onClick={handleRun}>Run</button>

        <p>Score: {score}</p>
        <p>Wickets: {wickets}</p>

        <button onClick={handleWicket}>Wicket</button>
      </div>

      <div>
        {wickets === 10 && (
          <h2 style={{ color: "green" }}>WELL DONE</h2>
        )}
      </div>
    </div>
  );
}


