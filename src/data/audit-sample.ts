/**
 * The example audit: one sample score per pillar, out of 100. Shared by the report terminal (ReportA) and the pixel
 * score bars beside it (PixelAuditA), so the two never disagree. Sample values, marked "example" wherever they show.
 */
export const auditSample = [
  { pillar: 'Figma inspect', score: 76, days: '2 days' },
  { pillar: 'Agentic readiness', score: 34, days: '5 days' },
  { pillar: 'Conventions', score: 58, days: '1 day' },
  { pillar: 'Component API', score: 51, days: '3 days' },
  { pillar: 'Zero drift', score: 27, days: '4 days' },
] as const;

export const auditGrade = 'C';
