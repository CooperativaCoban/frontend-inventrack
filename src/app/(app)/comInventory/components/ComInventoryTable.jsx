"use client";
import React from 'react';
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { apiSystem } from "@/api";
import { useRef, useState } from "react";

export default function ComInventoryTable({ comInventorys, onRefetch }) {
  let emptyComInventory = {
    pk_cominventory: null,
    item: "",
    model: "",
    series: "",
    stock: "",
    note:"",
    d_date:"",
    supplier:"",
    accounting_code:"",
    unitprice:"",
    totalprice:"",


  };

  const [comDialog, setComDialog] = useState(false);
  const [deleteComDialog, setDeleteComDialog] = useState(false);
  const [item, setItem] = useState(emptyComInventory);
  const [selectedItems, setSelectedItem] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const createComInventory = async (data) => {
    await apiSystem
      .post(`/comInventory`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateCom = async (id, data) => {
    await apiSystem
      .put(`/comInventory/${id}`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deteleCom = async (id) => {
    await apiSystem
      .delete(`/comInventory/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openNew = () => {
    setItem(emptyComInventory);
    setSubmitted(false);
    setComDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setComDialog(false);
  };

  const hideDeleteComDialog = () => {
    setDeleteComDialog(false);
  };


  const saveCom = async () => {
    setSubmitted(true);

    if (item.item.trim()) {
      console.log("que paso", item);
      if (item.pk_cominventory) {
        try {
          await updateCom(item.pk_cominventory, item);
          toast.current.show({
            severity: "success",
            summary: "Producto actualizado",
            detail: "El producto se a actualizado correctamente",
            life: 3000,
          });
        } catch (error) {
          console.log(error);
          toast.current.show({
            severity: "error",
            summary: "Error! ",
            detail: "Hubo un error al actualizar el producto",
            life: 3000,
          });
        }
      } else {
        try {
          await createComInventory(item);
          toast.current.show({
            severity: "success",
            summary: "Exito!",
            detail: "El producto fue creado correctamente",
            life: 3000,
          });
        } catch (error) {
          console.log(error);
          toast.current.show({
            severity: "error",
            summary: "Error! ",
            detail: "Hubo un error al crear el producto",
            life: 3000,
          });
        }
      }

      setComDialog(false);
      setItem(emptyComInventory);
    }
    onRefetch(true);
  };


  const editCom = (item) => {
    setItem({ ...item });
    setComDialog(true);
  };

  const confirmDeleteCom = (item) => {
    setItem(item);
    setDeleteComDialog(true);
  };

  const deleteComs = async () => {
    try {
      await deteleCom(item.pk_cominventory);
      setDeleteComDialog(false);
      setItem(emptyComInventory);
      toast.current.show({
        severity: "success",
        summary: "Éxito!",
        detail: "Producto eliminado correctamente",
        life: 3000,
      });
    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: "error",
        summary: "Error! ",
        detail: "Hubo un error al eliminar el producto",
        life: 3000,
      });
    }
    onRefetch(true);
  };


  const onInputChange = (e, nombre) => {
    const val = (e.target && e.target.value) || "";
    let _com = { ...item };

    _com[`${nombre}`] = val;

    setItem(_com);
  };

  const leftToolbarTemplate = () => {
    return (
      <Button
        label="Crear Producto"
        icon="pi pi-plus"
        severity="success"
        onClick={openNew}
      />
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
          onClick={() => editCom(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteCom(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between ">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar"
        />
      </span>
    </div>
  );
  const comDialogFooter = (
    <React.Fragment>
      <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Guardar" icon="pi pi-check" onClick={saveCom} />
    </React.Fragment>
  );
  const deleteComDialogFooter = (
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
        onClick={deleteComs}
      />
    </React.Fragment>
  );

    // comInventorys es la variable que traera los objetos de la tabla dentro de un array que se creo en los controladores del backend
  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar
          className="mb-4"
          end={leftToolbarTemplate}
          start={header}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={comInventorys}
          selection={selectedItems}
          onSelectionChange={(e) => setSelectedItem(e.value)}
          dataKey="id"
          paginator
          rows={4}
          tableClassName="border"
          rowsPerPageOptions={[4, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando registros del {first} al {last}, Total {totalRecords} registros"
          globalFilter={globalFilter}
        >
          <Column
            field="item"
            header="Producto"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column field="model" header="Categoria"></Column>
          <Column field="series" header="Proveedor"></Column>
          <Column field="stock" header="Fecha de Registro"></Column>
          <Column field="note" header="Stock"></Column>
          <Column field="d_date" header="Precio Unitario"></Column>
          <Column field="supplier" header="Precio total"></Column>
          <Column field="accounting_code" header="Código Contable"></Column>
          <Column field="unitprice" header="Precio Unitario"></Column>
          <Column field="totalprice" header="Precio Total"></Column>
          
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={comDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Crear Producto"
        modal
        className="p-fluid"
        footer={comDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="item" className="font-bold">
            Nombre del Producto
          </label>
          <InputText
            id="item"
            value={item.item}
            onChange={(e) => onInputChange(e, "item")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !item.item })}
          />
          {submitted && !item.item && (
            <small className="p-error">El nombre es requerido.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="model" className="font-bold">
            Modelo
          </label>
          <InputText
            id="model"
            value={item.model}
            onChange={(e) => onInputChange(e, "model")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !item.model })}
          />
          {submitted && !item.model && (
            <small className="p-error">El modelo es requerido.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="series" className="font-bold">
            Serie
          </label>
          <InputText
            id="series"
            value={item.series}
            onChange={(e) => onInputChange(e, "series")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !item.series})}
          />
          {submitted && !item.series && (
            <small className="p-error">La serie es requerida.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="stock" className="font-bold">
            Stock
          </label>
          <InputText
            id="stock"
            value={item.stock}
            onChange={(e) => onInputChange(e, "stock")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !item.stock})}
          />
          {submitted && !item.stock && (
            <small className="p-error">El stock es requerido.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="note" className="font-bold">
            Nota
          </label>
          <InputText
            id="note"
            value={item.note}
            onChange={(e) => onInputChange(e, "note")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !item.note})}
          />
          {submitted && !item.note && (
            <small className="p-error">Escriba una nota.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="d_date" className="font-bold">
            Fecha de ingreso
          </label>
          <InputText
            id="d_date"
            value={item.d_date}
            onChange={(e) => onInputChange(e, "d_date")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !item.d_date})}
          />
          {submitted && !item.d_date && (
            <small className="p-error">La fecha es requerida.</small>
          )}
        </div>

        
        <div className="field">
          <label htmlFor="supplier" className="font-bold">
            Proveedor
          </label>
          <InputText
            id="supplier"
            value={item.supplier}
            onChange={(e) => onInputChange(e, "supplier")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !item.supplier})}
          />
          {submitted && !item.supplier && (
            <small className="p-error">El proveedor es requerido.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="accounting_code" className="font-bold">
            Proveedor
          </label>
          <InputText
            id="accounting_code"
            value={item.accounting_code}
            onChange={(e) => onInputChange(e, "accounting_code")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !item.accounting_code})}
          />
          {submitted && !item.accounting_code && (
            <small className="p-error">El proveedor es requerido.</small>
          )}
        </div>

      </Dialog>

      <Dialog
        visible={deleteComDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteComDialogFooter}
        onHide={hideDeleteComDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {item && (
            <span>
              Esta seguro de querer eliminar el producto <b>{item.item}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export { ComInventoryTable };

