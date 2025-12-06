export const dateStyle = (arg: number) => {
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

export const statusStyle = (arg: string) => {
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

export const opStyle = (arg: string) => {
  if (arg !== "" && arg !== null) {
    return "not-empty-op";
  }
};

export const orderStatStyle = (arg: String) => {
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

export const headingStyle = (arg: string) => {
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
  if (arg === "Kiedy") {
    return "when-column";
  }
  return "";
};
