export type SortableItem = {
  id: string;
  group: string;
  priority: number;
  oldPriority: number;
};
type Group = string;

export function reorderByPriority(args: {
  allItems: Array<SortableItem>;
  source: {
    items: Array<SortableItem>;
  };
  destination: { group: Group; priority: number };
}): SortableItem[] {
  const groupSet = new Set(args.source.items.map((it) => it.group));
  const groups = Array.from(groupSet);
  const closedStories = groups.reduce(
    (pre, cur) =>
      closePriority({
        allItems: pre,
        sourceItems: args.source.items,
        group: cur,
      }),
    args.allItems
  );
  const shiftedStories = shiftPriority({
    allItems: closedStories,
    sourceItems: args.source.items,
    destination: args.destination,
  });

  const insertedStories = insertPriority({
    allItems: shiftedStories,
    sourceItems: args.source.items,
    destinationPriority: args.destination.priority,
  });

  return insertedStories;
}

function insertPriority(args: {
  allItems: Array<SortableItem>;
  sourceItems: Array<SortableItem>;
  destinationPriority: number;
}): SortableItem[] {
  return args.allItems.map((it) => {
    const sourceIndex = args.sourceItems.findIndex(
      (source) => source.id === it.id
    );
    if (sourceIndex !== -1) {
      return {
        ...it,
        priority: args.destinationPriority + sourceIndex,
      };
    }
    return it;
  });
}

function closePriority(args: {
  allItems: Array<SortableItem>;
  sourceItems: Array<SortableItem>;
  group: Group;
}): SortableItem[] {
  const groupedSourceItems = args.sourceItems.filter(
    (it) => it.group === args.group
  );
  const maximumPriority = Math.max(
    ...groupedSourceItems.map((it) => it.priority)
  );
  return args.allItems.map((it) => {
    if (it.priority > maximumPriority && it.group === args.group) {
      return {
        ...it,
        priority: it.priority - groupedSourceItems.length,
      };
    }
    return it;
  });
}

function shiftPriority(args: {
  allItems: Array<SortableItem>;
  sourceItems: Array<SortableItem>;
  destination: { group: Group; priority: number };
}): SortableItem[] {
  if (args.allItems.length === 0) return [];

  return args.allItems.map((it) => {
    if (
      it.priority >= args.destination.priority &&
      it.group === args.destination.group &&
      args.sourceItems.every((source) => source.id !== it.id)
    ) {
      return {
        ...it,
        priority: it.priority + args.sourceItems.length,
      };
    }
    return it;
  });
}
