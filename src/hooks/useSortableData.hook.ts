import { useState, useMemo } from "react";

type Order = "asc" | "desc";

interface SortableOptions<T> {
  initialSortBy?: keyof T;
  initialOrder?: Order;
}

export function useSortableData<T>(
  items: T[],
  { initialSortBy = undefined, initialOrder = "asc" }: SortableOptions<T> = {}
) {
  const [sortBy, setSortBy] = useState<keyof T | null>(initialSortBy ?? null);
  const [order, setOrder] = useState<Order>(initialOrder);

  const sortedItems = useMemo(() => {
    if (!sortBy) return items;
    const copy = [...items];
    copy.sort((a, b) => {
      const va = a[sortBy];
      const vb = b[sortBy];
      if (typeof va === "string" && typeof vb === "string") {
        return order === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      }
      if (typeof va === "number" && typeof vb === "number") {
        return order === "asc" ? va - vb : vb - va;
      }
      return 0;
    });
    return copy;
  }, [items, sortBy, order]);

  function requestSort(key: keyof T) {
    if (key === sortBy) {
      setOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setOrder("asc");
    }
  }

  return {
    sortedItems,
    sortBy,
    order,
    requestSort,
  };
}
