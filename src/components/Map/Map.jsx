// import React, { useEffect, useState } from 'react';
// import { GoogleMapsOverlay as DeckOverlay } from "@deck.gl/google-maps";
// import {
//   GeoJsonLayer,
//   ScatterplotLayer,
//   ArcLayer,
//   IconLayer
// } from "@deck.gl/layers";
// import {data} from "./data"
// import { Marker } from '@react-google-maps/api';
// let startpoint=[];
// let endpoint=[];
// let markerarr=[]

// const Map = () => {
//   const [mapobj, setMapObject]= useState(null)
//   const [zoomlevel, setZoomLevel]= useState(3)
//   const [scatteroverlay, setScatterOverlay]= useState(null)
//   const [clicked, setButtonClicked]= useState(false)
//   const [clearclicked, setclearclicked]= useState(false)
//  // const [markerarr, setMarkerarr]= useState([]);
//   const [polyline, setPolyline]= useState(null)
//   // const [startpoint, setStartPoint]= useState([])
//   // const [endpoint, setEndPoint]= useState([])
//   let datamain=data
//   console.log("final", datamain)
//   let map=mapobj
//   useEffect(()=>{
//     if(clicked==true){
//      makeroutedistance(startpoint, endpoint )
//       setButtonClicked(false)

//     }

//   },[clicked])
// useEffect(()=>{

//     if(clearclicked==true){
//       markerarr.forEach((marker)=>{
//         marker.setMap(null)
//       })
//       console.log('inside clear')
//       markerarr=[]
//     //setMarkerarr([])
//     setButtonClicked(false)
//    setclearclicked(false)
//     startpoint=[]
//     endpoint=[]
//     if(polyline){

//     polyline.setMap(null);
//     setPolyline(null)
//     }

//     }

//  },[clearclicked])

//   function makeroutedistance(start, end){
//     //polyline?polyline.setMap(null):null
//     console.log("start", start, end)

//     // Create a new instance of the DirectionsService
// const directionsService = new window.google.maps.DirectionsService();
// const directionsRenderer = new window.google.maps.DirectionsRenderer();

// // Create a new instance of the DistanceMatrixService
// const distanceMatrixService = new window.google.maps.DistanceMatrixService();

// // Define the origin and destination coordinates
// const origin = new window.google.maps.LatLng(start[0],start[1]);
// const destination = new window.google.maps.LatLng(end[0],end[1]);

// // Define the options for the distance matrix request
// const distanceMatrixOptions = {
//   origins: [origin],
//   destinations: [destination],
//   travelMode: 'DRIVING',
//   unitSystem: window.google.maps.UnitSystem.METRIC,
// };

// // Call the distance matrix service to get the distance and duration
// distanceMatrixService.getDistanceMatrix(distanceMatrixOptions, (response, status) => {
//   if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
//     const distance = response.rows[0].elements[0].distance.text;
//     const duration = response.rows[0].elements[0].duration.text;

//     console.log('Distance:', distance);
//     console.log('Duration:', duration);

//     // Define the request for the directions service
//     const directionsRequest = {
//       origin: origin,
//       destination: destination,
//       travelMode: 'DRIVING',
//     };

//     // Call the directions service to get the route
//     directionsService.route(directionsRequest, (result, status) => {
//       if (status === 'OK') {
//          directionsRenderer.setDirections(result);
//         console.log("markerarr", markerarr)
//       setPolyline(directionsRenderer)

//         markerarr.forEach((marker) => {
//           marker.setMap(null);

//         });

//         //live trackiing

//         const route = result.routes[0];
//     const routeLeg = route.legs[0];
//     const steps = routeLeg.steps;

//     // Create a marker for live tracking
//     const marker = new window.google.maps.Marker({
//       map: map,
//       icon: {
//         //url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgString),
//         url:"https://cdn-icons-png.flaticon.com/128/1048/1048320.png",
//         scaledSize: new window.google.maps.Size(32, 32), // Adjust the size of the marker
//       },
//     });
//     markerarr.push(marker)

//     let currentStepIndex = 0;
//     let currentStep = steps[currentStepIndex];
//     let currentStepPoints = window.google.maps.geometry.encoding.decodePath(currentStep.polyline.points);
//     let currentPointIndex = 0;

//     function updateMarkerPosition() {
//       if (currentPointIndex < currentStepPoints.length) {
//         const currentPosition = currentStepPoints[currentPointIndex];
//         marker.setPosition(currentPosition);
//         currentPointIndex++;
//       } else if (currentStepIndex < steps.length - 1) {
//         currentStepIndex++;
//         currentStep = steps[currentStepIndex];
//         currentStepPoints = window.google.maps.geometry.encoding.decodePath(currentStep.polyline.points);
//         currentPointIndex = 0;
//       } else {
//         // Tracking completed
//         clearInterval(trackingInterval);
//       }
//     }

//     // Update the marker position every 1 second
//     const trackingInterval = setInterval(updateMarkerPosition, 300);
//         //live tracking

//       } else {
//         console.log('Directions request failed:', status);
//       }

//       // if (status === 'OK') {
//       //   let directionrender= directionsRenderer.setDirections(result);
//       //   markerarr.forEach((marker) => {
//       //         marker.setMap(null);
//       //       });

//       //   // Get the route polyline
//       //   const routePolyline = directionsRenderer.getDirections().routes[0].overview_polyline;
//       //   directionsRenderer.setDirections(null)

//       //   // Create a new instance of the google.maps.Polyline

//       //   const polyline = new window.google.maps.Polyline({
//       //     path: window.google.maps.geometry.encoding.decodePath(routePolyline),
//       //     strokeColor: '#ff0000', // Set the color of the polyline

//       //     //strokeOpacity: 0.8,
//       //     strokeWeight: 8,
//       //     map: map,
//       //   });
//       //   setPolyline(polyline)

//       //   // Add event listeners for mouseover and mouseout events
//       //   polyline.addListener('click', function () {
//       //     console.log("hovered")
//       //    // polyline.setOptions({ strokeWeight: 4 }); // Increase the stroke weight on hover
//       //   });

//       //   polyline.addListener('mouseout', function () {
//       //     polyline.setOptions({ strokeWeight: 2 }); // Reset the stroke weight on mouseout
//       //   });
//       // } else {
//       //   console.log('Directions request failed:', status);
//       // }
//     });
//   } else {
//     console.log('Error:', status);
//   }
// });

// // Display the map and directions

// directionsRenderer.setMap(mapobj);

//   }
//   function makemarker(location,){
//     console.log("location is", location)
//     console.log("marekerarr", markerarr)
//     console.log("start", startpoint,endpoint)

//      if(markerarr.length<2){
//        let marker = new window.google.maps.Marker({
//         position: location,
//         map: map,
//         draggable: true
//       });

//       let arr= markerarr
//       markerarr.push(marker);
//       markerarr=arr;
//       //setMarkerarr(arr)
//       console.log("arr is", arr)
//     }

//   }

//   useEffect(() => {
//     const initializeMap = () => {
//       const mapOptions = {
//         center: { lat: 24.7128, lng: 78.006 },
//         zoom:zoomlevel,
//       };
//      if(mapobj==null){
//      map= new window.google.maps.Map(document.getElementById('map'), mapOptions);
//      }
//   //  window.google.maps.event.addListener(map, 'zoom_changed', ()=>{
//   //     console.log("changed")
//   //     setZoomLevel(map.getZoom()+1)
//   //   });

//     map.addListener("click", (mapsMouseEvent) => {
//       let lat = mapsMouseEvent.latLng.lat()
//       let lng = mapsMouseEvent.latLng.lng()
//       makemarker(mapsMouseEvent.latLng)
//       if(startpoint.length==0){
//          startpoint.push(lat,lng)
//         //setStartPoint([lat, lng]);

//        }else if(startpoint.length>0){
//          console.log("inside else")
//          //setEndPoint([lat, lng]);
//          endpoint= [lat,lng]
//          //endpoint.push(lat,lng)
//        //makeroutedistance(startpoint, [lat, lng])

//        }
//      // makemarker(mapsMouseEvent.latLng)
//       console.log("lat", lat);
//       console.log("lng", lng)

//     })

//      setMapObject(map)
//      if(map.getZoom()<=6){
//        let sumLat = 0;
//   let sumLng = 0;

//   for (const coordinate of data) {
//     sumLat += coordinate.coordinates[1];
//     sumLng += coordinate.coordinates[0];
//   }

//   const meanLat = sumLat / data.length;
//   const meanLng = sumLng / data.length;
//   // datamain=[{
//   //   coordinates:[meanLng, meanLat]
//   // }]
//      }
//      console.log("final data", datamain)

//     //  const overlay = new DeckOverlay({
//     //   layers: [
//     //     new ScatterplotLayer({
//     //       id: 'scatterplot-layer',
//     //       data: datamain,
//     //       pickable: true,
//     //       opacity: 0.8,
//     //       stroked: true,
//     //       filled: true,
//     //       radiusScale: 10,
//     //       radiusMinPixels: 6,
//     //       radiusMaxPixels: 100,
//     //       lineWidthMinPixels: 1.2,
//     //      // visible:role==5? userData.commonreducer.adminPotentialToggle : userData.commonreducer.otherPotentialToggle ,
//     //       getPosition: d => d.coordinates,
//     //       getRadius: d => Math.sqrt(d.exits),
//     //       getFillColor:

//     //         [60, 179, 133]
//     //       // onClick: ((info) => {
//     //       //   dispatch(setPotentialCalloutData(null))
//     //       //  console.log("info is", info)
//     //       //   setInfoGid(info.object.rosequence_code)
//     //       //   fetchPotentialCalloutdata(info.object.rosequence_code)
//     //       //   if (info.coordinate != undefined) {
//     //       //     localStorage.setItem("LAT", info.object.coordinates[1])
//     //       //     localStorage.setItem("LNG", info.object.coordinates[0])
//     //       //     localStorage.setItem("UID",info.object.rosequence_code)
//     //       //     dispatch(HnadleCOMPUTE_FLAG(info.object.comp_status))
//     //       //   }

//     //       //   dispatch(handlePotentialCallout(true))
//     //       //   dispatch(clickedRoInfo(info))
//     //       // })
//     //     })
//     //   ]
//     // })
//     // overlay.setMap(map)
//     //setScatterOverlay(overlay)
//     };
//     // Load the Google Maps API script
//     const script = document.createElement('script');
//     script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB4NLdRCMpBJHH1DK1IdGNQNy0iwjOiSS8`;
//     script.async = true;
//     script.defer = true;
//     script.addEventListener('load', initializeMap);
//     document.body.appendChild(script);

//     // Initialize the map

//     return () => {
//       // Cleanup: Remove the Google Maps API script
//       script.removeEventListener('load', initializeMap);
//       document.body.removeChild(script);
//     };

//   }, []);
// //   useEffect(()=>{

// //     if(mapobj ){
// //       console.log("mapzoom", mapobj.getZoom())
// //     if(scatteroverlay){
// //       scatteroverlay.setMap(null);
// //     }
// //     let sumLat = 0;
// //   let sumLng = 0;

// //   for (const coordinate of data) {
// //     sumLat += coordinate.coordinates[1];
// //     sumLng += coordinate.coordinates[0];
// //   }

// //   const meanLat = sumLat / data.length;
// //   const meanLng = sumLng / data.length;
// //   if(mapobj.getZoom<=5){
// //   datamain=[{
// //     coordinates:[meanLng, meanLat]
// //   }]
// // }

// //     const overlay = new DeckOverlay({
// //       layers: [
// //         new ScatterplotLayer({
// //           id: 'scatterplot-layer',
// //           data: datamain,
// //           pickable: true,
// //           opacity: 0.8,
// //           stroked: true,
// //           filled: true,
// //           radiusScale: 10,
// //           radiusMinPixels: 6,
// //           radiusMaxPixels: 100,
// //           lineWidthMinPixels: 1.2,
// //          // visible:role==5? userData.commonreducer.adminPotentialToggle : userData.commonreducer.otherPotentialToggle ,
// //           getPosition: d => d.coordinates,
// //           getRadius: d => Math.sqrt(d.exits),
// //           getFillColor:

// //             [60, 179, 133]
// //           // onClick: ((info) => {
// //           //   dispatch(setPotentialCalloutData(null))
// //           //  console.log("info is", info)
// //           //   setInfoGid(info.object.rosequence_code)
// //           //   fetchPotentialCalloutdata(info.object.rosequence_code)
// //           //   if (info.coordinate != undefined) {
// //           //     localStorage.setItem("LAT", info.object.coordinates[1])
// //           //     localStorage.setItem("LNG", info.object.coordinates[0])
// //           //     localStorage.setItem("UID",info.object.rosequence_code)
// //           //     dispatch(HnadleCOMPUTE_FLAG(info.object.comp_status))
// //           //   }

// //           //   dispatch(handlePotentialCallout(true))
// //           //   dispatch(clickedRoInfo(info))
// //           // })
// //         })
// //       ]
// //     })
// //     overlay.setMap(map)
// //     setScatterOverlay(overlay)
// //   }

// //   },[zoomlevel])

//   return (
//     <div style={{position:"relative"}}>
//   <div id="map" style={{ height: '100vh', position:"relative" }}  >

//   </div>
//   <div style={{position:"absolute", left:"45%", bottom:"5%"}}>
//   <button style={{height:"50px", width:"100px", background:"skyblue"}}
//   onClick={()=>{
//     setButtonClicked(true)
//   }}
//   >makeroute</button>
//   <button style={{height:"50px", width:"100px", background:"red"}}
//   onClick={()=>{
//     setclearclicked(true)
//   }}
//   >clear</button>
//   </div>
//   </div>
//   )

// }

// export default Map;

import React, { useEffect, useState } from "react";
//simport { google } from 'googlemaps';
//import { GoogleMapsOverlay as DeckOverlay } from "@deck.gl/google-maps";
// import {
//   GeoJsonLayer,
//   ScatterplotLayer,
//   ArcLayer,
//   IconLayer
// } from "@deck.gl/layers";
import { message, Tooltip, Select } from "antd";
import InfoBox from "../InfoBox/InfoBox";
import { Marker } from "@react-google-maps/api";
let startpoint = [];
let endpoint = [];
let markerarr = [];

const Map = () => {
  const [mapobj, setMapObject] = useState(null);
  const [zoomlevel, setZoomLevel] = useState(3);
  const [scatteroverlay, setScatterOverlay] = useState(null);
  const [clicked, setButtonClicked] = useState(false);
  const [clearclicked, setclearclicked] = useState(false);
  const [calculateddistance, setCalculatedDistance] = useState("");
  const [directionrenderoverlay, setDirectionRenderOverlay] = useState(null);
  const [timetaken, setTime] = useState("");
  const [travelmode, setTravelMode] = useState("");
  const [showDirection, setShowDirection] = useState(false);
  const [selectedtype, setSelectedType] = useState("atm");
  const [resultroutes, setResultRoutes] = useState();
  const [poimarker, setPoiMarker] = useState([]);
  // const [markera, srr, setMarkerarr]= useState([]);
  const [polyline, setPolyline] = useState(null);
  // const [startpoint, setStartPoint]= useState([])
  // const [endpoint, setEndPoint]= useState([])
  let map = mapobj;
  //let map:google.maps.Map= mapobj;
  useEffect(() => {
    if (clicked === true) {
      makeroutedistance(startpoint, endpoint);
      setButtonClicked(false);
    }
  }, [clicked]);
  useEffect(() => {
    if (clearclicked === true) {
      markerarr.forEach((marker) => {
        marker.setMap(null);
      });
      console.log("inside clear");
      markerarr = [];
      //setMarkerarr([])
      setButtonClicked(false);
      setclearclicked(false);
      startpoint = [];
      endpoint = [];
      if (polyline) {
        polyline.setMap(null);
        setPolyline(null);
      }
    }
  }, [clearclicked]);

  function showpois(result, types) {
    let poimarkers = [];
    const placesService = new window.google.maps.places.PlacesService(map);
    result?.routes[0].legs[0].steps.forEach(function (step) {
      const latLng = step.end_location;

      // Perform a Places API search using the location coordinates
      const request = {
        location: latLng,
        radius: 300, // Search within a 1000m radius
        type: types, // Search for both ATMs and hospitals
      };

      placesService?.nearbySearch(request, function (results, status) {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          // Process the results
          results.forEach(function (place) {
            console.log("place is", place);
            const placeName = place.name;
            const placeAddress = place.vicinity;
            const placeLocation = place.geometry.location;

            const markerIcon = {
              url:
                place.types[0] === "hospital"
                  ? "https://cdn-icons-png.flaticon.com/128/2878/2878659.png"
                  : place.types[0] === "atm"
                  ? "https://cdn-icons-png.flaticon.com/128/385/385011.png"
                  : place.types[0] === "gas_station"
                  ? "https://cdn-icons-png.flaticon.com/128/2933/2933939.png"
                  : "https://cdn-icons-png.flaticon.com/128/11006/11006362.png", // Specify the path to your custom icon image
              scaledSize: new window.google.maps.Size(30, 30), // Set the desired size of the marker
            };

            const marker = new window.google.maps.Marker({
              position: placeLocation,
              map: map,
              title: placeName,
              icon: markerIcon,
              animation: window.google.maps.Animation.DROP,
            });
            poimarkers.push(marker);

            // Add a click event listener to the marker
            marker.addListener("click", function () {
              // Show place information or perform any other action
              console.log("Clicked Marker:", placeName);
            });
            // Retrieve place information
            //   const placeName = place.name;
            //   const placeAddress = place.vicinity;
            //   // Access other available properties of the place object

            //   // Do something with the retrieved information
            //   console.log('Place Name:', placeName);
            //   console.log('Place Address:', placeAddress);
          });
        }
      });
    });
    setPoiMarker(poimarkers);
  }
  let stepIndex = 0;
  const animateCarMarker = (steps, carmarker) => {
    if (stepIndex >= steps.length) {
      // Reached the end of the route
      return;
    }

    // Get the next step
    const step = steps[stepIndex];
    const position = step.start_location;
    const nextPosition = step.end_location;

    // Update the car marker position
    carmarker.setPosition(position);

    // Calculate the bearing (direction) between the current and next positions
    const bearing = window.google.maps.geometry.spherical.computeHeading(
      position,
      nextPosition
    );
    console.log("bearing is", bearing);

    // Set the car marker rotation (bearing)
    carmarker.setIcon({
      ...carmarker.getIcon(),
      rotation: bearing,
    });
    // carMarker.setRotation(bearing);

    // Increment the step index
    stepIndex++;

    // Move the car marker to the next position after a delay
    setTimeout(() => {
      animateCarMarker(steps, carmarker);
    }, 300); // Delay in milliseconds between each step
  };

  function makeroutedistance(start, end) {
    //polyline?polyline.setMap(null):null
    console.log("start", start, end);

    // Create a new instance of the DirectionsService
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      panel: document.getElementById("directions-panel"),
    });
    // const placesService = new window.google.maps.places.PlacesService(map);

    let trafficLayer = new window.google.maps.TrafficLayer();

    // Create a new instance of the DistanceMatrixService
    const distanceMatrixService =
      new window.google.maps.DistanceMatrixService();

    // Define the origin and destination coordinates
    const origin = new window.google.maps.LatLng(start[0], start[1]);
    const destination = new window.google.maps.LatLng(end[0], end[1]);

    // Define the options for the distance matrix request
    const distanceMatrixOptions = {
      origins: [origin],
      destinations: [destination],
      travelMode: travelmode,
      unitSystem: window.google.maps.UnitSystem.METRIC,
    };
    // type distacematrictype = {
    //     origins: any
    //     destinations: any
    //     travelMode: any
    //     unitSystem: any
    // }

    // Call the distance matrix service to get the distance and duration
    distanceMatrixService.getDistanceMatrix(
      distanceMatrixOptions,
      (response, status) => {
        if (status === "OK" && response?.rows[0].elements[0].status === "OK") {
          const distance = response.rows[0].elements[0].distance.text;
          const duration = response.rows[0].elements[0].duration.text;

          console.log("Distance:", distance);
          setCalculatedDistance(distance);

          console.log("Duration:", duration);
          setTime(duration);

          // Define the request for the directions service
          // type directionsRequesttype = {
          //     origin: any
          //     destination: any
          //     travelMode: any

          // }
          const directionsRequest = {
            origin: origin,
            destination: destination,
            travelMode: travelmode,
          };

          // Call the directions service to get the route
          directionsService.route(directionsRequest, (result, status) => {
            if (status === "OK") {
              console.log("result is", result);
              directionsRenderer.setDirections(result);

              directionsRenderer.setOptions({
                preserveViewport: true, // Optional: Preserve the current viewport
                //draggable: true, // Optional: Allow dragging the route
                polylineOptions: {
                  strokeColor: "red",
                  strokeWeight: 5, // Optional: Customize the route color
                },
                // suppressMarkers: true, // Optional: Suppress the default markers
                map: map,
                // trafficModel: google.maps.TrafficModel.BEST_GUESS,// Request live traffic data
              });

              // trafficLayer.setMap(map);

              //get pois
              //let types:string="atm"
              setResultRoutes(result);
              showpois(result, selectedtype);

              // result?.routes[0].legs[0].steps.forEach(function (step) {
              //     const latLng = step.end_location;

              //     // Perform a Places API search using the location coordinates
              //     const request = {
              //         location: latLng,
              //         radius: 1000, // Search within a 1000m radius
              //         types: ['hospital', "atm"] , // Search for both ATMs and hospitals
              //       } as google.maps.places.PlaceSearchRequest;
              //     placesService?.nearbySearch(request, function (results: any, status: any) {
              //         if (status === google.maps.places.PlacesServiceStatus.OK) {
              //             // Process the results
              //             results.forEach(function (place: any) {
              //                 console.log("place is", place)
              //                 const placeName = place.name;
              //                 const placeAddress = place.vicinity;
              //                 const placeLocation = place.geometry.location;

              //                 const markerIcon = {
              //                     url:  place.types[0]=="hospital"? "https://cdn-icons-png.flaticon.com/128/2878/2878659.png":"https://cdn-icons-png.flaticon.com/128/11006/11006362.png", // Specify the path to your custom icon image
              //                     scaledSize: new google.maps.Size(30, 30) // Set the desired size of the marker
              //                 };
              //                 const marker = new google.maps.Marker({
              //                     position: placeLocation,
              //                     map: map,
              //                     title: placeName,
              //                     icon: markerIcon
              //                 });

              //                 // Add a click event listener to the marker
              //                 marker.addListener('click', function () {
              //                     // Show place information or perform any other action
              //                     console.log('Clicked Marker:', placeName);
              //                 });
              //                 // Retrieve place information
              //                 //   const placeName = place.name;
              //                 //   const placeAddress = place.vicinity;
              //                 //   // Access other available properties of the place object

              //                 //   // Do something with the retrieved information
              //                 //   console.log('Place Name:', placeName);
              //                 //   console.log('Place Address:', placeAddress);
              //             });
              //         }
              //     });
              // });

              //get pois

              console.log("markerarr", markerarr);
              setPolyline(directionsRenderer);

              markerarr.forEach((marker) => {
                marker.setMap(null);
              });

              //live trackiing

              const route = result?.routes[0];
              const routeLeg = route?.legs[0];
              const steps = routeLeg?.steps;

              // Create a marker for live tracking
              const marker = new window.google.maps.Marker({
                map: map,
                icon: {
                  //url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgString),
                  url:
                    travelmode === "TRANSIT"
                      ? "https://cdn-icons-png.flaticon.com/128/1068/1068580.png"
                      : travelmode === "WALKING"
                      ? "https://cdn-icons-png.flaticon.com/128/7757/7757845.png"
                      : "https://cdn-icons-png.flaticon.com/128/1048/1048320.png",
                  scaledSize: new window.google.maps.Size(32, 32), // Adjust the size of the marker

                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(25, 25),
                },
                animation: window.google.maps.Animation.DROP,
              });
              markerarr.push(marker);

              let currentStepIndex = 0;
              let currentStep = steps && steps[currentStepIndex];
              let currentStepPoints =
                window.google.maps.geometry.encoding.decodePath(
                  currentStep.polyline.points
                );
              let currentPointIndex = 0;
              //const steps = route?.legs[0].steps;
              // animateCarMarker(steps, carmarker)

              const updateMarkerPosition = () => {
                if (currentPointIndex < currentStepPoints.length) {
                  const currentPosition = currentStepPoints[currentPointIndex];
                  marker.setPosition(currentPosition);
                  currentPointIndex++;
                } else if (steps && currentStepIndex < steps.length - 1) {
                  currentStepIndex++;
                  currentStep = steps && steps[currentStepIndex];
                  currentStepPoints =
                    window.google.maps.geometry.encoding.decodePath(
                      currentStep.polyline.points
                    );
                  currentPointIndex = 0;
                } else {
                  // Tracking completed
                  clearInterval(trackingInterval);
                }
              };

              ///rotate marker

              // animateCarMarker(steps,carmarker);

              //rotate marker

              // Update the marker position every 1 second
              const trackingInterval = setInterval(updateMarkerPosition, 50);
              //live tracking
            } else {
              console.log("Directions request failed:", status);
            }

            // if (status === 'OK') {
            //   let directionrender= directionsRenderer.setDirections(result);
            //   markerarr.forEach((marker) => {
            //         marker.setMap(null);
            //       });

            //   // Get the route polyline
            //   const routePolyline = directionsRenderer.getDirections().routes[0].overview_polyline;
            //   directionsRenderer.setDirections(null)

            //   // Create a new instance of the google.maps.Polyline

            //   const polyline = new window.google.maps.Polyline({
            //     path: window.google.maps.geometry.encoding.decodePath(routePolyline),
            //     strokeColor: '#ff0000', // Set the color of the polyline

            //     //strokeOpacity: 0.8,
            //     strokeWeight: 8,
            //     map: map,
            //   });
            //   setPolyline(polyline)

            //   // Add event listeners for mouseover and mouseout events
            //   polyline.addListener('click', function () {
            //     console.log("hovered")
            //    // polyline.setOptions({ strokeWeight: 4 }); // Increase the stroke weight on hover
            //   });

            //   polyline.addListener('mouseout', function () {
            //     polyline.setOptions({ strokeWeight: 2 }); // Reset the stroke weight on mouseout
            //   });
            // } else {
            //   console.log('Directions request failed:', status);
            // }
          });
        } else {
          console.log("Error:", status);
        }
      }
    );

    // Display the map and directions

    //directionsRenderer.setMap(mapobj);
    setDirectionRenderOverlay(directionsRenderer);
  }
  function makemarker(location) {
    console.log("location is", location);
    console.log("marekerarr", markerarr);
    console.log("start", startpoint, endpoint);

    if (markerarr.length < 2) {
      let marker = new window.google.maps.Marker({
        position: location,
        map: map,
        draggable: true,
        animation: window.google.maps.Animation.DROP,
      });

      let arr = markerarr;
      markerarr.push(marker);
      markerarr = arr;
      //setMarkerarr(arr)
      console.log("arr is", arr);
    }
  }

  useEffect(() => {
    const initializeMap = () => {
      const mapOptions = {
        center: { lat: 24.7128, lng: 78.006 },
        zoom: zoomlevel,
        styles: [
          {
            featureType: "poi",
            stylers: [
              { visibility: "off" }, // Hide the default poi icons
            ],
          },
        ],
      };
      if (mapobj == null && document.getElementById("map")) {
        const abc = document.getElementById("map");
        map = new window.google.maps.Map(abc, mapOptions);
      }

      //to auto zoom and center

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const { latitude, longitude } = position.coords;

            // Create a LatLng object using the user's current location
            const userLatLng = new window.google.maps.LatLng(
              latitude,
              longitude
            );

            // Set the map's center to the user's location
            //startpoint.push(latitude, longitude)

            const marker = new window.google.maps.Marker({
              position: userLatLng,
              draggable: true,
              icon: {
                url: "https://cdn-icons-png.flaticon.com/128/2536/2536667.png",
                scaledSize: new window.google.maps.Size(50, 50),
              },
              animation: window.google.maps.Animation.BOUNCE,
              map: map,
              title: "Your Location",
            });
            map.setCenter(userLatLng);

            // Adjust the zoom level of the map
            map.setZoom(15); // Experiment with different zoom levels
          },
          function (error) {
            // Handle geolocation error
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
      //to  suto zoom and center
      //  window.google.maps.event.addListener(map, 'zoom_changed', ()=>{
      //     console.log("changed")
      //     setZoomLevel(map.getZoom()+1)
      //   });

      map?.addListener("click", (mapsMouseEvent) => {
        let lat = mapsMouseEvent.latLng.lat();
        let lng = mapsMouseEvent.latLng.lng();
        console.log("lat ", lat);
        makemarker(mapsMouseEvent.latLng);
        if (startpoint.length === 0) {
          startpoint.push(lat, lng);
          //setStartPoint([lat, lng]);
        } else if (startpoint.length > 0) {
          console.log("inside else");
          //setEndPoint([lat, lng]);
          endpoint = [lat, lng];
          //endpoint.push(lat,lng)
          //makeroutedistance(startpoint, [lat, lng])
        }
        // makemarker(mapsMouseEvent.latLng)
        console.log("lat", lat);
        console.log("lng", lng);
      });

      setMapObject(map);
      // if (map.getZoom() <= 6) {
      //   let sumLat = 0;
      //   let sumLng = 0;

      //   for (const coordinate of data) {
      //     sumLat += coordinate.coordinates[1];
      //     sumLng += coordinate.coordinates[0];
      //   }

      //   const meanLat = sumLat / data.length;
      //   const meanLng = sumLng / data.length;
      //   // datamain=[{
      //   //   coordinates:[meanLng, meanLat]
      //   // }]
      // }

      //  const overlay = new DeckOverlay({
      //   layers: [
      //     new ScatterplotLayer({
      //       id: 'scatterplot-layer',
      //       data: datamain,
      //       pickable: true,
      //       opacity: 0.8,
      //       stroked: true,
      //       filled: true,
      //       radiusScale: 10,
      //       radiusMinPixels: 6,
      //       radiusMaxPixels: 100,
      //       lineWidthMinPixels: 1.2,
      //      // visible:role==5? userData.commonreducer.adminPotentialToggle : userData.commonreducer.otherPotentialToggle ,
      //       getPosition: d => d.coordinates,
      //       getRadius: d => Math.sqrt(d.exits),
      //       getFillColor:

      //         [60, 179, 133]
      //       // onClick: ((info) => {
      //       //   dispatch(setPotentialCalloutData(null))
      //       //  console.log("info is", info)
      //       //   setInfoGid(info.object.rosequence_code)
      //       //   fetchPotentialCalloutdata(info.object.rosequence_code)
      //       //   if (info.coordinate != undefined) {
      //       //     localStorage.setItem("LAT", info.object.coordinates[1])
      //       //     localStorage.setItem("LNG", info.object.coordinates[0])
      //       //     localStorage.setItem("UID",info.object.rosequence_code)
      //       //     dispatch(HnadleCOMPUTE_FLAG(info.object.comp_status))
      //       //   }

      //       //   dispatch(handlePotentialCallout(true))
      //       //   dispatch(clickedRoInfo(info))
      //       // })
      //     })
      //   ]
      // })
      // overlay.setMap(map)
      //setScatterOverlay(overlay)
    };
    // Load the Google Maps API script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB4NLdRCMpBJHH1DK1IdGNQNy0iwjOiSS8&libraries=places`;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", initializeMap);
    document.body.appendChild(script);

    // Initialize the map

    return () => {
      // Cleanup: Remove the Google Maps API script
      script.removeEventListener("load", initializeMap);
      document.body.removeChild(script);
    };
  }, []);
  //   useEffect(()=>{

  //     if(mapobj ){
  //       console.log("mapzoom", mapobj.getZoom())
  //     if(scatteroverlay){
  //       scatteroverlay.setMap(null);
  //     }
  //     let sumLat = 0;
  //   let sumLng = 0;

  //   for (const coordinate of data) {
  //     sumLat += coordinate.coordinates[1];
  //     sumLng += coordinate.coordinates[0];
  //   }

  //   const meanLat = sumLat / data.length;
  //   const meanLng = sumLng / data.length;
  //   if(mapobj.getZoom<=5){
  //   datamain=[{
  //     coordinates:[meanLng, meanLat]
  //   }]
  // }

  //     const overlay = new DeckOverlay({
  //       layers: [
  //         new ScatterplotLayer({
  //           id: 'scatterplot-layer',
  //           data: datamain,
  //           pickable: true,
  //           opacity: 0.8,
  //           stroked: true,
  //           filled: true,
  //           radiusScale: 10,
  //           radiusMinPixels: 6,
  //           radiusMaxPixels: 100,
  //           lineWidthMinPixels: 1.2,
  //          // visible:role==5? userData.commonreducer.adminPotentialToggle : userData.commonreducer.otherPotentialToggle ,
  //           getPosition: d => d.coordinates,
  //           getRadius: d => Math.sqrt(d.exits),
  //           getFillColor:

  //             [60, 179, 133]
  //           // onClick: ((info) => {
  //           //   dispatch(setPotentialCalloutData(null))
  //           //  console.log("info is", info)
  //           //   setInfoGid(info.object.rosequence_code)
  //           //   fetchPotentialCalloutdata(info.object.rosequence_code)
  //           //   if (info.coordinate != undefined) {
  //           //     localStorage.setItem("LAT", info.object.coordinates[1])
  //           //     localStorage.setItem("LNG", info.object.coordinates[0])
  //           //     localStorage.setItem("UID",info.object.rosequence_code)
  //           //     dispatch(HnadleCOMPUTE_FLAG(info.object.comp_status))
  //           //   }

  //           //   dispatch(handlePotentialCallout(true))
  //           //   dispatch(clickedRoInfo(info))
  //           // })
  //         })
  //       ]
  //     })
  //     overlay.setMap(map)
  //     setScatterOverlay(overlay)
  //   }

  //   },[zoomlevel])
  function showstates() {
    const stateCode = "ISO-3166"; // ISO-3166 country code for India
    const level = "1"; // Administrative level (1 for states)

    const url = `https://geojson.naturalearthdata.com/geojson/${stateCode}_${level}_polygons.geojson`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Process the GeoJSON data here
        // Draw the polygons on Google Maps or perform any other desired operations
        console.log("data is", data);
      })
      .catch((error) => {
        console.log("Error fetching polygon data:", error);
      });
  }

  return (
    <div style={{ width: "100vw", height: "100%", display: "flex" }}>
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: !showDirection ? "100vw" : "50vw",
        }}
      >
        <div
          id="map"
          style={{
            height: "100vh",
            width: !showDirection ? "100vw" : "50vw",
            position: "relative",
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            left: !showDirection ? "30%" : "5%",
            bottom: "5%",
            display: "flex",
            gap: "20px",
          }}
        >
          <button
            style={{
              height: "50px",
              width: "100px",
              background: "blue",
              borderRadius: "5%",
              border: "none",
              color: "white",
            }}
            disabled={polyline != null ? true : false}
            onClick={() => {
              if (travelmode) {
                setButtonClicked(true);
              } else {
                message.error("Please Select a Travel Mode First");
              }
            }}
          >
            Find Route
          </button>
          <button
            style={{
              height: "50px",
              width: "100px",
              background: "red",
              borderRadius: "5%",
              border: "none",
              color: "white",
            }}
            onClick={() => {
              setclearclicked(true);

              directionrenderoverlay?.setPanel(null);
              poimarker.forEach((marker) => {
                marker.setMap(null);
              });
            }}
          >
            Clear Route
          </button>
          <button
            style={{
              height: "50px",
              width: "100px",
              background: "orange",
              borderRadius: "5%",
              border: "none",
              color: "white",
            }}
            onClick={() => {
              setShowDirection(!showDirection);
            }}
          >
            {!showDirection ? "Show Direction" : "Hide Direction"}
          </button>
          {polyline ? (
            <Select
              showSearch
              placeholder="Select a POI"
              optionFilterProp="children"
              //disabled={!polyline?true:false}
              onChange={(val) => {
                setSelectedType(val);
                showpois(resultroutes, val);
                poimarker.forEach((marker) => {
                  marker.setMap(null);
                });
              }}
              //onSearch={onSearch}
              //filterOption={(input, option) =>
              //  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              // }
              options={[
                {
                  value: "atm",
                  label: "ATM",
                },
                {
                  value: "hospital",
                  label: "HOSPITAL",
                },
                {
                  value: "gas_station",
                  label: "GAS STATION",
                },
              ]}
            />
          ) : (
            ""
          )}

          <Tooltip title="DRIVING">
            <img
              src="https://cdn-icons-png.flaticon.com/128/7956/7956418.png"
              alt="driving-icon"
              style={{ width: "50px", height: "50px" }}
              onClick={() => {
                message.info("Travel Mode set to DRIVING");
                setTravelMode("DRIVING");
              }}
            />
          </Tooltip>
          <Tooltip title="WALKING">
            <img
              src="https://cdn-icons-png.flaticon.com/128/3893/3893813.png"
              alt="walking-icon"
              style={{ width: "50px", height: "50px" }}
              onClick={() => {
                message.info("Travel Mode set to WALKING");
                setTravelMode("WALKING");
              }}
            />
          </Tooltip>
          <Tooltip title="PUBLIC TRANSPORT">
            <img
              src="https://cdn-icons-png.flaticon.com/128/1395/1395220.png"
              alt="transit-icon"
              style={{ width: "50px", height: "50px" }}
              onClick={() => {
                message.info("Travel Mode set to PUBLIC TRANSPORT");
                setTravelMode("TRANSIT");
              }}
            />
          </Tooltip>
        </div>

        <InfoBox
          timetake={timetaken}
          distance={calculateddistance}
          polyline={polyline}
          travelmode={travelmode}
        ></InfoBox>
      </div>
      <div
        id="directions-panel"
        style={{
          width: "50vw",
          height: "98vh",
          background: "beige",
          overflowX: "scroll",
          overflowY: "scroll",
          padding: "10px",
          display: polyline != null && showDirection ? "block" : "none",
        }}
      ></div>
    </div>
  );
};

export default Map;

// import React, { useEffect, useRef } from 'react';

// // interface MapProps {
// //   apiKey: string;
// //   center: google.maps.LatLngLiteral;
// //   zoom: number;
// // }

// const Map= () => {
//   const mapRef = useRef<HTMLDivElement>(null);
//   let  apiKey:string= "AIzaSyB4NLdRCMpBJHH1DK1IdGNQNy0iwjOiSS8"
//   let map: google.maps.Map | null = null;

//   useEffect(() => {
//     if (mapRef.current) {
//       // Load the Google Maps API script dynamically
//       const script = document.createElement('script');
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}}`;
//       script.onload = initMap;
//       document.head.appendChild(script);
//     }
//   }, [apiKey]);

//   const initMap = () => {
//     map = new google.maps.Map(mapRef.current!, {
//         center: { lat: 24.7128, lng: 78.006 },
//             zoom:7
//     });
//   };

//   return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
// };

// export default Map;
