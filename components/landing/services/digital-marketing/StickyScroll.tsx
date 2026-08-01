"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { IMAGE } from "@/constants/imagesConfig";
import { fadeInUp, staggerContainer, hoverScale } from "@/lib/utils/animations";

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "DIGITAL MARKETING",
    description:
      "Our passion for digital marketing is only matched by a burning desire to provide our clients with exceptional sales conversions and ROI, while capturing the largest possible market share in the digital sphere.",
    image: IMAGE.marketing,
  },
  {
    id: 2,
    title: "SEO",
    description:
      "Leading the pack on ROI, search engine optimization (SEO) pays huge dividends by increasing key components of your website's performance, like better page speed, mobile responsiveness, and improved organic search results.",
    image: IMAGE.seo,
  },
  {
    id: 3,
    title: "PPC & CRO MANAGEMENT",
    description:
      "We use both Paid Search Advertising (PPC) and Conversion Rate Optimization (CRO) to enhance your company's success by improving your ability to hyper-target your audience through search & social media platforms.",
    image: IMAGE.management,
  },
  {
    id: 4,
    title: "CONTENT MARKETING",
    description:
      "Boost your online presence and establish yourself as a thought leader in your industry by consistently publishing expert content. We will develop a strategy + calendar while creating content that ranks well on search engines.",
    image: IMAGE.content_marketing,
  },
  {
    id: 5,
    title: "EMAIL MARKETING & MANAGEMENT",
    description:
      "As an online marketing firm, our digital marketing experts understand the immense effectiveness of well-executed email marketing campaigns that bring short and long-term results while continually building your subscriber list.",
    image: IMAGE.email_marketing,
  },
  {
    id: 6,
    title: "AFFILIATE & AMAZON MARKETING SERVICES",
    description:
      "We bring the knowhow and skill to ensure your products get seen by the right customers on Amazon or as an affiliate with a mix of SEO, PPC, and storefront branding that gets your products seen on the highly competitive ecommerce platform.",
    image: IMAGE.affiliate_marketing,
  },
];

export default function StickyScroll() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/*===== Left – sticky summary =====*/}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full lg:w-1/3"
          >
            <div className="lg:sticky top-24 space-y-4 lg:space-y-6">
              <h2 className="text-2xl font-semibold uppercase text-foreground md:text-3xl">
                Online Marketing Services for Clients
              </h2>
              <h1 className="text-3xl font-bold uppercase leading-tight text-foreground sm:text-4xl lg:text-5xl">
                What You <br /> Get
              </h1>
              <p className="text-justify text-sm leading-relaxed text-muted-foreground sm:text-base">
                As an award winning full service digital marketing agency, our
                team of Mixologists and Brandtenders mixes up a full menu of
                digital advertising and marketing campaigns designed to create a
                long-term marketing strategy, reach your ideal target audience,
                and optimize your website for search results.
              </p>
            </div>
          </motion.div>

          {/*===== Right – services grid =====*/}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full lg:w-2/3 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2"
          >
            {services.map((service) => (
              <motion.div key={service.id} variants={fadeInUp} {...hoverScale}>
                <Card padding="base" hoverEffect className="flex gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-44 lg:w-44">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 176px"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="mb-1 text-sm font-semibold text-foreground sm:text-base">
                      {service.title}
                    </h3>
                    <p className="text-justify text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {service.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
