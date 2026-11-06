import type { Metadata } from "next";
import { previewUrl } from "../lib/preview";

const title = "Video Production Company in Los Angeles | USC";
const description = "Los Angeles video production company for fashion films, brand work, and experimental shorts. Full crews, camera packages, editing, and color grading.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: { title, description, url: `${previewUrl}/services/` },
  twitter: { card: "summary_large_image", title, description },
  alternates: { canonical: `${previewUrl}/services/` },
};
