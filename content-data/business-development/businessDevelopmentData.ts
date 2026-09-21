// Each area owns four image slots. Add files under public/images, then edit the
// matching src, width, height, alt, and caption below. Use the actual pixel sizes.
// Prefer a new filename when replacing an image to avoid stale optimized caches.
export type BusinessDevelopmentImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export const businessDevelopmentAreas = [
  {
    id: "business-language",
    article: {
      title: "What is Business Language?",
      intro:
        "The same customer need can be expressed differently depending on the place, the person, and the expectation. Business communication works the same way.",
      scenario: [
        "Imagine you go to a local tea stall and say, ‘Brother, one cup of tea please.’ Now imagine you are in a formal restaurant. You may say, ‘Excuse me, one coffee please.’ Your need is almost the same, but the way you communicate changes with the environment.",
        "In business, many founders make the mistake of speaking to every customer in the same way. They explain the product from their own point of view instead of first understanding what the customer is actually worried about or trying to achieve.",
      ],
      realization:
        "Good business communication starts with understanding the customer’s problem first. Then you explain your value in a way that feels relevant and easy for that customer to understand.",
      connection:
        "That is what we mean by Business Language. It is not about using difficult business words. It is about choosing the right message for the right customer, in the right context.",
      customerProblem: [
        "You may have a good product or service, but if customers do not quickly understand what problem you solve, why it matters, or why they should choose you, the value gets lost.",
        "This often creates weak enquiries, confusing conversations, and marketing that talks about the business instead of talking to the customer.",
      ],
      closing:
        "Before trying to sell more, make sure your customer can clearly understand the problem you solve and the value you provide.",
    },
    images: {
      hero: {
        src: "/images/business devlopment/business language/hero.png",
        alt: "Two people discussing an idea, illustrated by speech bubbles changing from confusion to clarity",
        caption:
          "Clear business communication starts with understanding the customer.",
        width: 1122,
        height: 1402,
      },
      scenario: {
        src: "/images/business devlopment/business language/scenario.png",
        alt: "A customer ordering at a tea stall and a restaurant in a split scene",
        caption:
          "The same need can require a different message depending on the customer and situation.",
        width: 1536,
        height: 1024,
      },
      problem: {
        src: "/images/business devlopment/business language/problem.png",
        alt: "A speaker and a confused listener with tangled speech bubbles",
        caption:
          "A good offer can still fail when the customer does not understand its value.",
        width: 1536,
        height: 1024,
      },
      solution: {
        src: "/images/business devlopment/business language/solution.png",
        alt: "An adviser helping turn a tangled message into a clear explanation",
        caption:
          "Understand the problem first, then communicate the solution clearly.",
        width: 1122,
        height: 1402,
      },
    },
    title: "Business Language",
    plainTitle: "Make your business easy for the right customer to understand.",
    exampleTitle: "Same need, different conversation",
    example:
      "At a tea stall you may say, ‘Brother, one cup of tea please.’ In a formal restaurant you may say, ‘Excuse me, one coffee please.’ The need is similar, but the environment and expectation change the way you communicate. Business works the same way.",
    meaning:
      "Business Language means understanding the customer’s problem, expectation, and situation, then explaining your offer in words that make sense to them. It is not about sounding complicated. It is about making your value clear.",
    imageBrief:
      "A premium business conversation scene showing an adviser helping a founder understand how different customers need different communication, using Blackcrest navy-black and brushed-gold styling.",
    problem:
      "My product or service is good, but customers do not clearly understand what I do, why it matters, or why they should choose me.",
    support:
      "We help you clarify what you offer, which customer problem it solves, and how to communicate that value in simple, relevant language.",
    outcome:
      "A clearer business message that is easier for customers to understand and respond to.",
    suitableFor:
      "You have an idea, product, or service but struggle to explain its value clearly to potential customers.",
    includes: [
      "A clear description of your business",
      "Your main customer problem and solution",
      "Customer-focused business messaging",
      "A simple introduction you can use across your website, page, and sales conversations",
    ],
    process: [
      "We understand your business and offer.",
      "We identify the customer problem behind the offer.",
      "We shape clear language that connects the problem with your solution.",
    ],
  },
  {
    id: "niche-selection",
    article: {
      title:
        "When your business tries to sell everything, customers understand nothing clearly.",
      intro:
        "Many new founders have several ideas at once. The real problem is not a lack of ideas. It is a lack of focus.",
      scenario: [
        "Imagine starting an online business. First you sell clothing, then add skincare, then accessories, and later a few unrelated products because each one looks like an opportunity.",
        "After some time, the page has followers and occasional enquiries, but regular customers are not forming. People cannot quickly understand who the business is for, what it is known for, or why they should choose it instead of another seller.",
      ],
      realization:
        "A business becomes easier to market when it is clear about who it serves, what problem it solves, and where it wants to build a strong position.",
      connection:
        "That is where Niche Selection helps. A niche is not only a product category. It connects a specific customer group, a specific problem, and a clear offer.",
      customerProblem: [
        "Without a clear niche, founders often change products, audiences, and marketing messages too often. Money and effort get spread across too many directions.",
        "The result is usually weak positioning: customers may see the business, but they do not remember what it is best at or who it is really for.",
      ],
      closing:
        "You do not need to serve everyone. You need a clear market where your offer can become relevant, understandable, and trusted.",
    },
    images: {
      hero: {
        src: "/images/business devlopment/niche selection/hero.png",
        alt: "Niche selection and market focus illustration",
        caption: "Focus begins by deciding who the business is really for.",
        width: 1122,
        height: 1402,
      },
      scenario: {
        src: "/images/business devlopment/niche selection/scenario.png",
        alt: "Illustration of the challenge of choosing a business niche",
        caption:
          "Too many directions can make a business difficult for customers to understand.",
        width: 1536,
        height: 1024,
      },
      problem: {
        src: "/images/business devlopment/niche selection/problem.png",
        alt: "Illustration of an unfocused business direction",
        caption:
          "When everything is a priority, the business has no clear position.",
        width: 1536,
        height: 1024,
      },
      solution: {
        src: "/images/business devlopment/niche selection/solution.png",
        alt: "Illustration of choosing a focused market and customer group",
        caption:
          "Choose the customer, problem, and offer you want to focus on first.",
        width: 1122,
        height: 1402,
      },
    },
    title: "Niche Selection",
    plainTitle:
      "Choose a market where your business can build a clear position.",
    exampleTitle: "A business cannot be everything to everyone",
    example:
      "A new online business starts with clothing, adds skincare, then accessories and other products. The page keeps growing, but customers cannot understand what the business is really known for. The problem is not the number of products. The problem is the lack of a clear niche.",
    meaning:
      "Niche Selection means deciding which customer group you want to serve, what specific problem you want to solve, what type of offer fits that problem, and how your business will be different in that market.",
    imageBrief:
      "A premium strategy scene with a small team evaluating several market segments and narrowing them down to one focused opportunity, in Blackcrest navy-black and brushed-gold colors.",
    problem:
      "I have several business ideas or products, but I am not sure which market, customer, or problem I should focus on.",
    support:
      "We help you compare opportunities, identify a realistic target customer, clarify the problem worth solving, and choose a focused niche for the business.",
    outcome:
      "A clearer niche, target customer, and business direction to guide product, marketing, and sales decisions.",
    suitableFor:
      "You want to start a business or reposition an existing one, but your market focus is still unclear.",
    includes: [
      "Niche and market direction",
      "Target customer definition",
      "Customer problem identification",
      "Offer and positioning focus",
    ],
    process: [
      "We review your ideas, skills, market, and possible offers.",
      "We compare the customer groups and problems you could serve.",
      "We select a focused niche and define the business direction around it.",
    ],
  },
  {
    id: "business-setup-plan",
    article: {
      title:
        "You know the idea and the niche. Now how will the business actually work?",
      intro:
        "This is where many founders become stuck. They know what they want to sell, but they do not yet have a structure for launching and operating the business.",
      scenario: [
        "You have selected your niche and decided on a product or service. Then the questions start: What should the price be? How will customers order? Which channel should you use? What should you spend on first? How will marketing, sales, and operations work together?",
        "Without a setup plan, founders often start several things at once, spend money too early, change direction repeatedly, or delay the launch because every decision feels urgent.",
      ],
      realization:
        "An idea becomes a business when the important pieces are organised into a practical structure and sequence.",
      connection:
        "A Business Setup Plan defines the offer, pricing, customer journey, operational basics, marketing starting point, sales process, responsibilities, and launch priorities.",
      customerProblem: [
        "A founder may spend on branding, a website, ads, packaging, or tools before deciding which parts are actually necessary for the first stage.",
        "This creates unnecessary cost and confusion because the business is being built before the operating logic is clear.",
      ],
      closing:
        "Do not start by doing everything. Start by building the minimum clear structure the business needs to operate, sell, learn, and grow.",
    },
    images: {
      hero: {
        src: "/images/business devlopment/business setup plan/hero.png",
        alt: "Business setup and launch planning illustration",
        caption:
          "A strong start comes from a clear structure, not from doing everything at once.",
        width: 561,
        height: 701,
      },
      scenario: {
        src: "/images/business devlopment/business setup plan/business_setup_scenario.png",
        alt: "Illustration of decisions involved in starting a business",
        caption:
          "The right sequence helps reduce confusion, unnecessary cost, and delay.",
        width: 561,
        height: 701,
      },
      problem: {
        src: "/images/business devlopment/business setup plan/business_setup_problem.png",
        alt: "Illustration of the challenges of organising a business launch",
        caption:
          "When every task feels urgent, the business needs priorities and structure.",
        width: 561,
        height: 701,
      },
      solution: {
        src: "/images/business devlopment/business setup plan/business_setup_solution.png",
        alt: "Illustration of a structured business setup plan",
        caption:
          "Build the business in the right order with a practical setup plan.",
        width: 561,
        height: 701,
      },
    },
    title: "Business Setup Plan",
    plainTitle:
      "Turn the idea into a business structure you can actually launch.",
    exampleTitle: "Knowing what to sell is only the beginning",
    example:
      "You have selected your niche and offer, but now you are unsure about pricing, operations, customer acquisition, marketing, sales, and what to do first. Without a setup plan, founders often spend too early and build in the wrong order.",
    meaning:
      "A Business Setup Plan organises the main parts of the business before launch: offer, pricing, customer journey, basic operations, marketing, sales, responsibilities, and priorities. It gives the founder a practical order of action.",
    imageBrief:
      "A premium business-planning visual with a step-by-step startup structure—offer, pricing, operations, marketing, sales—using dark navy-black and brushed-gold Blackcrest styling, without text-heavy design.",
    problem:
      "I know what business I want to start, but I do not know how to structure it, what to do first, or where to invest first.",
    support:
      "We organise the essential business decisions into a practical setup plan so you can move from idea to launch with clearer priorities and less unnecessary spending.",
    outcome:
      "A practical startup structure and launch roadmap with clear priorities.",
    suitableFor:
      "You have an idea and a niche but need a clear plan for setting up and launching the business.",
    includes: [
      "Offer and pricing structure",
      "Basic operating process",
      "Customer journey and sales starting point",
      "Marketing and launch priorities",
    ],
    process: [
      "We review your idea, niche, and current resources.",
      "We define the essential parts the business needs to operate.",
      "We organise them into a practical launch sequence and priority plan.",
    ],
  },
  {
    id: "execution-support",
    article: {
      title: "The plan is ready. The business is still not moving.",
      intro:
        "A plan creates direction, but execution creates progress. Many businesses struggle in the gap between knowing what to do and actually doing it consistently.",
      scenario: [
        "You have a list of tasks: prepare the offer, contact suppliers, set up the page, create content, follow up with leads, and review pricing. Every task looks important, so work starts on several things at once.",
        "A week later, many tasks are half-finished. The founder is busy, but the business has not moved meaningfully closer to launch, sales, or growth.",
      ],
      realization:
        "Execution improves when priorities are clear, responsibilities are defined, and progress is reviewed instead of simply adding more tasks.",
      connection:
        "Execution Support turns a business plan into specific actions: what happens first, who is responsible, what success looks like, and when the result should be reviewed.",
      customerProblem: [
        "Founders often lose momentum because everything feels urgent. They switch between tasks, delay uncomfortable work, or keep planning instead of finishing the next useful action.",
        "Without review and accountability, important activities such as customer conversations, sales follow-up, and testing the offer are easily pushed aside.",
      ],
      closing:
        "Growth usually comes from completing the right actions consistently—not from collecting more unfinished ideas.",
    },
    images: {
      hero: {
        src: "/images/business devlopment/execution support/hero.png",
        alt: "Business execution and priority planning illustration",
        caption: "Execution turns business direction into measurable progress.",
        width: 1122,
        height: 1402,
      },
      scenario: {
        src: "/images/business devlopment/execution support/scenario.png",
        alt: "Illustration of turning business plans into tasks",
        caption:
          "A short list of priorities is more useful than many unfinished tasks.",
        width: 1536,
        height: 1024,
      },
      problem: {
        src: "/images/business devlopment/execution support/problem.png",
        alt: "Illustration of the challenges of completing business priorities",
        caption: "Being busy is not the same as moving the business forward.",
        width: 1536,
        height: 1024,
      },
      solution: {
        src: "/images/business devlopment/execution support/solution.png",
        alt: "Illustration of organised business actions and progress",
        caption: "Prioritise, execute, review, and improve.",
        width: 1122,
        height: 1402,
      },
    },
    title: "Execution Plan & Practical Support",
    plainTitle: "Turn business plans into clear actions and completed work.",
    exampleTitle: "Busy does not always mean progress",
    example:
      "A founder can spend an entire week switching between branding, content, tools, suppliers, and planning, yet still avoid the few actions that would move the business forward. Execution is about choosing the right next steps and completing them in the right order.",
    meaning:
      "Execution planning turns strategy into specific tasks, priorities, responsibilities, and review points. Practical support helps keep those actions moving and makes it easier to adjust when the business learns something new.",
    imageBrief:
      "A premium execution dashboard scene with a team moving a small number of priorities from plan to action, using Blackcrest navy-black and gold styling.",
    problem:
      "I have a plan and many ideas, but I am struggling to decide what to do first and to keep important work moving.",
    support:
      "We help you prioritise the work, organise the next actions, clarify responsibilities, and review progress so the business keeps moving.",
    outcome:
      "A practical execution roadmap with clear priorities, actions, ownership, and review points.",
    suitableFor:
      "You know what needs to improve, but progress is slow because priorities and execution are unclear.",
    includes: [
      "Priority setting",
      "Action and responsibility planning",
      "Practical execution support",
      "Progress review and next-step decisions",
    ],
    process: [
      "We review the current plan and business priorities.",
      "We choose the most useful next actions and assign responsibility.",
      "We review progress, remove blockers, and decide what comes next.",
    ],
  },
  {
    id: "marketing-growth",
    article: {
      title:
        "You are posting, boosting, and spending. But what is the marketing supposed to achieve?",
      intro:
        "More marketing activity does not automatically create more customers. Without a clear audience, message, channel, and goal, activity becomes difficult to measure and improve.",
      scenario: [
        "A small business posts regularly on Facebook, occasionally boosts posts, tries short videos, and copies ideas from competitors. Some posts get reactions, others do not, but the owner cannot tell which activity is actually helping the business.",
        "The problem is not a lack of effort. The problem is that the marketing actions are not connected to one clear customer, one clear message, and one clear business objective.",
      ],
      realization:
        "Marketing becomes useful when every action has a reason: who it is for, what problem it speaks to, where it should appear, and what the customer should do next.",
      connection:
        "A Marketing & Growth Plan connects your target customer, offer, content, channels, budget, and sales objective into one practical direction.",
      customerProblem: [
        "Businesses often spend money on boosting or advertising before they know which message is working or whether the page, offer, and follow-up process are ready.",
        "This can create views and enquiries without creating a reliable path to sales or growth.",
      ],
      closing:
        "Do not market everywhere. Build a focused system that reaches the right people, communicates the right value, and supports the next business goal.",
    },
    images: {
      hero: {
        src: "/images/business devlopment/marketing growth/hero.png",
        alt: "Marketing and business growth planning illustration",
        caption:
          "Marketing works best when every activity has a clear purpose.",
        width: 1122,
        height: 1402,
      },
      scenario: {
        src: "/images/business devlopment/marketing growth/scenario.png",
        alt: "Illustration of business marketing activity",
        caption:
          "Reach the right audience with the right message and a clear next step.",
        width: 1536,
        height: 1024,
      },
      problem: {
        src: "/images/business devlopment/marketing growth/problem.png",
        alt: "Illustration of the challenges of unfocused marketing",
        caption:
          "More posts and more spend do not help when the direction is unclear.",
        width: 1536,
        height: 1024,
      },
      solution: {
        src: "/images/business devlopment/marketing growth/solution.png",
        alt: "Illustration of a focused marketing and growth plan",
        caption:
          "Connect audience, message, channel, and goal before scaling activity.",
        width: 1122,
        height: 1402,
      },
    },
    title: "Marketing Plan & Business Growth",
    plainTitle:
      "Give your marketing a clear customer, message, channel, and goal.",
    exampleTitle: "Activity is not the same as strategy",
    example:
      "A business can post every day, boost content, and try several platforms while still being unsure which activity is creating real enquiries. Marketing needs a clear reason behind each action, not just more activity.",
    meaning:
      "A Marketing & Growth Plan decides who you want to reach, what problem you want to speak about, what message you will use, which channels make sense, and how marketing should support enquiries, sales, or another business goal.",
    imageBrief:
      "A premium strategy-room visual showing audience, message, channel, funnel, and growth planning with Blackcrest dark navy-black and gold accents.",
    problem:
      "I am doing marketing, but I do not know what to focus on, which channels matter, or which activity is actually helping the business grow.",
    support:
      "We connect your target customer, offer, content, channels, budget, and business objective into a focused marketing and growth plan.",
    outcome:
      "A practical marketing direction with clearer priorities, channels, content focus, and ways to review progress.",
    suitableFor:
      "You are already promoting the business or want to start, but your marketing direction and growth priorities are unclear.",
    includes: [
      "Marketing goals and priorities",
      "Target customer and message focus",
      "Recommended channels and content direction",
      "Simple review points for learning what is working",
    ],
    process: [
      "We define what the business needs marketing to achieve.",
      "We connect the audience, offer, message, and channels.",
      "We create a focused plan and review what should be improved over time.",
    ],
  },
  {
    id: "sales-funnel",
    article: {
      title: "You may not have a lead problem. You may have a leakage problem.",
      intro:
        "A business can get attention and enquiries but still lose potential customers before they buy. The important question is: where are they dropping out?",
      scenario: [
        "A customer sees your post, sends a message, and asks about the service. The reply comes several hours later and only gives the price. The customer asks one more question, but nobody follows up.",
        "From the business side, it looks like another person who was ‘not serious.’ From the customer side, the journey simply became unclear and easy to leave.",
      ],
      realization:
        "More leads do not solve a broken customer journey. First understand where interest is being lost, then improve that stage before spending more to attract people.",
      connection:
        "A Sales Funnel maps the customer journey from attention to interest, enquiry, offer, purchase, and follow-up. It helps identify where people disappear and what needs to become clearer or faster.",
      customerProblem: [
        "Businesses often focus on how many messages or leads they receive, but not on response time, qualification, follow-up, offer clarity, or the next step after the first conversation.",
        "When those stages are inconsistent, more advertising can simply send more people into the same weak process.",
      ],
      closing:
        "Find the leak, fix the process, then scale the traffic going into it.",
    },
    images: {
      hero: {
        src: "/images/business devlopment/sales-funnel/hero.png",
        alt: "Sales funnel and customer journey illustration",
        caption:
          "Growth improves when you can see where customers are being lost.",
        width: 1122,
        height: 1402,
      },
      scenario: {
        src: "/images/business devlopment/sales-funnel/scenario.png",
        alt: "Illustration of a customer moving through a sales journey",
        caption:
          "Every stage of the customer journey can create or lose an opportunity.",
        width: 1122,
        height: 1402,
      },
      problem: {
        src: "/images/business devlopment/sales-funnel/problem.png",
        alt: "Illustration of lost interest during the sales process",
        caption:
          "A lead can disappear when the next step is unclear or follow-up is inconsistent.",
        width: 1122,
        height: 1402,
      },
      solution: {
        src: "/images/business devlopment/sales-funnel/solution.png",
        alt: "Illustration of improving the customer journey and follow-up",
        caption:
          "Fix the weak stage before sending more people into the funnel.",
        width: 1122,
        height: 1402,
      },
    },
    title: "Sales Funnel Planning",
    plainTitle:
      "Find where potential customers are being lost before trying to generate more leads.",
    exampleTitle: "Interest can disappear between the message and the sale",
    example:
      "A person sees your content, sends an enquiry, receives a slow or incomplete reply, and then disappears. The business may think the lead was weak, but the real problem may be the process between interest, response, offer, and follow-up.",
    meaning:
      "A Sales Funnel is the customer journey from first attention to interest, enquiry, offer, purchase, and retention. Planning the funnel helps you see where customers need clearer information, faster response, stronger follow-up, or an easier next step.",
    imageBrief:
      "A premium Blackcrest-style funnel visualization showing customer movement from attention to enquiry to offer to purchase to retention, with dark navy-black and gold accents.",
    problem:
      "People show interest or send enquiries, but too many conversations stop before they become real sales opportunities.",
    support:
      "We map your customer journey, identify where interest is being lost, and improve the response, offer, follow-up, and next-step process.",
    outcome:
      "A clearer sales journey with stronger follow-up and fewer avoidable drop-offs.",
    suitableFor:
      "You are receiving attention or enquiries but too few people are moving toward a purchase.",
    includes: [
      "Customer journey mapping",
      "Lead and enquiry stage review",
      "Offer and follow-up process",
      "Identification of funnel leakage points",
    ],
    process: [
      "We map how customers currently move from attention to purchase.",
      "We identify where and why interest is being lost.",
      "We improve the weak stages and create a clearer follow-up process.",
    ],
  },
  {
    id: "after-support-retention",
    article: {
      title: "The sale happened. Then the customer disappeared.",
      intro:
        "Many businesses spend most of their energy getting the first purchase, then stop communicating after payment. That can make every future sale harder and more expensive.",
      scenario: [
        "A customer buys from your business. The order is delivered, payment is complete, and the conversation ends. Nobody checks whether the customer is satisfied, whether they need help, or whether there is a useful next step.",
        "A few months later, the same customer needs something similar but buys from another business because there was no relationship, follow-up, or reason to remember the first one.",
      ],
      realization:
        "A completed sale is not the end of the customer journey. Support, feedback, and relevant follow-up can strengthen trust and create repeat business.",
      connection:
        "After Support & Retention means planning what happens after the purchase: onboarding, check-ins, support, feedback, repeat-purchase opportunities, referrals, and long-term communication.",
      customerProblem: [
        "Businesses often keep searching for new customers while ignoring the people who have already trusted them once.",
        "Without a simple retention process, useful feedback is missed, service problems stay hidden, and satisfied customers are never given a reason to return or recommend the business.",
      ],
      closing:
        "Do not treat every sale like the end of a conversation. Build a customer experience that gives people a reason to stay, return, and refer others.",
    },
    images: {
      hero: {
        src: "/images/business devlopment/after-support-retention/hero.png",
        alt: "Customer support and retention illustration",
        caption: "Long-term growth continues after the first sale.",
        width: 1122,
        height: 1402,
      },
      scenario: {
        src: "/images/business devlopment/after-support-retention/scenario.png",
        alt: "Illustration of the customer experience after a purchase",
        caption: "The customer relationship should not end at payment.",
        width: 1122,
        height: 1402,
      },
      problem: {
        src: "/images/business devlopment/after-support-retention/problem.png",
        alt: "Illustration of lost customer relationships after a sale",
        caption:
          "Without follow-up, satisfied customers can quietly disappear.",
        width: 1122,
        height: 1402,
      },
      solution: {
        src: "/images/business devlopment/after-support-retention/solution.png",
        alt: "Illustration of customer care and ongoing relationships",
        caption:
          "Support the customer, learn from feedback, and create reasons to return.",
        width: 1122,
        height: 1402,
      },
    },
    title: "After Support & Retention",
    plainTitle: "Keep creating value after the first sale.",
    exampleTitle: "The first purchase should not be the last conversation",
    example:
      "A customer buys once and then hears nothing from the business again. Later, when they need the same type of product or service, they choose someone else. The first sale happened, but the relationship was never developed.",
    meaning:
      "After Support & Retention means planning how you help, follow up with, learn from, and stay relevant to customers after they buy. The goal is better customer experience, repeat business, referrals, and stronger long-term trust.",
    imageBrief:
      "A premium client-success scene showing post-purchase support, feedback, repeat business, and referrals, using Blackcrest navy-black and brushed-gold styling.",
    problem:
      "Customers buy once, but I do not have a clear process for support, feedback, repeat business, or staying in touch.",
    support:
      "We help you create a practical after-sales and retention process with useful check-ins, support, feedback, repeat-purchase opportunities, and referral touchpoints.",
    outcome:
      "A clearer after-sales experience designed to strengthen trust, repeat business, and customer relationships.",
    suitableFor:
      "You already have customers but want a better system for support, repeat business, referrals, and long-term relationships.",
    includes: [
      "After-sales communication plan",
      "Customer support and check-in points",
      "Feedback and learning process",
      "Repeat business and referral opportunities",
    ],
    process: [
      "We review what currently happens after a customer buys.",
      "We identify the most useful support, feedback, and follow-up moments.",
      "We build a simple retention process that fits the business.",
    ],
  },
] as const;

export const businessChallenges = [
  {
    id: "starting",
    label: "I want to start a business",
    title: "Move from idea to a clear business direction.",
    description:
      "If you want to start but are unsure what to focus on, we help you understand the business language, choose a niche, and build a practical setup plan.",
    steps: [
      "Understand the customer problem",
      "Choose a focused niche",
      "Build a practical setup plan",
    ],
    href: "/services/business-development/business-language",
    linkLabel: "Explore startup support",
  },
  {
    id: "customers",
    label: "I need customers and better marketing",
    title: "Connect the right customer with the right message and channel.",
    description:
      "If your business is ready but marketing feels scattered, we help you clarify the customer, sharpen the message, and create a focused growth plan.",
    steps: [
      "Clarify your target customer",
      "Build the right message",
      "Set marketing and growth priorities",
    ],
    href: "/services/business-development/niche-selection",
    linkLabel: "Explore marketing & growth support",
  },
  {
    id: "growth",
    label: "I need better sales & retention",
    title: "Fix the customer journey before trying to scale it.",
    description:
      "If people are showing interest but too few are buying or returning, we help you find the leakage, improve follow-up, and build a stronger after-sales process.",
    steps: [
      "Map the sales funnel",
      "Improve enquiry and follow-up",
      "Build after-sales and retention support",
    ],
    href: "/services/business-development/sales-funnel",
    linkLabel: "Explore sales & retention support",
  },
] as const;
