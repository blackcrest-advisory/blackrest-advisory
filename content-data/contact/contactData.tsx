import { IMAGE } from "@/constant/imagesConfig";
import { LuMapPin, LuPhone, LuMail, LuClock } from "react-icons/lu";

export const contactInfoData = [
  {
    icon: <LuMapPin size={24} className="text-secondary" />,
    title: "Visit Us",
    details: [
      "Blackcrest Advisory HQ",
      "101 Bishopsgate",
      "London EC2M 3AB",
      "United Kingdom",
    ],
  },
  {
    icon: <LuPhone size={24} className="text-secondary" />,
    title: "Call Us",
    details: ["+44 20 7946 0123", "+44 20 7946 0124"],
  },
  {
    icon: <LuMail size={24} className="text-secondary" />,
    title: "Email Us",
    details: ["hello@blackcrestadvisory.com", "support@blackcrestadvisory.com"],
  },
  {
    icon: <LuClock size={24} className="text-secondary" />,
    title: "Working Hours",
    details: ["Monday – Friday: 9:00 – 18:00 GMT", "Saturday – Sunday: Closed"],
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
