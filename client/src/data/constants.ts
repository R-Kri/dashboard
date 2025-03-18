export const CABIN_CLASSES = ["Economy", "Premium Economy", "Business", "First"];

export const TRAVELLER_LIMITS: Record<"adults" | "children" | "infants", { min: number; max: number; label: string; subtitle: string }> = {
    adults: { min: 1, max: 9, label: "Adults", subtitle: "12+ years" },
    children: { min: 0, max: 6, label: "Children", subtitle: "2-11 years" },
    infants: { min: 0, max: 6, label: "Infants", subtitle: "0-2 years" },
};