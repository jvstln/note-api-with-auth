export const createObjectPath = (
  object: Record<string, unknown>,
  path: string,
  value: unknown
) => {
  const paths = path.split(".");

  const getNextValue = (nextPath: string | undefined) =>
    !nextPath
      ? value
      : Number.isInteger(+nextPath) && parseInt(nextPath) >= 0
      ? []
      : {};

  let currentObject = object;

  paths.forEach((key, index) => {
    if (!currentObject[key]) {
      currentObject[key] = getNextValue(paths[index + 1]);
    }

    currentObject = currentObject[key] as Record<string, unknown>;
  });
};
