import notebooksImg from '../assets/category-notebooks.jpg';
import pensImg from '../assets/category-pens.jpg';
import bagsImg from '../assets/category-bags.jpg';
import artImg from '../assets/category-art.jpg';
import oxfordImg from '../assets/product-oxford.jpg';
import rhodiaImg from '../assets/product-rhodia.jpg';
import spiralSetImg from '../assets/product-spiral-set.jpg';
import leuchtturmImg from '../assets/product-leuchtturm.jpg';

export const CATEGORIES = [
  {
    id: "notebooks",
    name: "Notebooks",
    nameAr: "دفاتر",
    tagline: "PREMIUM PAPER",
    image: notebooksImg,
  },
  {
    id: "pens-pencils",
    name: "Pens & Pencils",
    nameAr: "أقلام",
    tagline: "WRITING INSTRUMENTS",
    image: pensImg,
  },
  {
    id: "school-bags",
    name: "School Bags",
    nameAr: "حقائب مدرسية",
    tagline: "CARRY GEAR",
    image: bagsImg,
  },
  {
    id: "art-supplies",
    name: "Art Supplies",
    nameAr: "أدوات فنية",
    tagline: "CREATIVE TOOLS",
    image: artImg,
  }
];

export const PRODUCTS = [
  {
    id: 1,
    categoryId: "notebooks",
    name: "Oxford Campus A4 Wirebound Notebook, Lined, 140 Pages",
    nameAr: "دفتر أكسفورد سلك A4 مسطر، 140 صفحة",
    price: 12.50,
    brand: "OXFORD",
    image: oxfordImg,
  },
  {
    id: 2,
    categoryId: "notebooks",
    name: "Rhodia Webnotebook A5, Dot Grid, Black Hardcover",
    nameAr: "دفتر روديا شبكي A5، غلاف أسود صلب",
    price: 8.00,
    brand: "RHODIA",
    image: rhodiaImg,
  },
  {
    id: 3,
    categoryId: "notebooks",
    name: "Set of 3 Spiral Subject Notebooks, A4 Squared",
    nameAr: "مجموعة من 3 دفاتر سلك مربعات A4",
    price: 4.25,
    oldPrice: 5.00,
    brand: "STUDENT ESSENTIALS",
    discount: "-15%",
    image: spiralSetImg,
  },
  {
    id: 4,
    categoryId: "notebooks",
    name: "Leuchtturm1917 Medium A5 Plain Notebook, Sage Green",
    nameAr: "دفتر ليشتورم A5 سادة، أخضر باهت",
    price: 18.50,
    brand: "LEUCHTTURM1917",
    image: leuchtturmImg,
  },
  {
    id: 5,
    categoryId: "pens-pencils",
    name: "Pilot G2 Gel Pen Set, 0.7mm, Assorted Colors, Pack of 5",
    nameAr: "طقم أقلام جل بايلوت G2، 0.7 مم، ألوان متنوعة، 5 قطع",
    price: 7.75,
    brand: "PILOT",
    image: pensImg,
  },
  {
    id: 6,
    categoryId: "pens-pencils",
    name: "Staedtler Noris HB Pencils, Pack of 12",
    nameAr: "أقلام رصاص ستيدلر نوريس HB، علبة 12",
    price: 3.50,
    brand: "STAEDTLER",
    image: pensImg,
  },
  {
    id: 7,
    categoryId: "pens-pencils",
    name: "Sharpie Permanent Markers, Fine Point, 8 Colors",
    nameAr: "أقلام شاربي دائمة، رأس رفيع، 8 ألوان",
    price: 6.25,
    oldPrice: 7.00,
    brand: "SHARPIE",
    discount: "-11%",
    image: pensImg,
  },
  {
    id: 8,
    categoryId: "school-bags",
    name: "Herschel Little America Backpack, 25L, Navy",
    nameAr: "حقيبة هيرشل ليتل أمريكا، 25 لتر، أزرق داكن",
    price: 45.00,
    brand: "HERSCHEL",
    image: bagsImg,
  },
  {
    id: 9,
    categoryId: "school-bags",
    name: "JanSport SuperBreak One Backpack, 27L, Black",
    nameAr: "حقيبة جان سبورت سوبر بريك، 27 لتر، أسود",
    price: 28.00,
    brand: "JANSPORT",
    image: bagsImg,
  },
  {
    id: 10,
    categoryId: "art-supplies",
    name: "Copic Ciao Marker Set, 12 Skin Tones",
    nameAr: "طقم أقلام كوبيك سياو، 12 لون بشرة",
    price: 38.00,
    brand: "COPIC",
    image: artImg,
  },
  {
    id: 11,
    categoryId: "art-supplies",
    name: "Faber-Castell Watercolor Pencils, Tin of 24",
    nameAr: "أقلام ألوان مائية فابر كاستل، علبة 24",
    price: 14.50,
    brand: "FABER-CASTELL",
    image: artImg,
  },
  {
    id: 12,
    categoryId: "art-supplies",
    name: "Strathmore 400 Series Drawing Pad, A4, 60 Sheets",
    nameAr: "كراسة رسم ستراثمور 400، A4، 60 ورقة",
    price: 9.25,
    brand: "STRATHMORE",
    image: artImg,
  },
];

export const CONTACT_INFO = {
  phone: "+962 6 123 4567",
  whatsapp: "962791931789",
  address: "Amman, Java Street, Main Commercial Block",
  addressAr: "عمان، شارع جاوا، المجمع التجاري الرئيسي",
  hours: "8:00 AM - 9:00 PM",
  hoursAr: "8:00 صباحاً - 9:00 مساءً",
  facebook: "https://web.facebook.com/abaqalyasmena",
  mapsQuery: "Java+Street+Amman+Jordan",
};
