export interface SizeChart {
  eu: string;
  us: string;
  uk?: string;
  mm: number;
}

export const shoesSizeChart: SizeChart[] = [
  { eu: "36", us: "4", uk: "3.5", mm: 220 },
  { eu: "37", us: "4.5", uk: "4", mm: 225 },
  { eu: "37.5", us: "5", uk: "4.5", mm: 230 },
  { eu: "38", us: "5.5", uk: "5", mm: 235 },
  { eu: "38.5", us: "6", uk: "5.5", mm: 240 },
  { eu: "39.5", us: "6.5", uk: "6", mm: 245 },
  { eu: "40", us: "7", uk: "6.5", mm: 250 },
  { eu: "40.5", us: "7.5", uk: "7", mm: 255 },
  { eu: "41.5", us: "8", uk: "7.5", mm: 260 },
  { eu: "42", us: "8.5", uk: "8", mm: 265 },
  { eu: "42.5", us: "9", uk: "8.5", mm: 270 },
  { eu: "43", us: "9.5", uk: "9", mm: 275 },
  { eu: "44", us: "10", uk: "9.5", mm: 280 },
  { eu: "45", us: "11", uk: "10.5", mm: 290 },
  { eu: "46.5", us: "12", uk: "11.5", mm: 300 },
  { eu: "47.5", us: "13", uk: "12.5", mm: 310 },
];

// Отдельный список для вещей
export const clothingSizeChart = {
  men: [
    { size: "XS", chest: "86-91", waist: "71-76", hips: "86-91" },
    { size: "S", chest: "91-97", waist: "76-81", hips: "91-97" },
    { size: "M", chest: "97-103", waist: "81-86", hips: "97-103" },
    { size: "L", chest: "103-109", waist: "86-91", hips: "103-109" },
    { size: "XL", chest: "109-115", waist: "91-97", hips: "109-115" },
    { size: "XXL", chest: "115-121", waist: "97-103", hips: "115-121" },
  ],
  women: [
    { size: "XS", chest: "81-84", waist: "61-64", hips: "86-89" },
    { size: "S", chest: "84-89", waist: "64-69", hips: "89-94" },
    { size: "M", chest: "89-94", waist: "69-74", hips: "94-99" },
    { size: "L", chest: "94-99", waist: "74-79", hips: "99-104" },
    { size: "XL", chest: "99-104", waist: "79-84", hips: "104-109" },
    { size: "XXL", chest: "104-109", waist: "84-89", hips: "109-114" },
  ],
};
