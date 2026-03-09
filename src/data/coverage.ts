export interface CoverageZone {
  region: string;
  areas: string[];
  type: "local" | "interstate";
}

export const coverageZones: CoverageZone[] = [
  {
    region: "Lagos",
    areas: [
      "Lagos Island",
      "Ikeja",
      "Lekki",
      "Victoria Island",
      "Surulere",
      "Yaba",
      "Ikoyi",
      "Ajah",
      "Oshodi",
      "Mushin",
      "Apapa",
      "Amuwo-Odofin",
    ],
    type: "local",
  },
  {
    region: "South-West",
    areas: ["Ibadan", "Abeokuta", "Osogbo", "Akure", "Ado-Ekiti"],
    type: "interstate",
  },
  {
    region: "South-South",
    areas: ["Benin City", "Port Harcourt", "Warri", "Calabar", "Uyo"],
    type: "interstate",
  },
  {
    region: "South-East",
    areas: ["Enugu", "Owerri", "Aba", "Onitsha", "Abakaliki"],
    type: "interstate",
  },
  {
    region: "North-Central",
    areas: ["Abuja", "Jos", "Ilorin", "Lokoja", "Minna"],
    type: "interstate",
  },
  {
    region: "North-West",
    areas: ["Kano", "Kaduna", "Sokoto", "Zaria"],
    type: "interstate",
  },
  {
    region: "North-East",
    areas: ["Maiduguri", "Bauchi", "Yola", "Gombe"],
    type: "interstate",
  },
];
