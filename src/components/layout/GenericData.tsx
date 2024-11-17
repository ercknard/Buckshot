import React, { useEffect, useState } from "react";
import {
  fetchRows,
  createRow,
  updateRow,
  deleteRow,
  RowData,
} from "@/lib/supabaseCrud";
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
  Box,
} from "@mui/material";
import DefaultDialog from "./DefaultDialog";

interface GenericTableProps {
  tableName: string;
}

interface ActionHistory {
  timestamp: string;
  action: string;
  details: string;
}

const GenericTable: React.FC<GenericTableProps> = ({ tableName }) => {
  const [data, setData] = useState<RowData[]>([]);
  const [newRow, setNewRow] = useState<RowData>({ id: 0 });
  const [editRow, setEditRow] = useState<RowData | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] =
    useState(false);
  const [rowToDelete, setRowToDelete] = useState<RowData | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [actionHistory, setActionHistory] = useState<ActionHistory[]>([]); // New state for action history

  useEffect(() => {
    const loadData = async () => {
      const rows = await fetchRows(tableName);
      setData(rows);
    };
    loadData();
  }, [tableName]);

  const loadData = async () => {
    const rows = await fetchRows(tableName);
    setData(rows);
  };

  useEffect(() => {
    loadData();
  }, [tableName]);

  const logAction = (action: string, details: string) => {
    const timestamp = new Date().toLocaleString();
    setActionHistory((prevHistory) => [
      { timestamp, action, details },
      ...prevHistory,
    ]);
  };

  const handleCreate = async () => {
    if (!newRow) return;

    // Get the highest existing ID from the data (assuming IDs are unique integers)
    const maxId = data.reduce((max, row) => (row.id > max ? row.id : max), 0);
    const nextId = maxId + 1; // Increment by 1

    // Create the new row with the calculated next ID
    const addedRow = await createRow(tableName, { ...newRow, id: nextId });

    if (addedRow) {
      await loadData();
      setNewRow({ id: 0 });
      setOpenDialog(false);
      setSnackbarMessage("Row successfully added!");
      setSnackbarOpen(true);
      logAction("Create", `Created a new row with ID ${nextId}`);
    } else {
      setOpenDialog(false);
      await loadData();
      setSnackbarMessage("Row successfully added!");
      setSnackbarOpen(true);
      logAction("Create", "Created a new row.");
    }
  };

  const handleEdit = async () => {
    if (!editRow || !editRow.id) return;
    const updatedRow = await updateRow(tableName, editRow.id, editRow);

    if (updatedRow) {
      setData(data.map((row) => (row.id === updatedRow.id ? updatedRow : row)));
      setEditRow(null);
      setSnackbarMessage("Row successfully updated!");
      setSnackbarOpen(true);
      logAction("Edit", `Updated row with ID ${editRow.id}`);
    }
  };

  const handleDelete = async () => {
    if (!rowToDelete) return;

    const deletedRow = await deleteRow(tableName, rowToDelete.id);

    if (deletedRow) {
      await loadData();
      setSnackbarMessage("Row successfully deleted!");
      setSnackbarOpen(true);
      logAction("Delete", `Deleted row with ID ${rowToDelete.id}`);
    } else {
      await loadData();
      setSnackbarMessage("Error deleting the row.");
      setSnackbarOpen(true);
      logAction("Delete", `Failed to delete row with ID ${rowToDelete.id}`);
    }

    setDeleteConfirmationDialogOpen(false);
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

  const handleOpenDeleteConfirmation = (row: RowData) => {
    setRowToDelete(row);
    setDeleteConfirmationDialogOpen(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmationDialogOpen(false);
    setRowToDelete(null);
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
      <DefaultDialog
        maxWidth="sm"
        open={openDialog}
        handleOnClose={handleCloseDialog}
        title="Add new row"
      >
        <DialogContent>
          <Typography variant="h5">Row for {tableName}</Typography>
          {data[0] && (
            <Grid container spacing={5} marginTop={0.5}>
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
      </DefaultDialog>

      {/* Confirmation Dialog for Deletion */}
      <DefaultDialog
        maxWidth="sm"
        open={deleteConfirmationDialogOpen}
        handleOnClose={handleCloseDeleteConfirmation}
        title="Delete Row"
      >
        <Typography variant="h5">
          Are you sure you want to delete this row?
        </Typography>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </DefaultDialog>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {data[0] &&
                Object.keys(data[0]).map((key) => (
                  <TableCell key={key}>
                    <Typography color="custom.primaryText">{key}</Typography>
                  </TableCell>
                ))}
              <TableCell>
                <Typography color="custom.primaryText">Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {Object.keys(row).map((key) => (
                  <TableCell key={key}>
                    <Typography variant="h6" color="custom.primaryTextGrayed">
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
                        onClick={() => handleOpenDeleteConfirmation(row)}
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

      {/* Action History Section */}
      <div style={{ marginTop: 20 }}>
        <Box marginBottom={1}>
          <Typography variant="h5">Action History</Typography>
        </Box>
        {actionHistory.length > 0 ? (
          <ul>
            {actionHistory.map((entry, index) => (
              <li key={index}>
                <Typography variant="h6">
                  <strong>{entry.timestamp}</strong> - {entry.action}:{" "}
                  {entry.details}
                </Typography>
              </li>
            ))}
          </ul>
        ) : (
          <Typography variant="h6">No actions performed yet.</Typography>
        )}
      </div>
    </div>
  );
};

export default GenericTable;
