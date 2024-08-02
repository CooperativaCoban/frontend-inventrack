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

export default function ThInventoryTable({ thInventorys, onRefetch }) {
  let emptyThInventory = {
    pk_thinventory: null,
    product: "",
    size: "",
    stock: "",
    gender: "",
    d_date:"",
    supplier:"",
    unitprice:"",
    totalprice:"",


  };

  const [thDialog, setthDialog] = useState(false);
  const [deleteThDialog, setDeleteThDialog] = useState(false);
  const [product, setProduct] = useState(emptyThInventory);
  const [selectedProducts, setSelectedProduct] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const createThInventory = async (data) => {
    await apiSystem
      .post(`/thInventory`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateThInventory = async (id, data) => {
    await apiSystem
      .put(`/thInventory/${id}`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deteleThInventory = async (id) => {
    await apiSystem
      .delete(`/thInventory/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openNew = () => {
    setProduct(emptyThInventory);
    setSubmitted(false);
    setthDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setthDialog(false);
  };

  const hideDeleteThDialog = () => {
    setDeleteThDialog(false);
  };


  const saveThInventory = async () => {
    setSubmitted(true);

    if (product.product.trim()) {
      console.log("que paso", product);
      if (product.pk_thinventory) {
        try {
          await updateThInventory(product.pk_thinventory, product);
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
          await createThInventory(product);
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

      setthDialog(false);
      setProduct(emptyThInventory);
    }
    onRefetch(true);
  };


  const editThInventory = (product) => {
    setProduct({ ...product });
    setthDialog(true);
  };

  const confirmDeleteTh = (product) => {
    setProduct(product);
    setDeleteThDialog(true);
  };

  const deleteThs = async () => {
    try {
      await deteleThInventory(product.pk_thinventory);
      setDeleteThDialog(false);
      setProduct(emptyThInventory);
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
    let _th = { ...product };

    _th[`${nombre}`] = val;

    setProduct(_th);
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
          onClick={() => editThInventory(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteTh(rowData)}
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
      <Button label="Guardar" icon="pi pi-check" onClick={saveThInventory} />
    </React.Fragment>
  );
  const deleteComDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteThDialog}
      />
      <Button
        label="Sí"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteThs}
      />
    </React.Fragment>
  );

    // thInventorys es la variable que traera los objetos de la tabla dentro de un array que se creo en los controladores del backend
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
          value={thInventorys}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProduct(e.value)}
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
            field="product"
            header="Producto"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column field="size" header="Categoria"></Column>
          <Column field="gender" header="Proveedor"></Column>
          <Column field="stock" header="Fecha de Registro"></Column>
          <Column field="d_date" header="Precio Unitario"></Column>
          <Column field="supplier" header="Precio total"></Column>
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
        visible={thDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Crear Producto"
        modal
        className="p-fluid"
        footer={comDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="product" className="font-bold">
            Nombre del Producto
          </label>
          <InputText
            id="product"
            value={product.product}
            onChange={(e) => onInputChange(e, "product")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.product })}
          />
          {submitted && !product.product && (
            <small className="p-error">El nombre es requerido.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="size" className="font-bold">
            Tamaño
          </label>
          <InputText
            id="size"
            value={product.size}
            onChange={(e) => onInputChange(e, "size")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.size })}
          />
          {submitted && !product.size && (
            <small className="p-error">El modelo es requerido.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="gender" className="font-bold">
            Genero
          </label>
          <InputText
            id="gender"
            value={product.gender}
            onChange={(e) => onInputChange(e, "gender")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.gender})}
          />
          {submitted && !product.gender && (
            <small className="p-error">La serie es requerida.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="stock" className="font-bold">
            Stock
          </label>
          <InputText
            id="stock"
            value={product.stock}
            onChange={(e) => onInputChange(e, "stock")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.stock})}
          />
          {submitted && !product.stock && (
            <small className="p-error">El stock es requerido.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="d_date" className="font-bold">
            Fecha de registro
          </label>
          <InputText
            id="d_date"
            value={product.d_date}
            onChange={(e) => onInputChange(e, "d_date")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.d_date})}
          />
          {submitted && !product.d_date && (
            <small className="p-error">La fecha es requerida.</small>
          )}
        </div>

        
        <div className="field">
          <label htmlFor="supplier" className="font-bold">
            Proveedor
          </label>
          <InputText
            id="supplier"
            value={product.supplier}
            onChange={(e) => onInputChange(e, "supplier")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.supplier})}
          />
          {submitted && !product.supplier && (
            <small className="p-error">El proveedor es requerido.</small>
          )}
        </div>


        <div className="field">
          <label htmlFor="unitprice" className="font-bold">
            Precio Unitario
          </label>
          <InputText
            id="unitprice"
            value={product.unitprice}
            onChange={(e) => onInputChange(e, "unitprice")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.unitprice})}
          />
          {submitted && !product.unitprice && (
            <small className="p-error">El precio unitario es requerido.</small>
          )}
        </div>

        
        <div className="field">
          <label htmlFor="totalprice" className="font-bold">
            Precio total
          </label>
          <InputText
            id="totalprice"
            value={product.totalprice}
            onChange={(e) => onInputChange(e, "totalprice")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.totalprice})}
          />
          {submitted && !product.totalprice && (
            <small className="p-error">El precio total es requerido.</small>
          )}
        </div>

      </Dialog>

      <Dialog
        visible={deleteThDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteComDialogFooter}
        onHide={hideDeleteThDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Esta seguro de querer eliminar el producto <b>{product.product}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export { ThInventoryTable };

