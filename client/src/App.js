import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import InputItem from "./components/InputItem";
import ListItems from "./components/ListItems";

function App() {
  const [parentFolderId, setParentFolderId] = useState(0);
  const [renderList, setRenderList] = useState(0);


  useEffect(() => {
   

    const logIp = async (ipData) => {
      
      try {
        await fetch("/ip", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ipData),
        });
      } catch (err) {
        console.log(err.message);
      }
    };

    const getGeoLoc = async () => {
      try {
        const response = await fetch("https://geolocation-db.com/json/");
        await response.json().then((geoLoc) => {
          const ipData = {
            "ip": geoLoc.IPv4,
            "lat": geoLoc.latitude,
            "lon": geoLoc.longitude,
          };
          logIp(ipData);
        });
     
      } catch (err) {
        console.log(err.message);
      }

      return null;
    };

    getGeoLoc();
  }, []);


  return (
    <Fragment>
      <div className="container">
        <div className="py-5">
          <InputItem
            setParentFolderId={setParentFolderId}
            parentFolderId={parentFolderId}
            setRenderList={setRenderList}
            renderList={renderList}
          />
        </div>
        <div className="p-3">
          <ListItems
            setParentFolderId={setParentFolderId}
            parentFolderId={parentFolderId}
           
            renderList={renderList}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
