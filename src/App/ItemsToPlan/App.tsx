import React, { useEffect, useState } from "react";
import PDFWorker from "../../../src/pdf.worker";
import { Document, Page, pdfjs } from "react-pdf";
import { BIG_CONSTS } from "../../const";
import { useInView } from "react-intersection-observer";
import "./styles.css";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

// Użycie lokalnego workera z node_modules
// pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';

pdfjs.GlobalWorkerOptions.workerPort = new PDFWorker();

function ItemsToPlanList() {
  interface Item {
    item_id: number;
    po: string;
    drawing: string;
  }

  interface PdfThumbnailProps {
    item: Item;
  }

  const [itemsToPlan, setItemsToPlan] = useState([]);

  function PdfThumbnail({ item }: PdfThumbnailProps) {
    const url: string = `${BIG_CONSTS.SOURCES.pdfView}${
      item.po + item.drawing
    }`;

    const { ref, inView } = useInView({
      triggerOnce: true, // tylko raz
      threshold: 0.1, // 10% widoczności
    });

    return (
      <div
        ref={ref}
        style={{
          // width: `${BIG_CONSTS.SIZES.thumbnailWidth}px`,
          width: "220px",
          height: "auto",
          overflow: "hidden" 
        }}
      >
        {inView ? (
          <Document
            file={url}
            // onLoadSuccess={({ numPages }) =>
            //   console.log("PDF załadowany, liczba stron:", numPages)
            // }
            // onLoadError={(error) => console.error("Load error:", error)}
            // onSourceError={(error) => console.error("Source error:", error)}
          >
            <Page
              pageNumber={1}
              // width={BIG_CONSTS.SIZES.thumbnailWidth}
              height={BIG_CONSTS.SIZES.thumbnailWidth}
              renderTextLayer={false}
            />
          </Document>
        ) : (
          <div>Ładowanie miniatury...</div>
        )}
      </div>
    );
  }

  const linkGen = (obj: any) => {
    const item_fn = (obj: any) => {
      return obj.po + obj.drawing;
    };

    const filename = item_fn(obj);
    const result = `${BIG_CONSTS.SOURCES.pdfView}${encodeURIComponent(
      filename
    )}`;
    return result;
  };

  useEffect(() => {
    fetch(BIG_CONSTS.SOURCES.itemsToPlan)
      .then((response) => response.json())
      .then((data) => setItemsToPlan(data))
      .catch((error) => console.error("Error, error"));
  }, []);

  return (
    <div>
      <h2> Items to Plan</h2>
      <ul>
        {itemsToPlan.map((itemToPlan: Item) => (
          <li key={itemToPlan.item_id}>
            <a
              href={linkGen(itemToPlan)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PdfThumbnail item={itemToPlan} />
            </a>
            <div>{itemToPlan.po} </div>
            <div>{itemToPlan.po} </div>
            <div>{itemToPlan.drawing} </div>
            OPEN:
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemsToPlanList;
