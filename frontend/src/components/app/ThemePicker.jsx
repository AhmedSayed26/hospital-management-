import { useState } from "react";
import { Check, Monitor, Moon, Palette, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useTheme } from "@/components/theme-provider";

const COLOR_OPTIONS = [
  { id: "medical", label: "Medical Blue", swatch: "bg-[oklch(0.48_0.19_240)]" },
  { id: "teal", label: "Teal", swatch: "bg-[oklch(0.48_0.14_185)]" },
  { id: "green", label: "Green", swatch: "bg-[oklch(0.52_0.16_150)]" },
  { id: "violet", label: "Violet", swatch: "bg-[oklch(0.52_0.22_300)]" },
  { id: "indigo", label: "Indigo", swatch: "bg-[oklch(0.50_0.20_270)]" },
  { id: "cyan", label: "Cyan", swatch: "bg-[oklch(0.52_0.15_205)]" },
  { id: "sky", label: "Sky", swatch: "bg-[oklch(0.55_0.16_220)]" },
  { id: "amber", label: "Amber", swatch: "bg-[oklch(0.62_0.17_75)]" },
  { id: "orange", label: "Orange", swatch: "bg-[oklch(0.58_0.19_45)]" },
  { id: "rose", label: "Rose", swatch: "bg-[oklch(0.52_0.20_15)]" },
  { id: "pink", label: "Pink", swatch: "bg-[oklch(0.55_0.20_350)]" },
  { id: "neutral", label: "Neutral", swatch: "bg-[oklch(0.45_0_0)]" },
];

const MODE_OPTIONS = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
];

export default function ThemePicker() {
  const { theme, color, setTheme, setColor } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen} showSwipeHandle>
      <DrawerTrigger
        render={
          <Button variant="outline" size="icon" className="relative" aria-label="Open theme settings">
            <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          </Button>
        }
      />

      <DrawerContent className="max-h-[85dvh]">
        <DrawerHeader>
          <DrawerTitle>Theme settings</DrawerTitle>
          <DrawerDescription>
            Choose appearance mode and color palette for the app.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-6 overflow-y-auto px-4 pb-6">
          {/* Appearance */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Appearance
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {MODE_OPTIONS.map(({ id, label, icon: Icon }) => {
                const isActive = theme === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTheme(id)}
                    className={[
                      "flex flex-col items-center gap-2 rounded-xl border px-3 py-3 text-sm transition-colors",
                      isActive
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-foreground hover:bg-muted",
                    ].join(" ")}
                  >
                    <Icon className="size-5" />
                    <span className="font-medium">{label}</span>
                    {isActive && <Check className="size-4" />}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Color palette */}
          <section className="space-y-3">
            <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <Palette className="size-3.5" />
              Color palette
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {COLOR_OPTIONS.map(({ id, label, swatch }) => {
                const isActive = color === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setColor(id)}
                    className={[
                      "flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors",
                      isActive
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-foreground hover:bg-muted",
                    ].join(" ")}
                  >
                    <span className={`size-4 shrink-0 rounded-full ring-1 ring-border ${swatch}`} />
                    <span className="flex-1 truncate font-medium">{label}</span>
                    {isActive && <Check className="size-4 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
