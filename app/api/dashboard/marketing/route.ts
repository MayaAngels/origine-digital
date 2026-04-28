import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
    const stats = {
        blogArticles: 0,
        socialPosts: 0,
        campaigns: 0,
        experiments: 0,
    };
    const blogDir = path.join(process.cwd(), 'data', 'content', 'blog');
    const socialDir = path.join(process.cwd(), 'data', 'content', 'social');
    const campaignDir = path.join(process.cwd(), 'data', 'campaigns');
    const experimentDir = path.join(process.cwd(), 'data', 'experiments');

    try {
        stats.blogArticles = (await fs.readdir(blogDir)).filter(f => f.endsWith('.json')).length;
    } catch { }
    try {
        stats.socialPosts = (await fs.readdir(socialDir)).filter(f => f.endsWith('.json')).length;
    } catch { }
    try {
        stats.campaigns = (await fs.readdir(campaignDir)).filter(f => f.endsWith('.json')).length;
    } catch { }
    try {
        stats.experiments = (await fs.readdir(experimentDir)).filter(f => f.endsWith('.json')).length;
    } catch { }

    return NextResponse.json({ stats, timestamp: new Date().toISOString() });
}
