import fetch from "../include/fetch.js";
import readline from "readline";
// TODO - Now its your turn to make the working example! :)

/*  -The API we are using provides data for the Formula One (F1) series.
    -It provides following data 
      * Standings: To list the driver standings after a specific race or end of a season
    -We are fetching top 3 standings after a particular race or a season  
    We are using the following API
        * Standings after a particular race 
            "http://ergast.com/api/f1/2022/5/driverStandings"
            "http://ergast.com/api/f1/<season>/<round>/driverStandings"
        * Standings after a particular season 
            "http://ergast.com/api/f1/2022/driverStandings"
            "http://ergast.com/api/f1/<season>/driverStandings"
    And then we are fetching DOB of the racer who got the fist position in Standings
        * for that we are using the following API
            "http://ergast.com/api/f1/drivers/"<driversId>.json"
*/
interface f1 {
  position: number;
  driverId: string;
  Name: string;
  points: string;
  Team: string;
}
interface driver {
  position: string;
  points: string;
  Driver: {
    driverId: string;
    givenName: string;
    familyName: string;
    nationality: string;
  };
  Constructors: [
    {
      constructorId: string;
      name: string;
    }
  ];
}

// this function will fetch top 3 positions after a particular season or a round.
export function fetchStandings(season: number, round?: number): Promise<f1[]> {
  if (season % 1 > 0 || season < 1950 || season > 2023) {
    return Promise.reject(new Error("data only consist for seasons 1950 to 2023"));
  }
  const seasonString = season.toString();
  let url;
  if (round) {
    // if the user has provided round, include round in the url
    if (round % 1 > 0 || round < 1 || round > 99) {
      return Promise.reject(new Error("round does not exist!"));
    }
    const roundString = round.toString();
    url = new URL("http://ergast.com/api/f1/" + seasonString + "/" + roundString + "/driverStandings.json");
  }
  // else just include the season
  else {
    url = new URL("http://ergast.com/api/f1/" + seasonString + "/driverStandings.json");
  }
  return fetch(url)
    .then(response =>
      response.ok ? response.json() : Promise.reject(new Error(`Error in response: ${response.statusText}`))
    )
    .then(json => {
      const result: f1[] = [];
      // if there is no data found, return empty array
      if (json.MRData.StandingsTable.StandingsLists.length === 0) {
        return Promise.resolve([]);
      }
      json.MRData.StandingsTable.StandingsLists[0].DriverStandings.forEach((ele: driver) => {
        const v: f1 = {
          position: Number.parseFloat(ele.position),
          driverId: ele.Driver.driverId,
          Name: ele.Driver.givenName + " " + ele.Driver.familyName,
          points: ele.points,
          Team: ele.Constructors[0].name,
        };
        result.push(v);
      });
      return Promise.resolve(result.filter((ele: f1) => ele.position <= 3));
    });
}

// this function will fetch the Date of Birth of the person -
// who got first position after a particular season or a round is ended.
// the query of this function is taken from the result of fetchStandings.

interface DOB {
  dob: string;
}

function fetchDOB(driversId: string): Promise<DOB> {
  const url = new URL("http://ergast.com/api/f1/drivers/" + driversId + ".json");
  return fetch(url)
    .then(response =>
      response.ok ? response.json() : Promise.reject(new Error(`Error in response: ${response.statusText}`))
    )
    .then(json => {
      return Promise.resolve(json.MRData.DriverTable.Drivers[0].dateOfBirth);
    });
}

// taking input from the user and printing result in the terminal

const ques = readline.createInterface({ input: process.stdin, output: process.stdout });
ques.question("For which season you need the standings? ", (answer: string) => {
  const seasonIn = Number.parseFloat(answer);
  if (Number.isNaN(seasonIn)) {
    throw new Error("Please enter a 4 digit integer!!");
  }

  ques.question("Type YES if you want the standings after a particular round else type NO!", (answer2: string) => {
    if (answer2 === "YES" || answer2 === "yes") {
      ques.question("Enter a particular round: ", (x: string) => {
        const roundIn = Number.parseFloat(x);
        if (Number.isNaN(roundIn)) {
          throw new Error("round does not exist!");
        }
        const promise = fetchStandings(seasonIn, roundIn);
        promise.then(data => {
          console.log(data);
          console.log("The Date of Birth of the racer on the 1st position is: ");
          fetchDOB(data[0].driverId).then(DOB => console.log(DOB));
          ques.close();
        });
      });
    } else {
      const promise = fetchStandings(seasonIn);
      promise.then(data => {
        console.log(data);
        console.log("The Date of Birth of the racer on the 1st position is: ");
        fetchDOB(data[0].driverId).then(DOB => console.log(DOB));
        ques.close();
      });
    }
  });
});
