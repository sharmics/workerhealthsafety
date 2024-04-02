import React, { useState, useEffect } from 'react';
import '../IndoorMap/IndoorMap.css';
import { useLocation, useParams } from 'react-router-dom';
import data_set from "../../Services/DataService"

const IndoorMap = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [workers, setWorkers] = useState([]);
  const [markers, setMarkers] = useState([]);
  const { workerId, zoneId } = useParams();
  const [MapToggle, setMapToggle] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setMapToggle(location.pathname === `/dashboard/zone/${zoneId}` || location.pathname === `/dashboard/zone-map/${zoneId}`);
  }, [location.pathname, zoneId]);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        let filteredWorkers;
        if (MapToggle) {
          filteredWorkers = data_set().workers.filter(worker => worker.zone_id === zoneId);
        } else {
          filteredWorkers = data_set().workers.filter(worker => worker.worker_id === workerId);
        }
        setWorkers(filteredWorkers);
      } catch (error) {
        console.error('Error fetching worker data:', error);
      }
    };
    fetchWorkers();
  }, [MapToggle, workerId, zoneId]);

  useEffect(() => {
    if (map) {
      updateMarkers();
    }
  }, [workers, map]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.woosmap.com/map/map.js?key=woos-48c80350-88aa-333e-835a-07f4b658a9a4&callback=initMap&libraries=widgets';
    script.defer = true;
    document.body.appendChild(script);

    window.initMap = initMap;

    return () => {
      document.body.removeChild(script);
      delete window.initMap;
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedWorkers = workers.map(worker => ({
        ...worker,
        live_location: {
          lat: worker.live_location.lat + getRandomOffset(),
          long: worker.live_location.long + getRandomOffset(),
        },
      }));
      setWorkers(updatedWorkers);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [workers]);

  const getRandomOffset = () => (Math.random() - 0.5) * 0.001;

  const initMap = () => {
    const newMap = new window.woosmap.map.Map(document.getElementById("map"), {
      zoom: 20,
      center: { lat: 48.88115758013444, lng: 2.3562935123187856 }
    });

    const conf = {
      defaultFloor: 0,
      venue: "gdn_doc",
      responsive: "desktop",
    };
    const widgetConf = {
      units: "metric",
    };
    const indoorRenderer = new window.woosmap.map.IndoorWidget(widgetConf, conf);

    indoorRenderer.setMap(newMap);

    setMap(newMap);
    setMapLoaded(true);
  };

  const updateMarkers = () => {
    markers.forEach(marker => {
      marker.setMap(null);
      marker.unbindAll();
    });

    const newMarkers = workers.map(worker => {
      const marker = new window.woosmap.map.Marker({
        position: { lat: worker.live_location.lat, lng: worker.live_location.long },
        map: map,
        label: worker.name,
        icon: {
          labelOrigin: new window.woosmap.map.Point(12, -10),
          url: "https://images.woosmap.com/marker-red.png",
          scaledSize: new window.woosmap.map.Size(20, 30)
        }
      });

      marker.addListener("click", () => {
        console.log(`Worker ${worker.name} clicked - Lat: ${worker.live_location.lat}, Lng: ${worker.live_location.long}`);
        console.log("Worker details:", worker);
      });

      return marker;
    });
    setMarkers(newMarkers);
  };

  return (
    <div id="app" style={{ width: '100%', height: '100%' }}>
      {!mapLoaded && (
        <div className="progress">
          <div className="spinner"></div>
        </div>
      )}
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default IndoorMap;
