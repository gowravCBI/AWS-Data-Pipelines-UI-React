export function parseDatesInObject<T>(obj: T): T {
  const parsedObject: any = { ...obj };

  // ISO date format regex: matches strings like "2024-09-30T14:45:00"
  const isoDateRegex =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/;

  Object.keys(parsedObject).forEach((key) => {
    const value = parsedObject[key];

    // Check if value is a string
    if (typeof value === "string" && isoDateRegex.test(value)) {
      // Create a Date object from the string
      const date = new Date(value);

      // If the string can be parsed into a valid date, replace it with a Date object
      if (!isNaN(date.getTime())) {
        parsedObject[key] = date;
      }
    }
    // Recursively parse nested objects
    else if (typeof value === "object" && value !== null) {
      parsedObject[key] = parseDatesInObject(value);
    }
  });

  return parsedObject;
}

// Format scheduledStartTime if it exists
export function formattedDateTime(dateTime: string): string {
  const date = new Date(dateTime);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date"; // Return an error message or handle as needed
  }

  return date.toLocaleString(); // Format date as needed
}

// Format Date to DDMMYYYY
export const formatDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}${month}${year}`;
};
