import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { FilterMatchMode } from 'primereact/api';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface CustomTableProps {
  title?: string;
  columns: Array<{
    field: string;
    header: string;
    sortable?: boolean;
    filter?: boolean;
    body?: (rowData: any) => React.ReactNode;
  }>;
  data: any[];
  onAdd?: (data: any) => Promise<void>;
  onEdit?: (data: any) => Promise<void>;
  onDelete?: (id: any) => Promise<void>;
  onImport?: (data: any[]) => Promise<void>;
}

interface FormData {
  [key: string]: any;
}

interface DataTableValue {
  [key: string]: any;
}

const CustomTable = ({
  title = 'Tabla de Datos',
  columns,
  data,
  onAdd,
  onEdit,
  onDelete,
  onImport
}: CustomTableProps) => {
  const [selectedRow, setSelectedRow] = useState<DataTableValue | null>(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const [filters, setFilters] = useState<{ [key: string]: { value: any, matchMode: string } }>({});
  const [dialogVisible, setDialogVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const [editMode, setEditMode] = useState(false);
  const toast = useRef<Toast>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Inicializar filtros
  React.useEffect(() => {
    const initialFilters: { [key: string]: { value: any, matchMode: string } } = {};
    columns.forEach(col => {
      if (col.filter) {
        initialFilters[col.field] = { value: null, matchMode: FilterMatchMode.CONTAINS };
      }
    });
    setFilters(initialFilters);
  }, [columns]);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(title, 14, 15);
    
    const tableHeaders = columns.map(col => col.header);
    const tableData = data.map((item: DataTableValue) => 
      columns.map(col => item[col.field]?.toString() || '')
    );

    (doc as any).autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: 25
    });

    doc.save(`${title.toLowerCase().replace(/\s+/g, '_')}.pdf`);
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, `${title.toLowerCase().replace(/\s+/g, '_')}.xlsx`);
  };

  const importExcel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        if (onImport) {
          onImport(jsonData)
            .then(() => {
              toast.current?.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Datos importados correctamente',
                life: 3000
              });
            })
            .catch(error => {
              toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al importar los datos',
                life: 3000
              });
            });
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleAdd = () => {
    setEditMode(false);
    setFormData({});
    setDialogVisible(true);
  };

  const handleEdit = (rowData: any) => {
    setEditMode(true);
    setFormData(rowData);
    setDialogVisible(true);
  };

  const handleDelete = (rowData: any) => {
    confirmDialog({
      message: '¿Está seguro que desea eliminar este registro?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        if (onDelete) {
          onDelete(rowData.id)
            .then(() => {
              toast.current?.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Registro eliminado correctamente',
                life: 3000
              });
            })
            .catch(error => {
              toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar el registro',
                life: 3000
              });
            });
        }
      }
    });
  };

  const handleSubmit = () => {
    const handler = editMode ? onEdit : onAdd;
    if (handler) {
      handler(formData)
        .then(() => {
          setDialogVisible(false);
          toast.current?.show({
            severity: 'success',
            summary: 'Éxito',
            detail: `Registro ${editMode ? 'actualizado' : 'creado'} correctamente`,
            life: 3000
          });
        })
        .catch(error => {
          toast.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: `Error al ${editMode ? 'actualizar' : 'crear'} el registro`,
            life: 3000
          });
        });
    }
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          rounded
          text
          severity="success"
          onClick={() => handleEdit(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          text
          severity="danger"
          onClick={() => handleDelete(rowData)}
        />
      </div>
    );
  };

  const header = (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <Button
            label="Nuevo"
            icon="pi pi-plus"
            severity="success"
            onClick={handleAdd}
          />
          <Button
            label="PDF"
            icon="pi pi-file-pdf"
            severity="danger"
            onClick={exportPDF}
          />
          <Button
            label="Excel"
            icon="pi pi-file-excel"
            severity="success"
            onClick={exportExcel}
          />
          <Button
            label="Importar Excel"
            icon="pi pi-upload"
            severity="info"
            onClick={() => fileInputRef.current?.click()}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={importExcel}
            accept=".xlsx, .xls"
            className="hidden"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Buscar..."
          />
        </span>
      </div>
    </div>
  );

  return (
    <div className="card">
      <Toast ref={toast} />
      <ConfirmDialog />
      
      <DataTable
        value={data}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        dataKey="id"
        filterDisplay="menu"
        globalFilter={globalFilter}
        header={header}
        emptyMessage="No se encontraron registros"
        className="p-datatable-lg"
        stripedRows
        showGridlines
        responsiveLayout="scroll"
        selection={selectedRow}
        onSelectionChange={e => setSelectedRow(e.value)}
      >
        {columns.map((col) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            sortable={col.sortable}
            filter={col.filter}
            body={col.body}
          />
        ))}
        <Column body={actionBodyTemplate} exportable={false} style={{ width: '100px' }} />
      </DataTable>

      <Dialog
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        header={editMode ? 'Editar Registro' : 'Nuevo Registro'}
        modal
        className="p-fluid"
      >
        <div className="space-y-4 p-4">
          {columns.map((col) => (
            <div key={col.field} className="field">
              <label htmlFor={col.field} className="block text-sm font-medium text-gray-700 mb-1">
                {col.header}
              </label>
              <InputText
                id={col.field}
                value={formData[col.field] || ''}
                onChange={(e) => setFormData({ ...formData, [col.field]: e.target.value })}
              />
            </div>
          ))}
          <div className="flex justify-end gap-2 mt-4">
            <Button
              label="Cancelar"
              icon="pi pi-times"
              onClick={() => setDialogVisible(false)}
              className="p-button-text"
            />
            <Button
              label="Guardar"
              icon="pi pi-check"
              onClick={handleSubmit}
              severity="success"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CustomTable;