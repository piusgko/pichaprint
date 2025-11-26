"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const hours = Array.from({ length: 12 }, (_, index) =>
  String(index + 1).padStart(2, "0"),
);
const minutes = Array.from({ length: 12 }, (_, index) =>
  String(index * 5).padStart(2, "0"),
);
const meridiems = ["AM", "PM"];

const SelectorColumn = ({ label, items, selected, onSelect }) => (
  <div className="rounded-2xl border border-neutral-200 bg-white/70 p-2 shadow-[0_25px_45px_-30px_rgba(15,23,42,0.5)]">
    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-neutral-500">
      {label}
    </p>
    <div className="mt-2 max-h-40 space-y-1 overflow-y-auto pr-1">
      {items.map((item) => (
        <button
          type="button"
          key={item}
          onClick={() => onSelect(item)}
          className={cn(
            "w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-neutral-600 transition",
            selected === item
              ? "bg-neutral-900 text-white shadow-lg"
              : "hover:bg-neutral-100 hover:text-neutral-900",
          )}
          aria-pressed={selected === item}
        >
          {item}
        </button>
      ))}
    </div>
  </div>
);

const TimePicker = ({ value, onChange = () => {}, className }) => {
  const timeValue = value ?? { hour: "", minute: "", period: "AM" };

  const handleUpdate = (segment) => {
    onChange({
      ...timeValue,
      ...segment,
    });
  };

  const hasSelection =
    timeValue.hour && timeValue.minute && timeValue.period
      ? `${timeValue.hour}:${timeValue.minute} ${timeValue.period}`
      : "No time selected";

  return (
    <div
      className={cn(
        "rounded-3xl border border-white/20 bg-gradient-to-br from-white/95 via-white/85 to-white/70 p-4 text-neutral-900 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.8)]",
        className,
      )}
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
          Choose a slot
        </p>
        <span className="text-xs font-semibold text-neutral-500">{hasSelection}</span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <SelectorColumn
          label="Hour"
          items={hours}
          selected={timeValue.hour}
          onSelect={(hour) => handleUpdate({ hour })}
        />
        <SelectorColumn
          label="Minute"
          items={minutes}
          selected={timeValue.minute}
          onSelect={(minute) => handleUpdate({ minute })}
        />
        <SelectorColumn
          label="AM / PM"
          items={meridiems}
          selected={timeValue.period}
          onSelect={(period) => handleUpdate({ period })}
        />
      </div>
    </div>
  );
};

export default TimePicker;

