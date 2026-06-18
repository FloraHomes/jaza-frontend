import { ExternalLink } from "lucide-react";

interface PropertyLocationMapProps {
  lat: number;
  lng: number;
  title: string;
}

export default function PropertyLocationMap({
  lat,
  lng,
  title,
}: PropertyLocationMapProps) {
  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
  const embedUrl = `https://www.google.com/maps?q=${lat},${lng}&hl=en&z=15&output=embed`;

  return (
    <div className="overflow-hidden rounded-2xl border border-brdr bg-white">
      <iframe
        title={`Map location for ${title}`}
        src={embedUrl}
        className="aspect-[4/3] w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-brdr bg-surface/40 px-4 py-3 text-sm">
        <p className="text-muted">
          <span className="font-medium text-foreground">Coordinates:</span>{" "}
          {lat.toFixed(6)}, {lng.toFixed(6)}
        </p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          Open in Google Maps
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
