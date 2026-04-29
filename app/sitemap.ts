import { MetadataRoute } from "next";
import { ROUTES } from "../lib/constants/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://origine.digital";
  
  const routes = [
    ROUTES.home,
    ROUTES.shop,
    ROUTES.services,
    ROUTES.doneForYou,
    ROUTES.about,
    ROUTES.faq,
    ROUTES.contact,
  ];
  
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === ROUTES.home ? 1 : 0.8,
  }));
}