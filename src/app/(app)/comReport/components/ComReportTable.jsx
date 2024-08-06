"use client";

import React, { useState, useRef } from 'react';
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tooltip } from 'primereact/tooltip';
import { apiSystem } from "@/api";
import { InputDate, InputOptionArea, InputOptionCollaborator, InputOptionInventoryCom, InputOptionInventoryCount, InputOptionPost, InputUser } from '@/components';

export default function ReportTable({ comReports, onRefetch, }) {
  let emptyComReport = {
    pk_comreport: null,
    amount_unit: "",
    d_delivery: "",
    pk_cominventory: "",
    pk_user: "",
    pk_collaborator: "",
    pk_area: "",
    pk_post: ""
  };

  const [comReportDialog, setComReportDialog] = useState(false);
  const [deleteComReportDialog, setDeleteComReportDialog] = useState(false);
  const [amount_unit, setAmount_unit] = useState(emptyComReport);
  const [selectedReportComs, setSelectedReportComs] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);


  const exportColumns = comReports.map((col) => ({ title: col.header, dataKey: col.field }));

  const exportPdf = () => {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then(() => {
        const doc = new jsPDF.default(0, 0);
  
        // Crear el encabezado a partir de los nombres de columnas
        const exportColumns = [
          { title: 'Cantidad', dataKey: 'amount_unit' },
          { title: 'Fecha de entrega', dataKey: 'd_delivery' },
          { title: 'Item', dataKey: 'comInventory' },
          { title: 'Usuario', dataKey: 'user' },
          { title: 'Colaborador', dataKey: 'collaborator' },
          { title: 'Area', dataKey: 'area' },
          { title: 'Puesto', dataKey: 'post' }
        ];
  
        // Mapear los datos del reporte
        const data = comReports.map((report) => ({
          amount_unit: report.amount_unit,
          d_delivery: report.d_delivery,
          comInventory: report.comInventory,
          user: report.user,
          collaborator: report.collaborator,
          area: report.area,
          post: report.post,
        }));
  
        // Crear la tabla en el PDF
        doc.autoTable({
          head: [exportColumns.map(col => col.title)],
          body: data.map(row => exportColumns.map(col => row[col.dataKey])),
        });
  
        // Guardar el PDF con el nombre deseado
        doc.save('reports.pdf');
      });
    });
  };
  
  const exportExcel = () => {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(comReports);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });

      saveAsExcelFile(excelBuffer, 'reports');
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import('file-saver').then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], {
          type: EXCEL_TYPE
        });

        module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      }
    });
  };

  const createComReport = async (data) => {
    await apiSystem
      .post(`/comReport`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateComReport = async (id, data) => {
    await apiSystem
      .put(`/comReport/${id}`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

 
  const deleteComReport = async (id) => {
    await apiSystem
      .delete(`/comReport/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openNew = () => {
    setAmount_unit(emptyComReport);
    setSubmitted(false);
    setComReportDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setComReportDialog(false);
  };

  const hideDeleteComDialog = () => {
    setDeleteComReportDialog(false);
  };

  const saveComReport = async () => {
    setSubmitted(true);

    if (amount_unit.amount_unit.trim()) {
        console.log("que paso", amount_unit);

        try {
            // Check if there is enough stock before creating/updating the report
            await updateInventoryCom(amount_unit.pk_cominventory, amount_unit.amount_unit);

            if (amount_unit.pk_comreport) {
                // Update the report if it exists
                await updateComReport(amount_unit.pk_comreport, amount_unit);
                toast.current.show({
                    severity: "success",
                    summary: "Hoja de entrega actualizada",
                    detail: "La Hoja de entrega se actualizó correctamente",
                    life: 3000,
                });
            } else {
                // Create the report if it doesn't exist
                await createComReport(amount_unit);
                toast.current.show({
                    severity: "success",
                    summary: "Éxito!",
                    detail: "La hoja de entrega se creó correctamente",
                    life: 3000,
                });
            }

            setComReportDialog(false);
            setAmount_unit(emptyComReport);

        } catch (error) {
            // Handle errors such as insufficient stock or other issues
            console.log(error);
            toast.current.show({
                severity: "error",
                summary: "Error!",
                detail: error.message || "Hubo un error al crear/actualizar la hoja de entrega",
                life: 3000,
            });
        }
    }

    onRefetch();
};

const updateInventoryCom = async (id, amountToSubtract) => {
    try {
        console.log(`Updating inventory with ID: ${id}`);
        console.log(`Amount to subtract: ${amountToSubtract}`);

        // Obtener todos los inventarios
        const response = await apiSystem.get(`/comInventory`);
        console.log('Inventory data:', response.data);

        // Buscar el inventario específico por ID
        const inventory = response.data.comInventorys.find(inv => inv.pk_cominventory === id);

        if (!inventory || typeof inventory.stock === 'undefined') {
            throw new Error(`Inventory with ID ${id} not found or has invalid data`);
        }

        const currentAmount = parseInt(inventory.stock, 10);
        const subtractAmount = parseInt(amountToSubtract, 10);
        const unitPrice = parseFloat(inventory.unitprice);

        if (isNaN(currentAmount) || isNaN(subtractAmount) || isNaN(unitPrice)) {
            throw new Error('Invalid stock values');
        }

        // Check if there's enough stock to create the report
        if (subtractAmount > currentAmount) {
            console.error("Error: Al crear la hoja de entrega.");
            throw new Error("Stock Insuficiente.");
        }

        const newAmount = Math.max(currentAmount - subtractAmount, 0); // Evita cantidades negativas
        console.log(`Current stock: ${currentAmount}, New stock: ${newAmount}`);
        const newTotalPrice = (newAmount * unitPrice).toFixed(2);

        // Actualizar el inventario con la nueva cantidad
        const updateResponse = await apiSystem.put(`/comInventory/${id}`, {
            stock: newAmount,
            totalprice: newTotalPrice
        });

        console.log('Update response:', updateResponse.data);
        return updateResponse.data;
    } catch (error) {
        console.error("Error updating inventory:", error.response?.data || error.message);
        throw error;
    }
};

  
  
  const editComReport = (amount_unit) => {
    setAmount_unit({ ...amount_unit });
    setComReportDialog(true);
  };

  const confirmDeleteComReport = (amount_unit) => {
    setAmount_unit(amount_unit);
    setDeleteComReportDialog(true);
  };

  const deleteComsReport = async () => {
    try {
      await deleteComReport(amount_unit.pk_comreport);
      setDeleteComReportDialog(false);
      setAmount_unit(emptyComReport);
      toast.current.show({
        severity: "success",
        summary: "Éxito!",
        detail: "La hoja de entrega se eliminó correctamente",
        life: 3000,
      });
    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: "error",
        summary: "Error! ",
        detail: "Hubo un error al eliminar la hoja de entrega",
        life: 3000,
      });
    }
    onRefetch(true);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _amountUnit = { ...amount_unit };

    _amountUnit[`${name}`] = val;

    setAmount_unit(_amountUnit);

  };



  const leftToolbarTemplate = () => {
    return (
      <>
        <Button
          label="Hoja de Entrega"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
      </>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editComReport(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteComReport(rowData)}
        />
      </React.Fragment>
    );
  };


  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <span className="p-input-icon-left p-2">

        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar"
        />
      </span>
      <div className="export-buttons">
        <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
        <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
      </div>
    </div>
  );

  const comDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        outlined
        onClick={hideDialog}
      />
      <Button label="Guardar" icon="pi pi-check" onClick={saveComReport} />
    </React.Fragment>
  );

  const deleteComReportDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteComDialog}
      />
      <Button
        label="Sí"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteComsReport}
      />
    </React.Fragment>
  );

  return (
    <div className="card">
      <Toast ref={toast} />
      <Tooltip target=".export-buttons>button" position="bottom" />
      <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
      <DataTable
        ref={dt}
        value={comReports}
        selection={selectedReportComs}
        onSelectionChange={(e) => setSelectedReportComs(e.value)}
        dataKey="pk_comreport"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Mostrando {first} de {last} de {totalRecords} comReports"
        globalFilter={globalFilter}
        header={header}
      >
        <Column selectionMode="multiple" exportable={false}></Column>
        <Column field="amount_unit" header="Cantidad" sortable></Column>
        <Column field="d_delivery" header="Fecha de entrega" sortable></Column>
        <Column field="comInventory" header="Producto" sortable></Column>
        <Column field="user" header="Usuario" sortable></Column>
        <Column field="collaborator" header="Colaborador" sortable></Column>
        <Column field="area" header="Area" sortable></Column>
        <Column field="post" header="Puesto" sortable></Column>
        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: "8rem" }}></Column>
      </DataTable>

      <Dialog
        visible={comReportDialog}
        style={{ width: "450px" }}
        header="Hoja de entrega"
        modal
        className="p-fluid"
        footer={comDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="amount_unit" className="font-bold">
            Cantidad
          </label>
          <InputText
            id="amount_unit"
            value={amount_unit.amount_unit}
            onChange={(e) => onInputChange(e, "amount_unit")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !amount_unit.amount_unit,
            })}
          />
          {submitted && !amount_unit.amount_unit && (
            <small className="p-error">La cantidad es obligatoria.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="d_delivery" className="font-bold">
            Fecha de entrega
          </label>
          <InputDate
            id="d_delivery"
            value={amount_unit.d_delivery}
            onChange={(e) => onInputChange(e, "d_delivery")}
            required
            className={classNames({
              "p-invalid": submitted && !amount_unit.d_delivery,
            })}
          />
          {submitted && !amount_unit.d_delivery && (
            <small className="p-error">La fecha de entrega es obligatoria.</small>
          )}
        </div>
        <div className="field p-2">
          <label htmlFor="pk_cominventory" className="font-bold">
            Producto
          </label>
          <InputOptionInventoryCom
            item={amount_unit.pk_cominventory}
            onSelect={(optionId) => (amount_unit.pk_cominventory = optionId)}
            required
          />
          {submitted && !amount_unit.pk_cominventory && (
            <small className="p-error">El producto es obligatorio.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="pk_user" className="font-bold">
            Usuario
          </label>
          <InputUser
            name_user={amount_unit.pk_user}
            onSelect={(optionId) => (amount_unit.pk_user = optionId)}
            required
          />
          {submitted && !amount_unit.pk_user && (
            <small className="p-error">El usuario es obligatorio.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="pk_collaborator" className="font-bold">
            Colaborador
          </label>
          <InputOptionCollaborator
            name={amount_unit.pk_collaborator}
            onSelect={(optionId) => (amount_unit.pk_collaborator = optionId)}
            required
          />
          {submitted && !amount_unit.pk_collaborator && (
            <small className="p-error">El colaborador es obligatorio.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="pk_area" className="font-bold">
            Area
          </label>
          <InputOptionArea
            area={amount_unit.pk_area}
            onSelect={(optionId) => (amount_unit.pk_area = optionId)}
            required
          />
          {submitted && !amount_unit.pk_area && (
            <small className="p-error">El area es obligatorio.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="pk_post" className="font-bold">
            Puesto
          </label>
          <InputOptionPost
            post={amount_unit.pk_post}
            onSelect={(optionId) => (amount_unit.pk_post = optionId)}
            required
          />
          {submitted && !amount_unit.pk_post && (
            <small className="p-error">El Puesto es obligatorio.</small>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteComReportDialog}
        style={{ width: "450px" }}
        header="Confirmar"
        modal
        footer={deleteComReportDialogFooter}
        onHide={hideDeleteComDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {amount_unit && (
            <span>
              Está seguro de que desea eliminar la hoja de entrega de{" "}
              <b>{amount_unit.amount_unit}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}

