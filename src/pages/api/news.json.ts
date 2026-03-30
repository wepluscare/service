import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const news = await getCollection('news');

  const items = news
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .map((entry) => ({
      id: entry.id,
      title: entry.data.title,
      date: entry.data.date,
      category: entry.data.category,
      summary: entry.data.summary,
      leistungen: entry.data.leistungen ?? [],
      pinned: entry.data.pinned,
    }));

  return new Response(JSON.stringify({ version: 1, items }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
