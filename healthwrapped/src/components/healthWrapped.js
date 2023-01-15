import React, { useState, useEffect } from "react";
import Papa from 'papaparse';
import csv from '../assets/HealthAutoExport.csv'
function HealthWrapped() {
  const [data, setData] = useState([]);
  const [avgHeartAvg, setAvgHeartAvg] = useState();
  const [maxHeart, setHeartMax] = useState();
  const [totalWalkingDist, setTotalWalkingDist] = useState();
  const [avgWalkingDist, setAvgWalkingDist] = useState();
  const [maxWalkingDist, setMaxWalkingDist] = useState();
  const [maxFlightsClimbned, setMaxFlightsClimbed] = useState();
  const [averageFlightsClimbed,setAverageFlightsClimbed] = useState();
  const [averageStepCount,setAverageStepCount] = useState();
  const [averageWalkingSpeed, setAverageWalkingSpeed] = useState();
  const [totalStepCount, setTotalStepCount] = useState();
  const [totalFlightsClimbed,setTotalFlightsClimbed] = useState();
  let walking_dist = [];
  let heartRateAvg = [];
  let heartRateMax = [];
  let stepCount = [];
  let flightsClimbed = [];
  let walkingSpeed = [];

  const sum =(arr) => {
    console.log(arr.reduce((a,b) => a+b))
    return arr.reduce((a,b) => a+b)
  }

  const average = (arr) => {
    return sum(arr) / arr.length;
  }

  const doStats = () => {
      for (let i = 0; i < data.length; i++) {
        if(data[i]["Walking + Running Distance (mi)"] != undefined){
          walking_dist.push(data[i]["Walking + Running Distance (mi)"]);
        }
        if(data[i]['Walking Speed (mi/hr)']){
          walkingSpeed.push(data[i]['Walking Speed (mi/hr)'])
        }
        if(data[i]["Step Count (count)"]){
          stepCount.push(data[i]['Step Count (count)'])
        }
        if(data[i]["Flights Climbed (count)"]){
          flightsClimbed.push(data[i]["Flights Climbed (count)"])
        }


        if (data[i]["Heart Rate [Max] (count/min)"] != null) {
          heartRateMax.push(data[i]["Heart Rate [Max] (count/min)"]);
          heartRateAvg.push(data[i]["Heart Rate [Avg] (count/min)"]);
        }
      }
      let avgStep = parseInt(average(stepCount).toPrecision(5))
      setAvgHeartAvg(average(heartRateAvg).toPrecision(4));
      setHeartMax(Math.max(...heartRateMax).toPrecision(4));
      console.log(walking_dist)
      setTotalWalkingDist(sum(walking_dist).toPrecision(5));
      setAvgWalkingDist(average(walking_dist).toPrecision(4));
      setMaxWalkingDist(Math.max(...walking_dist).toPrecision(4));
      setMaxFlightsClimbed(Math.max(...flightsClimbed).toPrecision(4));
      setAverageFlightsClimbed(average(flightsClimbed).toPrecision(4));
      setAverageStepCount(avgStep.toLocaleString('en'));
      setAverageWalkingSpeed(average(walkingSpeed).toPrecision(3));
      setTotalStepCount(sum(stepCount).toLocaleString('en'))
      setTotalFlightsClimbed(sum(flightsClimbed).toLocaleString('en'))
      
  };
  const fetchData = async () => {
    const results = await Papa.parse(csv, {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: (results) => {
        setData(results.data);
        console.log(results)
      }
    });
    
  }
  useEffect(() => {
    fetchData();
  },[]);

  useEffect(()=> {
    if(data.length > 350){
      doStats()
    }
  },[data])








  return (
    <div>

        <h1 style={{ position: 'absolute', top: `100vh`, right: '25vw', fontSize: '3em', transform: `translate3d(0,-100%,0)`, lineHeight: '1em' }}>Your average heart rate was: {avgHeartAvg} beats/min<br></br> and you climbed a total of {totalFlightsClimbed} flights this year</h1>
        <h2 style={{ position: 'absolute', top: '-3vh', right: '13vw', fontSize: '4.5em', lineHeight: '1em'  }}>YOUR 2022 HEALTH WRAPPED</h2>
        <h1 style={{ position: 'absolute', top: '190vh', left: '10vw', fontSize: '3.4em', lineHeight: '1em'}}>You walked a total of: {totalWalkingDist} miles <br></br> which is a crazy {totalStepCount} steps! <br></br></h1>
        <h1 style={{ position: 'absolute', top: '260vh', right: '1vw', fontSize: '3em', lineHeight: '1.2em' }}>The average distance you walked <br></br> per day was: {avgWalkingDist} miles <br></br> Which is {averageStepCount} steps</h1>

        <h1 style={{ position: 'absolute', top: '350vh', left: '5vw',fontSize: '3em', lineHeight: '1em' }}> On your busiest day you <br></br> walked {maxWalkingDist} miles, <br></br> climbed {maxFlightsClimbned} flights and had <br></br>  a {maxHeart} beats/min heart rate</h1>
        <h2 style={{ position: 'absolute', top: '370vh', left: '5vw', fontSize: '5em', lineHeight: '1em'  }}>I'm proud of you</h2>
        <h1 style={{ position: 'absolute', top: '450vh', right: '3vw', fontSize: '3em', lineHeight: '1em' }}>
          You're a speedy one,<br></br> averaging {averageWalkingSpeed} MPH
          <br />
          
        </h1>
      {/* <h2>Average Heart Rate For 2022: {avgHeartAvg} beats/min</h2>
      <h2>Max Heart Rate for 2022: {maxHeart} beats/min </h2>
      <h2>The average distance you walked/ran per day was: {avgWalkingDist} miles</h2>
      <h2>The total you walked/ran was: {totalWalkingDist} miles</h2>
      <h2>The max you walked/ran in one day was: {maxWalkingDist} miles</h2> */}
    </div>

  );
}

export default HealthWrapped;


  // useEffect(() => {
  //   Papa.parse(csv, {
  //     header: true,
  //     download: true,
  //     dynamicTyping: true,
  //     complete: (results) => {
  //       setData(results.data);
  //       console.log(data.length)
  //     },
  //   });
  // }, []);