import { Metadata } from "next";

const baseUrl = "https://banddude.github.io/usc-seo-preview";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review your shopping cart at United Studio Collective. Photography prints and artwork ready for checkout.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${baseUrl}/cart`,
  },
};
