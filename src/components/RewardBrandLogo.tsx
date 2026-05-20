import type { RewardIconKey } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface RewardBrandLogoProps {
  iconKey: RewardIconKey;
  className?: string;
}

const brandStyles: Record<
  RewardIconKey,
  {
    label: string;
    altLabel: string;
    wrapper: string;
    logoBoxClassName?: string;
    imageSrc: string;
    imageClassName?: string;
  }
> = {
  delivery: {
    label: "Rappi",
    altLabel: "Rappi",
    wrapper: "border-[#ffdde3] bg-[#fff2f4] text-[#f04b63]",
    logoBoxClassName: "h-9 min-w-[72px] px-2",
    imageSrc: "/brands/rappi.png",
    imageClassName: "h-6 w-auto object-contain",
  },
  health: {
    label: "Cruz Verde",
    altLabel: "Cruz Verde",
    wrapper: "border-[#d9f0df] bg-[#f3fbf5] text-[#2c8a4b]",
    logoBoxClassName: "h-9 min-w-[72px] px-2",
    imageSrc: "/brands/cruz-verde.png",
    imageClassName: "h-7 w-auto object-contain",
  },
  coffee: {
    label: "Juan Valdez",
    altLabel: "Juan Valdez",
    wrapper: "border-[#ead8cb] bg-[#fbf4ef] text-[#7a4c30]",
    logoBoxClassName: "h-10 min-w-[92px] px-2",
    imageSrc: "/brands/juan-valdez.svg",
    imageClassName: "h-8 w-auto object-contain",
  },
  cinema: {
    label: "Cine\nColombia",
    altLabel: "Cine Colombia",
    wrapper: "border-[#ffd1d3] bg-[#fff2f2] text-[#d34452]",
    logoBoxClassName: "h-10 min-w-[96px] px-1.5",
    imageSrc: "/brands/cine-colombia.png",
    imageClassName: "h-7 w-auto object-contain",
  },
  retail: {
    label: "Éxito",
    altLabel: "Éxito",
    wrapper: "border-[#ffe5b0] bg-[#fff8e8] text-[#d68500]",
    logoBoxClassName: "h-9 min-w-[72px] px-2",
    imageSrc: "/brands/exito.png",
    imageClassName: "h-7 w-auto object-contain",
  },
};

const RewardBrandLogo = ({ iconKey, className }: RewardBrandLogoProps) => {
  const brand = brandStyles[iconKey];

  return (
    <div
      className={cn(
        "inline-flex min-w-[132px] items-center gap-2 rounded-2xl border px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
        brand.wrapper,
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-xl bg-white/85",
          brand.logoBoxClassName ?? "h-9 min-w-[72px] px-2",
        )}
      >
        <img
          src={brand.imageSrc}
          alt={`Logo de ${brand.altLabel}`}
          className={cn("max-w-full", brand.imageClassName)}
          loading="lazy"
        />
      </div>
      <div className="min-w-0">
        <p className="whitespace-pre-line text-sm font-black leading-tight">{brand.label}</p>
      </div>
    </div>
  );
};

export default RewardBrandLogo;
