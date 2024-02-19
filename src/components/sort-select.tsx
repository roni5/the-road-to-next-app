'use client';

import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select';

type Option = {
  value: string;
  label: string;
};

type SortSelectProps = {
  defaulltValue?: string;
  options: Option[];
};

const SortSelect = ({ defaulltValue, options }: SortSelectProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === defaulltValue) {
      params.delete('sort');
    } else if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }

    replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <Select
      onValueChange={handleSort}
      defaultValue={
        searchParams.get('sort')?.toString() || defaulltValue
      }
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { SortSelect };