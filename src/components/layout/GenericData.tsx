import React, { useEffect, useState } from "react";
import {
  fetchRows,
  createRow,
  updateRow,
  deleteRow,
  RowData,
} from "@/lib/supabaseCrud"; // Use the imported RowData
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";

interface GenericTableProps {
  tableName: string;
}

const GenericTable: React.FC<GenericTableProps> = ({ tableName }) => {
  const [data, setData] = useState<RowData[]>([]);
  const [newRow, setNewRow] = useState<RowData>({ id: 0 });
  const [editRow, setEditRow] = useState<RowData | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Message to display in the Snackbar

  useEffect(() => {
    const loadData = async () => {
      const rows = await fetchRows(tableName);
      setData(rows);
    };
    loadData();
  }, [tableName]);

  // Fetch data function
  const loadData = async () => {
    const rows = await fetchRows(tableName);
    setData(rows);
  };

  // Load data when the component mounts
  useEffect(() => {
    loadData();
  }, [tableName]);

  const handleCreate = async () => {
    if (!newRow) return;

    const lastRow = data.length > 0 ? data[data.length - 1] : null;
    const nextId = lastRow ? lastRow.id + 1 : 1;

    const addedRow = await createRow(tableName, { ...newRow, id: nextId });

    if (addedRow) {
      await loadData();

      setNewRow({ id: 0 });
      setOpenDialog(false);

      setSnackbarMessage("Row successfully added!");
      setSnackbarOpen(true);
    } else {
      setOpenDialog(false);
      await loadData();
      setSnackbarMessage("Row successfully added!");
      setSnackbarOpen(true);
    }
  };

  const handleEdit = async () => {
    if (!editRow || !editRow.id) return;
    const updatedRow = await updateRow(tableName, editRow.id, editRow);

    if (updatedRow) {
      setData(data.map((row) => (row.id === updatedRow.id ? updatedRow : row)));
      setEditRow(null);

      // Show success message
      setSnackbarMessage("Row successfully updated!");
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async (id: number) => {
    const deletedRow = await deleteRow(tableName, id);

    if (deletedRow) {
      // Re-fetch the data after deletion to ensure the state is updated
      await loadData(); // Re-fetch to refresh the table

      // Show success message
      setSnackbarMessage("Row successfully deleted!");
      setSnackbarOpen(true);
    } else {
      await loadData(); // Re-fetch to refresh the table
      setSnackbarMessage("Row successfully deleted!");
      setSnackbarOpen(true);
    }
  };

  const handleNewRowChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    setNewRow({
      ...newRow,
      [key]: e.target.value,
    });
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    if (editRow) {
      setEditRow({
        ...editRow,
        [key]: e.target.value,
      });
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewRow({ id: 0 });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        bgcolor={"custom.secondaryComponents"}
        alignItems={"center"}
        padding={2}
        borderRadius={2}
        marginBottom={3}
      >
        <Typography variant="h5">{tableName} Table</Typography>

        <Button onClick={handleOpenDialog} variant="contained" color="primary">
          <Typography variant="h6">Create</Typography>
        </Button>
      </Stack>

      {/* Dialog for creating a new row */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Row</DialogTitle>
        <DialogContent>
          {data[0] && (
            <Grid container spacing={3} marginTop={0.5}>
              {Object.keys(data[0]).map((key) =>
                key !== "id" ? (
                  <Grid item xs={12} sm={12} key={key}>
                    <TextField
                      fullWidth
                      label={`Enter ${key}`}
                      value={newRow[key] || ""}
                      onChange={(e) => handleNewRowChange(e, key)}
                    />
                  </Grid>
                ) : null
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Add Row
          </Button>
        </DialogActions>
      </Dialog>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {data[0] &&
                Object.keys(data[0]).map((key) => (
                  <TableCell key={key}>{key}</TableCell>
                ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {Object.keys(row).map((key) => (
                  <TableCell key={key}>
                    <Typography variant="h6">
                      {editRow?.id === row.id ? (
                        <TextField
                          value={editRow[key] || ""}
                          onChange={(e) => handleEditChange(e, key)}
                        />
                      ) : (
                        String(row[key])
                      )}
                    </Typography>
                  </TableCell>
                ))}
                <TableCell>
                  {editRow?.id === row.id ? (
                    <Stack direction={"row"} spacing={1}>
                      <Button
                        onClick={handleEdit}
                        variant="contained"
                        color="primary"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => setEditRow(null)}
                        variant="outlined"
                        color="secondary"
                      >
                        Cancel
                      </Button>
                    </Stack>
                  ) : (
                    <Stack direction={"row"} spacing={1}>
                      <Button
                        onClick={() => setEditRow(row)}
                        variant="outlined"
                      >
                        <Typography variant="h6">Edit</Typography>
                      </Button>
                      <Button
                        onClick={() => handleDelete(row.id)}
                        variant="outlined"
                        color="error"
                      >
                        <Typography variant="h6">Delete</Typography>
                      </Button>
                    </Stack>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar for success messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default GenericTable;
