import { useState, useEffect, Component, ReactNode, useRef } from "react";
import { BIG_CONSTS } from "../../const";
import PDFWorker from "../../../src/pdf.worker";
import { Document, Page, pdfjs } from "react-pdf";
import { useInView } from "react-intersection-observer";
import "./styles.css";
import headingsName from "./utils";

class PDFErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Miniatura niedostępna</div>;
    }

    return this.props.children;
  }
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface TechRecord {
  S: number;
  F: number;
  ID: number;
  PO: number;
  Rysunek: string;
  OP_1: string;
  OP_2: string;
  OP_3: string;
  OP_4: string;
  OP_5: string;
  OP_6: string;
  OP_7: string;
  OP_8: string;
  OP_9: string;
  OP_10: string;
}

interface PdfThumbnailProps {
  arg: TechRecord;
}

function Technology() {
  const [results, setResults] = useState([]);
  const [numberOfEmptyTech, setNumberofEmptyTech] = useState(0);

  useEffect(() => {
    fetch(BIG_CONSTS.SOURCES.noTechData)
      .then((response) => response.json())
      .then((data) => setResults(data))
      .catch((error) => console.error("Error, error"));
  }, []);

  useEffect(() => {
    setNumberofEmptyTech(results.length);
  }, [results]);

  const dateStyle = (arg: number) => {
    if (arg < 0) {
      return "past";
    }
    if (0 <= arg && arg < 8) {
      return "current";
    }
    if (arg > 7) {
      return "far";
    }
    return "blank";
  };

  const headingStyle = (arg: string) => {
    if (["S", "F"].includes(arg)) {
      return "date-heading";
    }
    return "";
  };

  function PdfThumbnail({ arg }: PdfThumbnailProps) {
    const url: string = `${BIG_CONSTS.SOURCES.pdfView}${arg.PO + arg.Rysunek}`;

    const { ref: inViewRef, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [shouldRender, setShouldRender] = useState(false);

    const setRefs = (node: HTMLDivElement) => {
      inViewRef(node);
      containerRef.current = node;
    };

    useEffect(() => {
      if (inView) {
        const timeout = setTimeout(() => {
          if (containerRef.current) {
            const { width, height } =
              containerRef.current.getBoundingClientRect();
            if (width > 0 && height > 0) {
              setShouldRender(true);
            }
          }
        }, BIG_CONSTS.TIMEOUTS.thumbnailTimeout); //
        return () => clearTimeout(timeout);
      }
    }, [inView]);

    return (
      <div
        ref={setRefs}
        style={{
          width: `${BIG_CONSTS.SIZES.thumbnailWidth}px`,
          height: `${BIG_CONSTS.SIZES.thumbnailHeight}px`,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {shouldRender ? (
          <PDFErrorBoundary>
            <Document file={url}>
              <Page
                pageNumber={1}
                width={BIG_CONSTS.SIZES.thumbnailWidth}
                renderTextLayer={false}
              />
            </Document>
          </PDFErrorBoundary>
        ) : (
          <div>Ładowanie miniatury...</div>
        )}
      </div>
    );
  }

  function headings(props: any) {
    return (
      <thead className="heading">
        <tr>
          {props.map((heading: any) => (
            <th key={heading.id} className={headingStyle(heading.name)}>
              {heading.name}
            </th>
          ))}
        </tr>
      </thead>
    );
  }

  function bodyTable(arg: any) {
    function anchorThumbnail(record: TechRecord) {
      return (
        <div>
          <a href={linkGen(record)} target="_blank" rel="noopener noreferrer">
            <PdfThumbnail arg={record} />
          </a>
        </div>
      );
    }
    return (
      <tbody>
        {arg.map((record: TechRecord) => (
          <tr key={record.ID} className="record-row">
            <td className={dateStyle(record.S)}>{record.S}</td>
            <td className={dateStyle(record.F)}>{record.F}</td>
            <td>{record.ID}</td>
            <td>{record.PO}</td>
            <td>{anchorThumbnail(record)}</td>
            <td>{record.Rysunek}</td>
            <td className="td-op">{record.OP_1}</td>
            <td className="td-op">{record.OP_2}</td>
            <td className="td-op">{record.OP_3}</td>
            <td className="td-op">{record.OP_4}</td>
            <td className="td-op">{record.OP_5}</td>
            <td className="td-op">{record.OP_6}</td>
            <td className="td-op">{record.OP_7}</td>
            <td className="td-op">{record.OP_8}</td>
            <td className="td-op">{record.OP_9}</td>
            <td className="td-op">{record.OP_10}</td>
          </tr>
        ))}
      </tbody>
    );
  }

  const linkGen = (obj: any) => {
    const item_fn = (obj: any) => {
      return obj.PO + obj.Rysunek;
    };
    // const filename = item_fn(obj);
    return `${BIG_CONSTS.SOURCES.pdfView}${encodeURIComponent(item_fn(obj))}`;
  };

  return (
    <div>
      <h2> Rysunki bez ułożonej Technologii: {numberOfEmptyTech}</h2>
      <table className="tech-table">
        {headings(headingsName)}
        {bodyTable(results)}
      </table>
    </div>
  );
}

export default Technology;
