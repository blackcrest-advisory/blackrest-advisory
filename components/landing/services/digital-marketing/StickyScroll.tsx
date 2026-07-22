import { IMAGE } from "@/constants/imagesConfig";
import Image from "next/image";

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

const StickyScroll = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Left – sticky summary */}
      <div className="w-full lg:w-1/3">
        <div className="lg:sticky top-24 space-y-4 lg:space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold uppercase text-heading">
            Online Marketing Services for Clients
          </h2>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl uppercase font-bold text-heading leading-tight">
            What You <br /> Get
          </h1>
          <p className="text-body text-sm sm:text-base leading-relaxed text-justify">
            As an award winning full service digital marketing agency, our team
            of Mixologists and Brandtenders mixes up a full menu of digital
            advertising and marketing campaigns designed to create a long-term
            marketing strategy, reach your ideal target audience, and optimize
            your website for search results.
          </p>
        </div>
      </div>

      {/* Right – services grid */}
      <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex gap-4 p-4 rounded-lg bg-card-bg hover:shadow-lg transition-shadow duration-200"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-44 lg:h-44 rounded-full overflow-hidden shrink-0">
              <Image
                width={96}
                height={96}
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-sm sm:text-base font-semibold text-heading mb-1">
                {service.title}
              </h3>
              <p className="text-body text-xs sm:text-sm leading-relaxed text-justify">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickyScroll;
