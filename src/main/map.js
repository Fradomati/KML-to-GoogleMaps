import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Share } from "./share";
import { removeFirstCoordinate } from "../means/functions";

const CustomBox = styled(Box)`
  color: #264653;
  text-align: center;
  margin-top: 3em;
  width: 100%;
  font-weight: bold;
  /* color: #2a9d8f; */
`;

const CustomFlexBox = styled(Box)`
  display: flex;
  /* color: #2a9d8f; */
`;

export const Map = (props) => {
  const [coordinates, newCoordinates] = useState();
  const [urls, newUrls] = useState();
  let numberOfCoords;
  let longitud;
  let firstCoord; // 1º Coordenada
  let lastCoord; // Last Coordenada
  let coordResult = [];
  let stages = props.stage;
  let stops = 8;
  let url = "https://www.google.es/maps/dir/";
  let urlArr = [];

  // Take the Coordinates from props of converterToJson.js
  if (props.coordinates && props.coordinates != coordinates) {
    newCoordinates(props.coordinates);
  }

  // Update data with the Coordinates generated
  useEffect(() => {
    if (coordinates) {
      numberOfCoords = coordinates.length;
      longitud = numberOfCoords / 10;
      firstCoord = coordinates[0];
      lastCoord = coordinates[coordinates.length - 1];
      takeCoords();
    }
  }, [coordinates, stages]);

  // Function to create the structure of Google Maps URL.
  const takeCoords = () => {
    // Check Stages and create the necessary arrays
    let lbs = Math.floor(numberOfCoords / stages); // longitud By Stage
    let lof = lbs / 10; // longitud by parts
    let cds; // Coords
    let fc; // First Coord of Array (cds)
    let lc; // Last Coord of Array (cds)
    for (let i = 1; i <= stages; i++) {
      let first = lbs * i - lbs;
      let last = lbs * i;
      cds = coordinates.slice(first, last);
      fc = !fc ? cds[0] : (fc = lc);
      lc = cds[cds.length - 1];
      createMapUrl(cds, i, lof, fc, lc);
    }
    /*
    // Create the Url from coords array
    for (let i = 1; i <= stops; i++) {
      coordResult.push(coordinates[Math.floor(longitud) * i]);
    }
    coordResult.unshift(firstCoord);
    coordResult.push(lastCoord);
    coordResult.forEach((c, i) => {
      i != coordResult.length - 1
        ? (url = url + `${c[1]},${c[0]}/`)
        : (url = url + `${c[1]},${c[0]}/@${c[1]},${c[0]}z/`);
    });

    urlArr.push(url);
    newUrls(urlArr);
    */
  };

  const createMapUrl = (cds, currentStage, lof, fc, lc) => {
    // Reset coordResult and base URL
    coordResult = [];
    url = "https://www.google.es/maps/dir/";

    // Create the Url from coords array
    for (let i = 1; i <= stops; i++) {
      coordResult.push(cds[Math.floor(lof) * i]);
    }
    // First URL need First Coord mandatory
    currentStage == 1
      ? coordResult.unshift(firstCoord)
      : coordResult.unshift(fc);
    // Last URL need Last Coord mandatory
    currentStage == stages
      ? coordResult.push(lastCoord)
      : coordResult.unshift(lc);

    coordResult.forEach((c, i) => {
      i != coordResult.length - 1
        ? (url = url + `${c[1]},${c[0]}/`)
        : (url = url + `${c[1]},${c[0]}/@${c[1]},${c[0]}z/`);
    });

    urlArr.push(url);
    newUrls(urlArr);
  };

  if (urls) {
    return (
      <CustomBox>
        {urls.length > 0 &&
          urls.map((e, i) => {
            return (
              <CustomFlexBox>
                <ListItemButton
                  style={{ marginRight: "2em" }}
                  divider={true}
                  key={i}
                  href={`${e}`}
                  target="_blank"
                >
                  <ListItemText
                    primary={`${i + 1} / ${
                      urls.length
                    } - 🚩 Etapa en Google Maps`}
                  />
                </ListItemButton>
                <ListItemButton
                  divider={true}
                  key={i}
                  href={`${removeFirstCoordinate(e)}`}
                  target="_blank"
                >
                  <ListItemText primary={`📍 Elige tu punto de salida`} />
                </ListItemButton>
              </CustomFlexBox>
            );
          })}
        <Share urls={urls} />
      </CustomBox>
    );
  }
};
