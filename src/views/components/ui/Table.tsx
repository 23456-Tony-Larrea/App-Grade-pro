import { useState } from "react";
import { Button } from "primereact/button";
import { DataTable, DataTableValue } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import { InputSwitch } from "primereact/inputswitch";
import { PaginatorTemplate } from "primereact/paginator";
import { PrimeIcons } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useRef } from "react";

interface TableProps<T extends DataTableValue> {
  data: T[];
  columns: { field: keyof T; header: string }[];
  onEdit?: (item: T) => void;
  onDelete?: (itemId: T[keyof T]) => void;
  idField: keyof T;
  activeField?: keyof T;
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  paginatorTemplate?: PaginatorTemplate;
}

export default function GenericTable<T extends DataTableValue>({
  data,
  columns,
  onEdit,
  onDelete,
  idField,
  activeField,
  rowsPerPage = 10,
  rowsPerPageOptions = [5, 10, 20],
  paginatorTemplate,
}: TableProps<T>) {
  const [items, setItems] = useState(data);
  const [selectedItems, setSelectedItems] = useState<T[keyof T][]>([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(rowsPerPage);
  const [searchTerm, setSearchTerm] = useState("");
  const toast = useRef<Toast>(null);

  const toggleItemStatus = (itemId: T[keyof T]) => {
    setItems(
      items.map((item) =>
        item[idField] === itemId
          ? { ...item, [activeField!]: !item[activeField!] }
          : item
      )
    );
    const updatedItem = items.find((item) => item[idField] === itemId);
    toast.current?.show({
      severity: "info",
      summary: "Estado cambiado",
      detail: `El estado de ${updatedItem?.name} ha sido cambiado.`,
    });
  };

  const toggleItemSelection = (itemId: T[keyof T]) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const toggleAllItems = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((item) => item[idField]));
    }
  };

  const onPageChange = (event: { first: number; rows: number }) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const filteredItems = items.filter((item) =>
    columns.some((col) =>
      String(item[col.field]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <Toast ref={toast} />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
        }}
      >
        <span className="p-input-icon-left" style={{ width: "200px" }}>
          <InputText
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar..."
            style={{ width: "80%" }}
          />
          <i className="pi pi-search" />
        </span>
      </div>
      <DataTable
        value={filteredItems}
        paginator
        rows={rows}
        first={first}
        onPage={onPageChange}
        rowsPerPageOptions={rowsPerPageOptions}
        paginatorTemplate={paginatorTemplate}
      >
        <Column
          header={
            <Checkbox
              checked={selectedItems.length === items.length}
              onChange={toggleAllItems}
            />
          }
          body={(rowData: T) => (
            <Checkbox
              checked={selectedItems.includes(rowData[idField])}
              onChange={() => toggleItemSelection(rowData[idField])}
            />
          )}
        />
        {columns.map((col) => (
          <Column
            key={String(col.field)}
            field={String(col.field)}
            header={col.header}
          />
        ))}
        {activeField && (
          <Column
            header="Estado"
            body={(rowData: T) => (
              <InputSwitch
                checked={Boolean(rowData[activeField])}
                onChange={() => toggleItemStatus(rowData[idField])}
              />
            )}
          />
        )}
        {(onEdit || onDelete) && (
          <Column
            header="Acciones"
            body={(rowData: T) => (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {onEdit && (
                  <Button
                    icon={PrimeIcons.PENCIL}
                    onClick={() => onEdit(rowData)}
                    className="p-button-rounded p-button-text"
                  />
                )}
                {onDelete && (
                  <Button
                    icon={PrimeIcons.TRASH}
                    onClick={() => onDelete(rowData[idField])}
                    className="p-button-rounded p-button-danger p-button-text"
                  />
                )}
              </div>
            )}
          />
        )}
      </DataTable>
    </div>
  );
}
