import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import {
  QrCodeIcon,
  ExclamationCircleIcon,
  XMarkIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/16/solid";

const QrCodeCard = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [dataUrl, setDataUrl] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    if (!url) {
      setError("Enter The Url");
    } else {
      // generate qr code
      const opts = {
        errorCorrectionLevel: "H",
        type: "image/jpeg",
        margin: 1,
      };
      QRCode.toDataURL(url, opts, (err, url) => {
        if (err) throw err;
        setDataUrl(url);
      });
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(""), 5000);
    }
  }, [error]);

  return (
    <div className="card border col-lg-4 col-md-7 col-sm-12 mx-auto">
      <div className="card-header text-center bg-danger text-light rounded shadow mb-3">
        {dataUrl ? (
          <img src={dataUrl} style={{ width: "13rem" }} alt="qr-code" />
        ) : (
          <>
            <h3>Your QR</h3>
            <h1 className="fw-bold">Generator</h1>
          </>
        )}
      </div>
      <div className="card-body">
        <form onSubmit={handleClick}>
          <input
            type="url"
            className="form-control mb-3"
            placeholder="Enter a valid URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          {dataUrl ? (
            <div className="d-flex justify-content-around">
              <button
                name="Clear"
                onClick={() => {
                  setUrl("");
                  setDataUrl("");
                }}
                type="button"
                className="btn btn-lg btn-dark shadow"
              >
                <XMarkIcon style={{ width: "2rem" }} />
                Clear
              </button>
              <a
                download="qrCode.png"
                href={dataUrl}
                className="btn btn-lg btn-success shadow d-flex align-items-center justify-content-center text-decoration-none text-light"
              >
                <ArrowDownTrayIcon
                  style={{ width: "2rem", marginRight: "0.5rem" }}
                />{" "}
                Download
              </a>
            </div>
          ) : (
            <button
              name="Generate"
              className="btn btn-lg btn-dark d-flex mx-auto align-items-center fw-bold shadow"
              onClick={handleClick}
            >
              <QrCodeIcon style={{ width: "2rem", marginRight: "0.5rem" }} />{" "}
              Generate
            </button>
          )}
        </form>
      </div>
      {error && (
        <div className="card-footer d-flex align-items-center border border-danger text-danger gap-2">
          <ExclamationCircleIcon style={{ width: "2rem" }} />
          <p className="mt-2 mb-1">{error}</p>
        </div>
      )}
    </div>
  );
};

export default QrCodeCard;
