// TODO(v0.9.0):
// Replace native date/time inputs with iOS-style wheel picker.
import { useEffect, useRef } from "react";

interface WheelPickerProps {
  values: string[];
  value: string;
  onChange: (value: string) => void;
}

const ITEM_HEIGHT = 44;

export default function WheelPicker({
  values,
  value,
  onChange,
}: WheelPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const index = values.indexOf(value);

    if (index === -1) {
      return;
    }

    container.scrollTo({
      top: index * ITEM_HEIGHT,
      behavior: "auto",
    });
  }, [value, values]);

  useEffect(() => {
    return () => {
      if (scrollTimeout.current !== null) {
  window.clearTimeout(scrollTimeout.current);
}
    };
  }, []);

  function handleScroll() {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const scrollTimeout = useRef<ReturnType<typeof window.setTimeout> | null>(null);

    scrollTimeout.current = window.setTimeout(() => {
      const index = Math.round(
        container.scrollTop / ITEM_HEIGHT,
      );

      container.scrollTo({
        top: index * ITEM_HEIGHT,
        behavior: "smooth",
      });

      const next = values[index];

      if (next && next !== value) {
        onChange(next);
      }
    }, 80);
  }

  return (
    <div className="relative">
      {/* выбранная область */}

      <div
        className="
          pointer-events-none
          absolute
          left-3
          right-3
          top-1/2
          z-10
          h-11
          -translate-y-1/2
          rounded-2xl
          border
          border-sky-500/30
          bg-sky-500/10
          backdrop-blur-sm
        "
      />

      {/* затемнение сверху */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-20
          h-16
          bg-gradient-to-b
          from-slate-900
          via-slate-900/80
          to-transparent
        "
      />

      {/* затемнение снизу */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-20
          h-16
          bg-gradient-to-t
          from-slate-900
          via-slate-900/80
          to-transparent
        "
      />

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="
          h-[220px]
          overflow-y-auto
          snap-y
          snap-mandatory
          scrollbar-none
        "
      >
        <div
          style={{
            height: ITEM_HEIGHT * 2,
          }}
        />

        {values.map((item) => {
          const selected = item === value;

          return (
            <div
              key={item}
              className={`
                flex
                h-11
                snap-center
                items-center
                justify-center
                select-none
                transition-all
                duration-150
                ${
                  selected
                    ? "scale-110 text-[30px] font-bold text-white"
                    : "scale-90 text-[22px] text-slate-500"
                }
              `}
            >
              {item}
            </div>
          );
        })}

        <div
          style={{
            height: ITEM_HEIGHT * 2,
          }}
        />
      </div>
    </div>
  );
}