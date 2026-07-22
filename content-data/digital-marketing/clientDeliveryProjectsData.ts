import { Project } from "@/types/clientDeliveryProjects";
import { IMAGE } from "@/constants/imagesConfig";

export const projects: Project[] = [
  {
    title: "CloudSync Technologies",
    description:
      "CloudSync Technologies partnered with Blackcrest to strengthen its digital presence, increase qualified B2B leads, and improve search visibility through SEO, content marketing, and performance-driven campaigns.",
    metrics: [
      { label: "Increase in Organic Traffic", value: "+63%" },
      { label: "Increase in Qualified Leads", value: "+46%" },
      { label: "Increase in Demo Requests", value: "+35%" },
    ],
    image: IMAGE.CloudSync,
  },

  {
    title: "NordicTech Solutions",
    description:
      "A European B2B technology company partnered with Blackcrest to improve organic visibility, generate qualified leads, and optimize conversion across its digital channels.",
    metrics: [
      { label: "Increase in Organic Traffic", value: "+68%" },
      { label: "Increase in Qualified Leads", value: "+41%" },
      { label: "Reduction in Cost per Lead", value: "-27%" },
    ],
    image: IMAGE.NordicTech,
  },

  {
    title: "Oakstone Consulting",
    description:
      "A business consulting firm looking to strengthen its online presence through SEO, paid advertising, and conversion-focused landing pages for B2B client acquisition.",
    metrics: [
      { label: "Increase in Lead Conversion", value: "+37%" },
      { label: "Increase in Website Sessions", value: "+55%" },
      { label: "Increase in ROI from PPC", value: "+48%" },
    ],
    image: IMAGE.Oakstone,
  },
];
