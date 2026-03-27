import JSZip from 'jszip';
import { buildStaticSite } from './staticSite';
import type { GeneratedSite } from '../types/site';

export async function downloadSiteZip(site: GeneratedSite) {
  const zip = new JSZip();
  const files = buildStaticSite(site);

  await Promise.all(
    Object.entries(files).map(async ([path, content]) => {
      if (content !== null) {
        zip.file(path, content);
        return;
      }

      const assetUrl = `${import.meta.env.BASE_URL}${path}`;
      const response = await fetch(assetUrl);
      const buffer = await response.arrayBuffer();
      zip.file(path, buffer);
    }),
  );

  const blob = await zip.generateAsync({ type: 'blob' });
  const link = document.createElement('a');
  const safeTitle = site.config.siteTitle.replace(/[\\/:*?"<>|]/g, '_');
  link.href = URL.createObjectURL(blob);
  link.download = `${safeTitle || 'retro-homepage'}.zip`;
  link.click();
  URL.revokeObjectURL(link.href);
}
