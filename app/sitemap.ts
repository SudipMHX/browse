import { MetadataRoute } from "next"
import {
  getProjects,
  getPortfolios,
  getTools,
  getLibraries,
} from "@/lib/content"

export const dynamic = "force-static"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://browse.pro.bd"

  const [projectsList, portfoliosList, toolsList, librariesList] =
    await Promise.all([
      getProjects(),
      getPortfolios(),
      getTools(),
      getLibraries(),
    ])

  const projects = projectsList.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const portfolios = portfoliosList.map((p) => ({
    url: `${baseUrl}/portfolios/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const tools = toolsList.map((t) => ({
    url: `${baseUrl}/tools/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const libraries = librariesList.map((l) => ({
    url: `${baseUrl}/libraries/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const routes = [
    "",
    "/projects",
    "/portfolios",
    "/tools",
    "/libraries",
    "/submit",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.9,
  }))

  return [...routes, ...projects, ...portfolios, ...tools, ...libraries]
}
