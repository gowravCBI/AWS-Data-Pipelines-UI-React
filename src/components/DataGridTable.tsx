import {
  DataGrid,
  GridColDef,
  GridColumnVisibilityModel,
  GridToolbar,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";

interface DataGridProps<T> {
  height?: number;
  loading: boolean;
  rows: T[];
  columns: GridColDef[];
  paginationModel: { page: number; pageSize: number };
  columnVisibilityModel: GridColumnVisibilityModel;
  onColumnVisibilityModelChange: (newModel: GridColumnVisibilityModel) => void;
}

const DataGridTable = <T extends object>({
  height = 350, // Default height value
  loading,
  rows,
  columns,
  paginationModel,
  columnVisibilityModel,
  onColumnVisibilityModelChange,
}: DataGridProps<T>) => {
  console.log(paginationModel);

  return (
    <Box className="container">
      <DataGrid
        sx={{ boxShadow: "4", height: height }}
        loading={loading}
        rows={rows}
        columns={columns}
        rowHeight={40}
        columnHeaderHeight={45}
        disableRowSelectionOnClick
        pagination
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 15, 20]}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
        }}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={onColumnVisibilityModelChange}
      />
    </Box>
  );
};

export default DataGridTable;
