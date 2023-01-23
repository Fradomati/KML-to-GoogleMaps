import React, { useState, useEffect } from "react";
import { Map } from "./map";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import RouteIcon from "@mui/icons-material/Route";
import SignpostIcon from "@mui/icons-material/Signpost";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import Slider from "@mui/material/Slider";
const tj = require("@tmcw/togeojson");
const DOMParser = require("xmldom").DOMParser;

const CustomContainer = styled(Container)`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
`;

const CustomForm = styled("form")`
  display: flex;
  flex-direction: column;
`;

export const Converter = () => {
  const { register, handleSubmit } = useForm();
  const [coordinates, newCoordinates] = useState();
  const [stage, newStage] = useState(1);
  const [titleFile, newTitleFile] = useState();
  /*
  useEffect(() => {
    if (coordinates) console.log(coordinates);
  }, [coordinates]);
  */
  // Take a Kml
  const onSubmit = (data) => {
    const file = data.kml[0];
    console.log(data.kml);
    const ext = getFileExtension(file); // Take .kml to verify format
    const reader = new FileReader();

    // parse text to read Json
    reader.onloadend = (ev) => {
      let text = ev.target.result;
      ext === "kml" ? parseTextAsKml(text) : console.log("No kml");
    };

    reader.readAsText(file);
  };

  // Function to verify extension
  const getFileExtension = (file) => {
    const name = file.name;
    const lastDot = name.lastIndexOf(".");
    return name.substring(lastDot + 1);
  };

  // Function KML to JSON
  const parseTextAsKml = (text) => {
    const dom = new DOMParser().parseFromString(text, "text/xml"); // create xml dom object
    const converted = tj.kml(dom); // convert xml dom to geojson
    const arrayOfCoordinates = converted.features[1].geometry.coordinates;
    removeLastValue(arrayOfCoordinates);
  };

  const removeLastValue = (array) => {
    const newArray = array.map((e) => e.slice(0, -1));
    newCoordinates(newArray);
  };

  // Slider Stages
  const marks = [
    {
      value: 1,
      label: "1"
    },
    {
      value: 2,
      label: "2"
    },
    {
      value: 3,
      label: "3"
    },
    {
      value: 4,
      label: "4"
    },
    {
      value: 5,
      label: "5"
    },
    {
      value: 6,
      label: "6"
    },
    {
      value: 7,
      label: "7"
    },
    {
      value: 8,
      label: "8"
    },
    {
      value: 9,
      label: "9"
    },
    {
      value: 10,
      label: "10"
    }
  ];

  function valuetext(value) {
    return `${value}`;
  }

  function handlerEvent(event) {
    newStage(event.target.value);
  }

  function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }
  /*
  function handlerEventFileName(event) {
    let preTitle = event.target.value;
    newTitleFile(preTitle.slice(12, -1));
    console.log(preTitle.slice(12, -1));
  }
*/
  return (
    <CustomContainer>
      <Box>
        {titleFile && <Typography>{titleFile}</Typography>}
        <CustomForm onSubmit={handleSubmit(onSubmit)}>
          <Typography style={{ fontWeight: "bold" }}>
            1️⃣ Suba su archivo con la extensión ".kml"*
          </Typography>
          <input
            {...register("kml", { required: true })}
            required
            type="file"
            style={{
              fontSize: "0.875rem",
              fontFamily: `"Roboto","Helvetica","Arial",sans-serif"`,
              backgroundColor: "#556cd6",
              color: "white",
              borderRadius: "3px",
              marginTop: "0.3em"
            }}
          />
          <Button
            variant="contained"
            style={{ marginTop: "1.5em" }}
            type="submit"
          >
            Convertir a Google Maps{" "}
            <SignpostIcon style={{ marginLeft: "5px" }} />
          </Button>
        </CustomForm>
      </Box>
      <Box
        sx={{ width: "80%", maxWidth: "500px" }}
        style={{ margin: "2.5em 0" }}
      >
        <Typography style={{ fontWeight: "bold" }}>
          2️⃣ Selecciona el número de etapas en el que quiere dividir la ruta.
          Mayor número de etapas, mayor exactitud 😉
        </Typography>
        <Slider
          aria-label="Restricted values"
          defaultValue={1}
          valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          step={1}
          min={1}
          max={10}
          valueLabelDisplay="auto"
          marks={marks}
          onChange={handlerEvent}
        />
      </Box>
      <Map coordinates={coordinates} stage={stage} />
    </CustomContainer>
  );
};
