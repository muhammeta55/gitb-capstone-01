import { PricingPlan } from "@/types";

export const pricingPlans: PricingPlan[] = [
  {
    id: "self-paced",
    name: "Self-Paced",
    priceEUR: 49,
    period: "month",
    description: "Learn on your own schedule with full access to course materials.",
    features: [
      "Access to all recorded lessons",
      "Community forum access",
      "Project starter templates",
      "Certificate of completion",
    ],
    highlighted: false,
  },
  {
    id: "cohort",
    name: "Live Cohort",
    priceEUR: 249,
    period: "month",
    description: "Join a live cohort with instructors and a fixed group of peers.",
    features: [
      "Everything in Self-Paced",
      "Live weekly sessions with instructors",
      "1:1 mentor check-ins",
      "Real-time code review",
      "Job-ready portfolio project",
    ],
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Team / Enterprise",
    priceEUR: null,
    period: null,
    description: "Custom cohorts for companies upskilling multiple employees.",
    features: [
      "Everything in Live Cohort",
      "Custom curriculum tracks",
      "Dedicated account manager",
      "Team progress dashboard",
      "Flexible billing",
    ],
    highlighted: false,
  },
];