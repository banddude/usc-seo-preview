import type { Metadata } from "next";
import EditorialPage from "../components/EditorialPage";
import { previewUrl } from "../lib/preview";
import pageData from "../../content/fashion-film-production-cost.json";

export const metadata: Metadata = {
  title: { absolute: pageData.title },
  description: pageData.description,
  openGraph: { title: pageData.title, description: pageData.description, url: `${previewUrl}/fashion-film-production-cost/` },
  twitter: { card: "summary_large_image", title: pageData.title, description: pageData.description },
  alternates: { canonical: `${previewUrl}/fashion-film-production-cost/` },
};

export default function Page() {
  return <EditorialPage page={pageData} />;
}
