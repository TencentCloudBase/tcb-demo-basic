export function calculatePercentByValueAndBoundary({ value, min, max }) {
  let result = (value - min) / (max - min);
  if (result < 0 || isNaN(result)) {
    result = 0;
  }
  if (result > 1) {
    result = 1;
  }
  result *= 100;
  return result;
}

const DEFAULT_ACCURACY_FIX = 8;

/**
 * Split the range into multiple grids by step.
 * Calculate how many grids current percent has covered.
 * If the current percent is within a grid, check if it has covered current grid's half, if so, count the current grid.
 * Return number of covered grids * step as result.
 */
function calculateNewValueInRange({
  percentInRange,
  range,
  step,
  accuracyFix = DEFAULT_ACCURACY_FIX,
}) {
  // Calculate total grid count in range.
  const gridCount = Math.floor(range / step);
  // Turn percent into val.
  const initVal = (percentInRange / 100) * range;
  // Calculate how many grids val has fully covered.
  const initValCoveredGridCount = Math.floor(initVal / step);

  // The last grid might not be of full width, for example if `range == 10 && step == 3`, the grids' widths are `[3, 3, 3, 1]`.
  const currentGridWidth =
    initValCoveredGridCount === gridCount ? range % step : step;
  const halfCurrentGridWidth = currentGridWidth / 2;

  // Part of the val is used to fully covered grids.
  // Calculate the rest part of val to see if we need count 1 more grid.
  const rest = initVal % step;

  // If the rest val can cover half of the current grid's width, count this grid.
  // Try to avoid inaccuracy with toFixed.
  const result =
    initValCoveredGridCount * step +
    (parseFloat(rest.toFixed(accuracyFix)) <
    parseFloat(halfCurrentGridWidth.toFixed(accuracyFix))
      ? 0
      : currentGridWidth);
  return result;
}

export function calculateNextValue({
  axisLowerBound,
  axisHigherBound,
  coordinate,
  min,
  max,
  step,
}) {
  const resultPercent = calculatePercentByValueAndBoundary({
    value: coordinate,
    min: axisLowerBound,
    max: axisHigherBound,
  });
  const resultUnCut =
    calculateNewValueInRange({
      percentInRange: resultPercent,
      range: max - min,
      step,
    }) + min;

  // cut with precision
  const maxPrecision = Math.max(...[step, max, min].map(getPrecision));
  const result = Number(resultUnCut.toFixed(maxPrecision));
  return result;
}

function getPrecision(val) {
  return val.toString().split('.')[1]?.length ?? 0;
}
