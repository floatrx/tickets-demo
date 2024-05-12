import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export function ToggleFilters() {
  return (
    <ToggleGroup type="single">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        Cheaper
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        Faster
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        Optimal
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
