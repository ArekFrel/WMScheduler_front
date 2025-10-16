import { useState, useEffect, Component, ReactNode, useRef } from "react";
import { BIG_CONSTS } from "../../const";
import PDFWorker from "../../../src/pdf.worker";
import { Document, Page, pdfjs } from "react-pdf";
import { useInView } from "react-intersection-observer";
import "./styles.css";
import { headingsName, operationsNames } from "./utils";

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
  Sztuki: number;
  Materiał: String;
  Cięcia: String;
  Przygotówka: String;
  Komentarz: String;
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
  Status_Text: string;
  Op0: string;
  "System Status": string;
  "Planista 0": string;
  Kiedy: string;
}

const ops: (keyof TechRecord)[] = [
  "OP_1",
  "OP_2",
  "OP_3",
  "OP_4",
  "OP_5",
  "OP_6",
  "OP_7",
  "OP_8",
  "OP_9",
  "OP_10",
];

interface PdfThumbnailProps {
  arg: TechRecord;
}

function Technology() {
  const [results, setResults] = useState([]);
  const [numberOfEmptyTech, setNumberofEmptyTech] = useState(0);
  const [changedResults, setChangedResults] = useState([results])

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

  const statusStyle = (arg: string) => {
    if (arg == "Brak Tech") {
      return "brak-tech-style";
    }
    if (arg == "Oczekuje") {
      return "oczekuje-style";
    }
    if (arg == "Start") {
      return "start-style";
    }
    if (arg == "Wstrzymano") {
      return "stopped-style";
    }
    if (arg == "Wstrzymano") {
      return "stopped-style";
    }
    return "";
  };

  const opStyle = (arg: string) => {
    if (arg !== '' && arg !== null) {
      return "not-empty-op";
    }
  };

  const orderStatStyle = (arg: String) => {
    if (arg == "REL") {
      return "rel-stat-style";
    }
    if (arg == "CRTD") {
      return "crtd-stat-style";
    }
    if (arg == "TECO") {
      return "teco-stat-style";
    }
    return "";
  };

  const headingStyle = (arg: string) => {
    if (["S", "F"].includes(arg)) {
      return "date-heading";
    }
    if (["ID"].includes(arg)) {
      return "id-column";
    }
    if (["PO"].includes(arg)) {
      return "po-column";
    }
    if (["Rysunek"].includes(arg)) {
      return "rysunek-column";
    }
    if (["Sztuki", "Cięcia"].includes(arg)) {
      return "sztuki-column";
    }
    if (["Materiał"].includes(arg)) {
      return "material-column";
    }
    if (["Przygotówka"].includes(arg)) {
      return "przygotowka-column";
    }
    if (["Komentarz"].includes(arg)) {
      return "komentarz-column";
    }
    if (arg.startsWith("Op")) {
      return "operation-column";
    }
    if (["Status", "Zlecenie", "Planista"].includes(arg)) {
      return "otherInfo-column";
    }
    return "";
  };

  const idTextFormatting = (arg: Number) => {
    const zeroed = arg.toString().padStart(6, "0");

    return zeroed.slice(0, 3) + "-" + zeroed.slice(3);
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
            <td className="id-style ">{idTextFormatting(record.ID)}</td>
            <td>{record.PO}</td>
            <td>{anchorThumbnail(record)}</td>
            <td>{record.Rysunek}</td>
            <td className="sztuki_column">{record.Sztuki}</td>
            <td>{record.Materiał}</td>
            <td>{record.Cięcia}</td>
            <td>{record.Przygotówka}</td>
            <td>{record.Komentarz}</td>
            {ops.map((op) => (
                <SelectField id={record.ID} operation={String(record[op])} />
            ))}
            <td className={statusStyle(record.Status_Text)}>
              {record.Status_Text}{" "}
            </td>
            <td className={opStyle(record.Op0)}>{record.Op0}</td>
            <td className={orderStatStyle(record["System Status"])}>
              {record["System Status"]}
            </td>
            <td>{record["Planista 0"]}</td>
            <td className="when-style">{record.Kiedy}</td>
          </tr>
        ))}
      </tbody>
    );
  }

  type SelectFieldProps = {
    id: number;
    operation: string;
  };

  const SelectField: React.FC<SelectFieldProps> = ({ id, operation }) => {
    if (operation==='null') {
      operation = ''
    }
    const [value, setValue] = useState(operation);
    const handleChangeSelect = (event: any) => {
      setValue(event.target.value);
    };
    const options = operationsNames;
    
    return (
      <td className={opStyle(operation)}>
        <input
          className="input-operation"
          key={id}
          list="operationsNames"
          value={value}
          onChange={handleChangeSelect}
          placeholder={value}
        />
        <datalist id="operationsNames">
          {options.map((opt, index) => (
            <option key={index} value={opt} />
          ))}
        </datalist>
      </td>
    );
  };

  const linkGen = (obj: any) => {
    const item_fn = (obj: any) => {
      return obj.PO + obj.Rysunek;
    };
    // const filename = item_fn(obj);
    return `${BIG_CONSTS.SOURCES.pdfView}${encodeURIComponent(item_fn(obj))}`;
  };

  return (
    <div className="tech-table">
      <h2> Rysunki bez ułożonej Technologii: {numberOfEmptyTech}</h2>
      <table>
        {headings(headingsName)}
        {bodyTable(results)}
      </table>
    </div>
  );
}

export default Technology;
