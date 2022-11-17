export type SortableItem = {
  id: string;
  group: string;
  oldGroup: String;
  priority: number;
  oldPriority: number;
};
type Group = string;
type Destination = { group: Group; itemId?: string };

export function reorderByPriority(args: {
  allItems: Array<SortableItem>;
  source: {
    items: Array<SortableItem>;
  };
  destination: Destination;
}): SortableItem[] {
  const groupSet = new Set(args.source.items.map(it => it.group));
  const groups = Array.from(groupSet);
  const closedItems = groups.reduce(
    (pre, cur) =>
      closePriority({
        allItems: pre,
        sourceItems: args.source.items,
        group: cur,
      }),
    args.allItems
  );
  const shiftedItems = shiftPriority({
    allItems: closedItems,
    sourceItems: args.source.items,
    destination: args.destination,
  });

  const insertedItems = insertPriority({
    allItems: shiftedItems,
    sourceItems: args.source.items,
    destination: args.destination,
  });

  const normalizedItems = normalizeAllPriority(insertedItems);
  // console.log({ closedItems, shiftedItems, insertedItems, normalizedItems });

  return normalizedItems;
}

function normalizeAllPriority(
  allItems: Array<SortableItem>
): Array<SortableItem> {
  const groupSet = new Set(allItems.map(it => it.group));
  const groups = Array.from(groupSet);
  return groups.reduce<SortableItem[]>((items, group) => {
    const groupedItems = allItems.filter(it => it.group === group);
    const sortedItems = groupedItems.sort((a, b) =>
      a.priority > b.priority ? 1 : -1
    );
    const updatedItems: SortableItem[] = sortedItems.map((it, i) => ({
      ...it,
      priority: i,
    }));
    return [...items, ...updatedItems];
  }, []);
}

function priorityFromGroupedItems(
  allItems: Array<SortableItem>,
  destination: {
    group: Group;
    itemId?: string;
  }
): number {
  // 一番下へ挿入する場合itemIdがundefined。その場合priority0より下にするために-1を設定
  if (destination.itemId == null) return -1;

  return allItems.find(it => it.id === destination.itemId)?.priority ?? -1;
}

function insertPriority(args: {
  allItems: Array<SortableItem>;
  sourceItems: Array<SortableItem>;
  destination: Destination;
}): SortableItem[] {
  const destinationPriority = priorityFromGroupedItems(
    args.allItems,
    args.destination
  );
  return args.allItems.map(it => {
    const sourceIndex = args.sourceItems.findIndex(
      source => source.id === it.id
    );
    if (sourceIndex !== -1) {
      return {
        ...it,
        group: args.destination.group,
        priority: destinationPriority + sourceIndex + 1,
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
    it => it.group === args.group
  );
  const maximumPriority = Math.max(
    ...groupedSourceItems.map(it => it.priority)
  );
  return args.allItems.map(it => {
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
  destination: Destination;
}): SortableItem[] {
  if (args.allItems.length === 0) return [];
  const destinationPriority = priorityFromGroupedItems(
    args.allItems,
    args.destination
  );

  return args.allItems.map(it => {
    if (
      it.priority > destinationPriority &&
      it.group === args.destination.group &&
      args.sourceItems.every(source => source.id !== it.id)
    ) {
      return {
        ...it,
        priority: it.priority + args.sourceItems.length,
      };
    }
    return it;
  });
}
