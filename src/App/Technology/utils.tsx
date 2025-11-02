import React, { useEffect, useState } from "react";
import { BIG_CONSTS } from "../../const";


export const headingsName = [
  { id: 1, name: "S" },
  { id: 2, name: "F" },
  { id: 3, name: "ID" },
  { id: 4, name: "PO" },
  { id: 5, name: "Podgląd" },
  { id: 6, name: "Rysunek" },
  { id: 7, name: "Sztuki" },
  { id: 8, name: "Materiał" },
  { id: 9, name: "Cięcia" },
  { id: 10, name: "Przygotówka" },
  { id: 11, name: "Komentarz" },
  { id: 12, name: "Op 1" },
  { id: 13, name: "Op 2" },
  { id: 14, name: "Op 3" },
  { id: 15, name: "Op 4" },
  { id: 16, name: "Op 5" },
  { id: 17, name: "Op 6" },
  { id: 18, name: "Op 7" },
  { id: 19, name: "Op 8" },
  { id: 20, name: "Op 9" },
  { id: 21, name: "Op 10" },
  { id: 22, name: "Status" },
  { id: 23, name: "Aktualnie" },
  { id: 24, name: "Zlcecenie" },
  { id: 25, name: "Planista" },
  { id: 26, name: "Kiedy" },
];

export const operationsNames = [
  'Piły'
  ,'Laser'
  ,'Gięcie'
  ,'Walcowanie'
  ,'Wyoblanie'
  ,'F1-Man'
  ,'F3-Dmg104'
  ,'F4-Dmg144'
  ,'F5-VTC200'
  ,'F6-VTC300'
  ,'F-Gwint'
  ,'T1-Man'
  ,'T2-Man'
  ,'T4-Fct'
  ,'T5-Okuma'
  ,'T6-Mazak'
  ,'Brygada'  
,]

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


export const DataLoader = ({ children }: { children: (data: TechRecord[]) => JSX.Element }) => {
  const [records, setRecords] = useState<TechRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(BIG_CONSTS.SOURCES.noTechData)
      .then((res) => res.json())
      .then((data) => {
        setRecords(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Błąd ładowania danych:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Ładowanie danych...</div>;

  return children(records); // przekazujemy dane do dzieci
};



