export default function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" }) {
  const sizes = size === "sm" ? "h-7 w-7 text-xs" : "h-9 w-9 text-sm";

  return (
    <div
      className={`${sizes} flex shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold uppercase text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300`}
    >
      {name.charAt(0)}
    </div>
  );
}
