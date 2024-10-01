export function parseDatesInObject<T>(obj: T): T {
  const parsedObject: any = { ...obj };

  Object.keys(parsedObject).forEach((key) => {
    const value = parsedObject[key];

    // Check if value is a string
    if (typeof value === 'string') {

      // Create a Date object from the string
      const date = new Date(value);

      // If the string can be parsed into a valid date, replace it with a Date object
      if (!isNaN(date.getTime())) {
        parsedObject[key] = date;

      }
    }
    // Recursively parse nested objects
    else if (typeof value === 'object' && value !== null) {
      parsedObject[key] = parseDatesInObject(value);
    }
  });

  return parsedObject;
}
