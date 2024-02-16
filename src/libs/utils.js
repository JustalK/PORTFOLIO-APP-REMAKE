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
