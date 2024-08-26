import { useState } from "react";
import { Button } from 'primereact/button';
import { DataTable, DataTableValue } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';
import { InputSwitch } from "primereact/inputswitch";
import { PaginatorTemplate } from 'primereact/paginator';
import { PrimeIcons } from "primereact/api";

interface TableProps<T extends DataTableValue> {
  data: T[];
  columns: { field: keyof T, header: string }[];
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
  paginatorTemplate
}: TableProps<T>) {
  const [items, setItems] = useState(data);
  const [selectedItems, setSelectedItems] = useState<(T[keyof T])[]>([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(rowsPerPage);
 
  const toggleItemStatus = (itemId: T[keyof T]) => {
    setItems(items.map(item =>
      item[idField] === itemId ? { ...item, [activeField!]: !item[activeField!] } : item
    ));
  };


  const toggleItemSelection = (itemId: T[keyof T]) => {
    setSelectedItems(prevSelected =>
      prevSelected.includes(itemId)
        ? prevSelected.filter(id => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const toggleAllItems = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map(item => item[idField]));
    }
  };

  const onPageChange = (event: { first: number, rows: number }) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div>
        
      <DataTable
        value={items}
        paginator
        rows={rows}
        first={first}
        onPage={onPageChange}
        rowsPerPageOptions={rowsPerPageOptions}
        paginatorTemplate={paginatorTemplate}
      >
        <Column
          header={<Checkbox checked={selectedItems.length === items.length} onChange={toggleAllItems} />}
          body={(rowData: T) => (
            <Checkbox
              checked={selectedItems.includes(rowData[idField])}
              onChange={() => toggleItemSelection(rowData[idField])}
            />
          )}
        />
        {columns.map(col => (
          <Column key={String(col.field)} field={String(col.field)} header={col.header} />
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
            <div style={{ display: 'flex', gap: '0.5rem' }}>
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