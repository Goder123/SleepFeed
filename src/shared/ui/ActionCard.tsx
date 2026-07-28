import type { ButtonHTMLAttributes, ReactNode } from "react";

type ActionCardProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
  title: string;
  color: string;
};

export default function ActionCard({
  icon,
  title,
  color,
  className = "",
  ...props
}: ActionCardProps) {
  return (
    <button
      {...props}
      className={`
        w-full
        rounded-[32px]
        p-8
        shadow-lg
        transition-all
        duration-200
        active:scale-95
        hover:scale-[1.02]
        ${color}
        ${className}
      `}
    >
      <div className="flex flex-col items-center gap-4">
        {icon}

        <span className="text-2xl font-bold">
          {title}
        </span>
      </div>
    </button>
  );
}