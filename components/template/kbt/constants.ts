/* @identity เจ้าป่า */
import { FlightInfo } from "./types";

export const KBT_NAV_LINKS = [
  { label: "หน้าแรก", href: "#" },
  { label: "จองเที่ยวบิน", href: "#" },
  { label: "เช็คอิน", href: "#" },
  { label: "ข้อมูลการเดินทาง", href: "#" },
];

export const MOCK_FLIGHTS: FlightInfo[] = [
  {
    id: "KBT001",
    from: "BKK",
    to: "LHR",
    departure: "10:00",
    arrival: "16:00",
    price: 25000,
  },
];
