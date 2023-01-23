import React, { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { styled } from "@mui/material/styles";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FileCopyIcon from "@mui/icons-material/FileCopy";

const CustomBox = styled(Box)`
  color: #264653;
  text-align: center;
  margin-top: 3em;
  width: 100%;
  font-weight: bold;
  display: flex;
  justify-content: space-around;
  /* color: #2a9d8f; */
`;

export const Share = (props) => {
  const [urls, newUrls] = useState();
  const [copied_1, newCopied_1] = useState(false);
  const [copied_2, newCopied_2] = useState(false);
  const [copyText, newCopyText] = useState();
  const [copyTextWithoutFirstCd, newsTextWithoutFristCd] = useState();

  const removeFirstCoordinate = (url) => {
    var pattern = /\/dir\/[^\/]+\//;
    return url.replace(pattern, "/dir//");
  };

  useEffect(() => {
    newUrls(props.urls);
    newCopied_1(false);
    newCopied_2(false);
    textToCopy(props.urls);
  }, [props.urls]);

  const isCopied_1 = () => {
    newCopied_1(true);
  };

  const isCopied_2 = () => {
    newCopied_2(true);
  };

  const textToCopy = (urlsToProps) => {
    let text = "";
    let textRemoveFirstCd = "";
    urlsToProps.length === 1
      ? urlsToProps.forEach((u) => {
          text = `${text} Enlace a Google Maps: ${u}`;
          textRemoveFirstCd = `${textRemoveFirstCd} Enlace a Google Maps: ${removeFirstCoordinate(
            u
          )}`;
        })
      : urlsToProps.forEach((u, i) => {
          if (text === "" && textRemoveFirstCd === "") {
            text = `Etapa ${i + 1} - ${u}`;
            textRemoveFirstCd = `Etapa ${i + 1} - ${removeFirstCoordinate(u)}`;
          } else {
            text = `${text}\nEtapa ${i + 1} - ${u}`;
            textRemoveFirstCd = `${textRemoveFirstCd}\nEtapa ${
              i + 1
            } - ${removeFirstCoordinate(u)}`;
          }
        });
    console.log(textRemoveFirstCd, "ss");
    console.log(text, "tt");
    text =
      `🚩 Tu ruta en Google Maps 🚩\n\n` +
      text +
      `\n Transforma tu KML a Google Maps: https://rx2fxt.csb.app/`;
    newCopyText(text);
    textRemoveFirstCd =
      `🚩 Tu ruta en Google Maps 🚩\n\n` +
      textRemoveFirstCd +
      `\n Transforma tu KML a Google Maps: https://rx2fxt.csb.app/`;
    newsTextWithoutFristCd(textRemoveFirstCd);
  };

  return (
    <CustomBox>
      {copied_1 === false ? (
        <CopyToClipboard text={copyText} onCopy={isCopied_1}>
          <ContentCopyIcon style={{ cursor: "pointer" }} />
        </CopyToClipboard>
      ) : (
        <FileCopyIcon onClick={() => isCopied_1} style={{ color: "green" }} />
      )}

      {copied_2 === false ? (
        <CopyToClipboard text={copyTextWithoutFirstCd} onCopy={isCopied_2}>
          <ContentCopyIcon style={{ cursor: "pointer" }} />
        </CopyToClipboard>
      ) : (
        <FileCopyIcon onClick={() => isCopied_2} style={{ color: "green" }} />
      )}
    </CustomBox>
  );
};
