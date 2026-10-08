export interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  quarterlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
  features: string[];
  cta: string;
}

export const PLANS: Plan[] = [
  {
    id: "essential",
    name: "Essential",
    monthlyPrice: 2499,
    quarterlyPrice: 6749,
    yearlyPrice: 23990,
    features: [
      "Gym floor access",
      "2 group classes per week",
      "Locker access",
      "Fitness assessment",
      "Mobile app",
    ],
    cta: "Choose Essential",
  },
  {
    id: "performance",
    name: "Performance",
    monthlyPrice: 4499,
    quarterlyPrice: 12149,
    yearlyPrice: 43190,
    popular: true,
    features: [
      "Unlimited classes",
      "Quarterly coach review",
      "Recovery lounge access",
      "Nutrition consultation",
      "Monthly guest pass",
      "Priority booking",
    ],
    cta: "Choose Performance",
  },
  {
    id: "elite",
    name: "Elite",
    monthlyPrice: 7999,
    quarterlyPrice: 21599,
    yearlyPrice: 76790,
    features: [
      "Everything in Performance",
      "4 personal training sessions / mo",
      "Custom meal plan",
      "Steam & sauna access",
      "Dedicated private locker",
      "Private VIP lounge access",
    ],
    cta: "Choose Elite",
  },
];

export const PRICING_FOOTNOTE =
  "Free 3-day trial on every plan. Freeze your membership anytime. Cancel with 30 days' notice.";
