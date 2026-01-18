// Single Source of Truth für Paket-Preise
export type PackageId = "verstehen" | "entscheiden" | "umsetzen";

export const PACKAGES = {
  verstehen: {
    name: "Verstehen",
    priceEUR: "59.00",
    displayPrice: "59€",
  },
  entscheiden: {
    name: "Entscheiden",
    priceEUR: "149.00",
    displayPrice: "149€",
  },
  umsetzen: {
    name: "Umsetzen",
    priceEUR: "299.00",
    displayPrice: "299€",
  },
} as const;
