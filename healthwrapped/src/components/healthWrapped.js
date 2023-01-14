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
  let walking_dist = [];
  let heartRateAvg = [];
  let heartRateMax = [];

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

        if (data[i]["Heart Rate [Max] (count/min)"] != null) {
          heartRateMax.push(data[i]["Heart Rate [Max] (count/min)"]);
          heartRateAvg.push(data[i]["Heart Rate [Avg] (count/min)"]);
        }
      }
      // console.log("Heart Max: ", heartRateMax);
      // console.log("Heart avg: ", heartRateAvg);
      // console.log("Walking Dist: ", walking_dist);
      setAvgHeartAvg(average(heartRateAvg));
      setHeartMax(Math.max(...heartRateMax));
      console.log(walking_dist)
      setTotalWalkingDist(sum(walking_dist));
      setAvgWalkingDist(average(walking_dist));
      setMaxWalkingDist(Math.max(...walking_dist));
      
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
      
      <h2>Average Heart Rate For 2022: {avgHeartAvg} beats/min</h2>
      <h2>Max Heart Rate for 2022: {maxHeart} beats/min </h2>
      <h2>The average distance you walked/ran per day was: {avgWalkingDist} miles</h2>
      <h2>The total you walked/ran was: {totalWalkingDist} miles</h2>
      <h2>The max you walked/ran in one day was: {maxWalkingDist} miles</h2>
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