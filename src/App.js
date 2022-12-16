import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import QRCode from "qrcode";
import QrReader from "react-qr-reader";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";

function App() {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");

  const classes = useStyles();
  const qrRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload();
    }, 9000);
  });

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleErrorFile = (error) => {
    console.log(error);
  };
  const handleScanFile = (result) => {
    if (result === "nihal") {
      // window.alert("Success");
      toast.success("Match Success");

      setScanResultFile(result);
    } else {
      // window.alert("Error");
      toast.error("Match Error");
      setScanResultFile(result);
    }
  };
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  };
  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    if (result === "nihal") {
      // window.alert("Success");
      toast.success("Match Success");
      setScanResultWebCam(result);
    } else {
      // window.alert("Error");
      // toast.error("Match Error");
      setScanResultWebCam(result);
    }
  };

  return (
    <Container className={classes.conatiner}>
      <Card>
        <h2 className={classes.title}>Verify QR info. </h2>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <TextField
                label="Enter Text Here"
                onChange={(e) => setText(e.target.value)}
              />

              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                onClick={() => generateQrCode()}
              >
                <AddCircleIcon />
                Generate
              </Button>
              <br />
              <br />
              <br />
              {imageUrl ? (
                <a href={imageUrl} download>
                  <img src={imageUrl} alt="img" />
                </a>
              ) : null}
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Button
                className={classes.btn}
                variant="contained"
                color="secondary"
                onClick={onScanFile}
              >
                <DocumentScannerIcon />
                Scan Qr Code
              </Button>
              <ToastContainer />
              <QrReader
                ref={qrRef}
                delay={300}
                style={{ width: "100%" }}
                onError={handleErrorFile}
                onScan={handleScanFile}
                legacyMode
              />
              <h3>Scanned info: {scanResultFile}</h3>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <h3 style={{ color: "#f50057" }}>Qr Code Scan by Web Cam</h3>
              <QrReader
                delay={300}
                style={{ width: "100%" }}
                onError={handleErrorWebCam}
                onScan={handleScanWebCam}
              />
              <h3>Scanned By WebCam info: {scanResultWebCam}</h3>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  conatiner: {
    marginTop: 10,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#3f51b5",
    padding: 20,
  },
  btn: {
    marginTop: 10,
    marginBottom: 20,
  },
}));
export default App;
