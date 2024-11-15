import supabase from "./supabase";

// Define a generic type for row data, ensuring `id` is always present
export type RowData = {
  id: number; // Ensure `id` is always required
  [key: string]: unknown; // Allow any other properties, but the `id` field is required
};

// Read all rows of a table
export async function fetchRows(tableName: string): Promise<RowData[]> {
  const { data, error } = await supabase.from(tableName).select("*");

  if (error) {
    console.error(error);
    return [];
  }

  // If data is null or undefined, return an empty array
  if (!data) {
    console.error(`No data found for table: ${tableName}`);
    return [];
  }

  return data as RowData[];
}

// Create a new row
export async function createRow(
  tableName: string,
  rowData: RowData // Use RowData type here
): Promise<RowData | null> {
  const { data, error } = await supabase.from(tableName).insert([rowData]);

  if (error) {
    console.error(error);
    return null;
  }

  // Handle case where data is null or undefined
  if (!data) {
    console.error(`Failed to insert data into table: ${tableName}`);
    return null;
  }

  return data[0] as RowData; // Type assertion to RowData
}

export async function updateRow(
  tableName: string,
  rowId: number,
  updatedData: RowData
): Promise<RowData | null> {
  // Step 1: Check if the row exists
  const { data: existingRowData, error: fetchError } = await supabase
    .from(tableName)
    .select("*")
    .eq("id", rowId)
    .single(); // Fetch single row by ID

  if (fetchError) {
    console.error("Error fetching row:", fetchError.message);
    return null;
  }

  if (!existingRowData) {
    console.error(`Row with ID ${rowId} does not exist`);
    return null;
  }

  // Step 2: Compare updatedData with existing data
  console.log("Existing data:", existingRowData);
  console.log("Updated data:", updatedData);

  const isChanged = Object.keys(updatedData).some(
    (key) => updatedData[key] !== existingRowData[key]
  );

  if (!isChanged) {
    console.log("No changes detected, nothing to update.");
    return null;
  }

  // Step 3: Perform the update
  const { data, error } = await supabase
    .from(tableName)
    .update(updatedData)
    .eq("id", rowId)
    .select(); // Include select() to fetch updated data after the operation

  if (error) {
    console.error("Update failed:", error.message);
    return null;
  }

  if (!data || data.length === 0) {
    console.error("No data returned after update operation");
    return null;
  }

  return data[0] as RowData; // Return updated row
}

// Delete a row
export async function deleteRow(
  tableName: string,
  rowId: number // Explicitly type rowId as a number
): Promise<RowData | null> {
  const { data, error } = await supabase
    .from(tableName)
    .delete()
    .eq("id", rowId)
    .single(); // Fetch single row by ID

  if (error) {
    console.error("Error deleting row:", error);
    return null;
  }

  if (!data) {
    console.error(
      `Failed to delete row with ID ${rowId} from table: ${tableName}`
    );
    return null;
  }

  // Return the deleted row data
  return data as RowData; // Type assertion to RowData
}
