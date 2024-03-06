import * as React from "react";
import {
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  createTableColumn,
  Spinner,
  Text
} from "@fluentui/react-components";
import { useIngestion } from "../../hooks/useIngestion";

const columns = [
  createTableColumn({
    columnId: "id",
    renderHeaderCell: () => {
      return "Job Id";
    },
    renderCell: (item) => {
      return (
        <TableCellLayout>
          {item.id}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn({
    columnId: "status",
    compare: (a, b) => {
      return a.status.localeCompare(b.status);
    },
    renderHeaderCell: () => {
      return "Status";
    },
    renderCell: (item) => {
      return (
        <TableCellLayout>
          {item.status}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn({
    columnId: "preprocessing",
    renderHeaderCell: () => {
      return "Preprocessing";
    },

    renderCell: (item) => {
        const inPreprocess = item.progress.stageProgress.filter((stage) => stage.name === "Preprocessing")[0];
        const processedItems = inPreprocess?.processedItems || 0;
        const totalItems = inPreprocess?.totalItems || 0;
      return `${processedItems}/${totalItems}`;
    },
  }),
  createTableColumn({
    columnId: "indexing",
    renderHeaderCell: () => {
      return "Preprocessing";
    },

    renderCell: (item) => {
        const indexing = item.progress.stageProgress.filter((stage) => stage.name === "Indexing")[0];
        const processedItems = indexing?.processedItems || 0;
        const totalItems = indexing?.totalItems || 0;
      return `${processedItems}/${totalItems}`;
    },
  }),
];

export const IngestionJobsList = () => {
    const { activeIngestions } = useIngestion();

    if (activeIngestions.isLoading) {
        return (
            <Spinner label="Loading ingestions..." />
        )
    }

    if (activeIngestions.isError) {
        return (
            <div>Error loading ingestion jobs</div>
        )
    }

  return (
    <DataGrid
      items={activeIngestions.data}
      columns={columns}
      sortable
      selectionMode="multiselect"
      getRowId={(item) => item.file.label}
      focusMode="composite"
    >
      <DataGridHeader>
        <DataGridRow
          selectionCell={{
            checkboxIndicator: { "aria-label": "Select all rows" },
          }}
        >
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody>
        {({ item, rowId }) => (
          <DataGridRow
            key={rowId}
            selectionCell={{
              checkboxIndicator: { "aria-label": "Select row" },
            }}
          >
            {({ renderCell }) => (
              <DataGridCell>{renderCell(item)}</DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>);
};