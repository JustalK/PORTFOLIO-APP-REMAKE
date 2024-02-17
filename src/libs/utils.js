export function isGoingDown(
  isLoadingMore,
  layoutMeasurement,
  contentOffset,
  contentSize,
  fc
) {
  if (
    isLoadingMore &&
    layoutMeasurement.height + contentOffset.y >= contentSize.height - 1000
  ) {
    fc(false);
    return true;
  }

  return false;
}

export function formatDate(str) {
  const date = new Date(str);
  return `${date.getFullYear()}/${
    date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }`;
}
