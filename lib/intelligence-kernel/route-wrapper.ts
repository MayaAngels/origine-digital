// lib/intelligence-kernel/route-wrapper.ts
import { MetaController } from './meta-controller';
import { Homeostat } from './homeostat';
import { SelfModel } from './self-model';
import { OversightAmplifier } from './oversight-amplifier';
import { GoldenBenchmark } from './golden-benchmark';

const homeostat = Homeostat.getInstance();
const selfModel = new SelfModel();
const oversight = new OversightAmplifier();
const golden = new GoldenBenchmark();

export function wrapHandler(name: string, handler: (req: any) => Promise<any>) {
    const controller = new MetaController(name, handler, homeostat, selfModel, oversight, golden);
    return async (req: any) => controller.run(req);
}

// Convenience pre-created controllers for known routes
export const BlogPostController = (handler: any) => wrapHandler('content-blog', handler);
export const SocialPostController = (handler: any) => wrapHandler('content-social', handler);
export const EmailCampaignController = (handler: any) => wrapHandler('content-email', handler);
export const ProductGenerationController = (handler: any) => wrapHandler('product-generation', handler);
