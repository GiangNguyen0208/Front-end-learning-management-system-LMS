import { useState } from "react";

export const useExpandableList = (items = [], initialCount = 3, step = 3) => {
  const [visibleCount, setVisibleCount] = useState(initialCount);

  const visibleItems = items.slice(0, visibleCount);
  const canExpand = visibleCount < items.length;

  const handleExpand = () => {
    setVisibleCount((prev) => Math.min(prev + step, items.length));
  };

  return {
    visibleItems,
    canExpand,
    handleExpand,
  };
};
