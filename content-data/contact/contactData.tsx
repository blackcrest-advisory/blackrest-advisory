import { IMAGE } from "@/constants/imagesConfig";
import { LuMapPin, LuPhone, LuMail } from "react-icons/lu";

export const contactInfoData = [
  {
    icon: <LuMapPin size={24} className="text-secondary" />,
    title: "Visit Us",
    details: [
      "Level-6, Building-1, Golden Shower",
      "Mazar Road, Dhaka-1216, Bangladesh",
    ],
  },
  {
    icon: <LuPhone size={24} className="text-secondary" />,
    title: "Call Us",
    details: ["+88 01647-660300"],
  },
  {
    icon: <LuMail size={24} className="text-secondary" />,
    title: "Email Us",
    details: ["careselenite@gmail.com"],
  },
];

export const officeLocations = [
  {
    city: "London",
    country: "United Kingdom",
    address: "101 Bishopsgate, London EC2M 3AB",
    image: IMAGE.london,
  },
  {
    city: "Berlin",
    country: "Germany",
    address: "Friedrichstraße 123, 10117 Berlin",
    image: IMAGE.germany,
  },
  {
    city: "Paris",
    country: "France",
    address: "75 Rue de Rivoli, 75001 Paris",
    image: IMAGE.france,
  },
];

export const quickLinks = [
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Case Studies",
    href: "/case-studies",
  },
  {
    label: "Careers",
    href: "/careers",
  },
];
