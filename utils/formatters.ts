export const formatHeight = (dm: number) => (dm / 10).toFixed(1) + " m";
export const formatWeight = (hg: number) => (hg / 10).toFixed(1) + " kg";
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);