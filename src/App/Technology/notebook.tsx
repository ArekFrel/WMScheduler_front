  import React, { useState, useEffect, useCallback, memo } from "react";

function Technology() {
  const [records, setRecords] = useState<TechRecord[]>([]);
  const [changedRecords, setChangedRecords] = useState<TechRecord[]>([]);
  const [numberOfEmptyTech, setNumberofEmptyTech] = useState(0);

  useEffect(() => {
    fetch(BIG_CONSTS.SOURCES.noTechData)
      .then((response) => response.json())
      .then((data) => setRecords(data))
      .catch(() => console.error("Error, error"));
  }, []);

  useEffect(() => {
    setNumberofEmptyTech(records.length);
  }, [records]);

  const onChangeRecord = useCallback((id: number, operation: keyof TechRecord, newValue: string) => {
    setChangedRecords(prev => {
      const existingIndex = prev.findIndex(record => record.ID === id);
      if (existingIndex !== -1) {
        const existingRecord = prev[existingIndex];
        if (existingRecord[operation] === newValue) {
          // Bez zmian
          return prev;
        }
        const updatedRecord = { ...existingRecord, [operation]: newValue };
        return [...prev.slice(0, existingIndex), updatedRecord, ...prev.slice(existingIndex + 1)];
      } else {
        // Nowy rekord zmieniony
        return [...prev, { ID: id, [operation]: newValue } as TechRecord];
      }
    });
  }, []);

  const bodyTable = (arg: TechRecord[]) => {
    return (
      <tbody>
        {arg.map((record) => (
          <tr key={record.ID} className="record-row">
            {/* pozostałe pola */}
            {ops.map((op) => (
              <SelectField
                key={op + record.ID}
                record={record}
                operation={op}
                onChangeRecord={onChangeRecord}
              />
            ))}
            {/* pozostałe pola */}
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className="tech-table">
      <h2> Rysunki bez ułożonej Technologii: {numberOfEmptyTech}</h2>
      <table>
        {headings(headingsName)}
        {bodyTable(records)}
      </table>
    </div>
  );
}

type SelectFieldProps = {
  record: TechRecord;
  operation: keyof TechRecord;
  onChangeRecord: (id: number, operation: keyof TechRecord, newValue: string) => void;
};

const SelectField: React.FC<SelectFieldProps> = memo(({ record, operation, onChangeRecord }) => {
  const cellValue = record[operation] === "null" ? "" : String(record[operation]);
  const [value, setValue] = useState(cellValue);

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChangeRecord(record.ID, operation, newValue);
  };

  // Można również dodać useEffect by synchronizować wartość przy zmianie propów (jeśli potrzebne)
  useEffect(() => {
    setValue(cellValue);
  }, [cellValue]);

  const options = operationsNames;

  return (
    <td className={opStyle(value)}>
      <select className="input-operation" value={value} onChange={handleChangeSelect}>
        <option value={value}>{value}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </td>
  );
});
  
