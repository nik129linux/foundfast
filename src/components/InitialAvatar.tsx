import { cn } from "@/lib/utils";

interface InitialAvatarProps {
  initials: string;
  className?: string;
  textClassName?: string;
}

const InitialAvatar = ({ initials, className, textClassName }: InitialAvatarProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border border-primary/10 bg-primary/10 text-primary",
        className,
      )}
      aria-hidden="true"
    >
      <span className={cn("text-sm font-bold tracking-[0.24em]", textClassName)}>{initials}</span>
    </div>
  );
};

export default InitialAvatar;
