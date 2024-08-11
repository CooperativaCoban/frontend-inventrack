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
import { InputDate } from '@/components';


export default function CountInventoryTable({ countInventorys, onRefetch }) {
  let emptyCountInventory = {
    pk_countinventory: null,
    product: "",
    category: "",
    supplier: "",
    d_date: "",
    amount: "",
    unitprice: "",
    totalprice: ""
  };


  const [countDialog, setCountDialog] = useState(false);
  const [deleteCountDialog, setDeleteCountDialog] = useState(false);
  const [product, setProduct] = useState(emptyCountInventory);
  const [selectedProducts, setSelectedProduct] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);


  const createCountInventory = async (data) => {
    await apiSystem
      .post(`/countInventory`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateCount = async (id, data) => {
    await apiSystem
    .put(`/countInventory/${id}`, {
      ...data,
      totalprice: (parseFloat(data.amount) * parseFloat(data.unitprice)).toFixed(2)
      })
       .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deteleCount = async (id) => {
    await apiSystem
      .delete(`/countInventory/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  const rowClass = (data) => {
    return {
        'row-red': data.amount <= 5
    }
};


  const openNew = () => {
    setProduct(emptyCountInventory);
    setSubmitted(false);
    setCountDialog(true);
  };


  const hideDialog = () => {
    setSubmitted(false);
    setCountDialog(false);
  };



  const hideDeleteCountDialog = () => {
    setDeleteCountDialog(false);
  };

  const saveCount = async () => {
    setSubmitted(true);
  
    if (product.product.trim()) {
      console.log("que paso", product);
      if (product.pk_countinventory) {
        try {
          await updateCount(product.pk_countinventory, product);
          toast.current.show({
            severity: "success",
            summary: "Producto actualizado",
            detail: "El producto se actualizo correctamente",
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
          await createCountInventory(product);
          toast.current.show({
            severity: "success",
            summary: "Exito!",
            detail: "El producto se creo correctamente",
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
  
        setCountDialog(false);
        setProduct(emptyCountInventory);
        onRefetch();
      }
  
      setCountDialog(false);
      setProduct(emptyCountInventory);
    }
    onRefetch(true);
  };
  const editCount = (product) => {
    setProduct({ ...product });
    setCountDialog(true);
  };

  const confirmDeleteCount = (product) => {
    setProduct(product);
    setDeleteCountDialog(true);
  };

  const deleteCounts = async () => {
    try {
      await deteleCount(product.pk_countinventory);
      setDeleteCountDialog(false);
      setProduct(emptyCountInventory);
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
        detail: "Hubo un error al eliminar al producto",
        life: 3000,
      });
    }
    onRefetch(true);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };

    _product[`${name}`] = val;

    // Calcula el precio total si el campo modificado es 'amount' o 'unitprice'
    if (name === 'amount' || name === 'unitprice') {
      const amount = parseFloat(_product.amount) || 0;
      const unitprice = parseFloat(_product.unitprice) || 0;
      _product.totalprice = (amount * unitprice).toFixed(2);
    }

    setProduct(_product);
  };


  const leftToolbarTemplate = () => {
    return (
      <>
        <Button
          label="Crear Producto"
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
          onClick={() => editCount(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteCount(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between ">
      <span className="p-input-icon-left p-2">
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar"
        />
      </span>
    </div>
  );
  const countDialogFooter = (
    <React.Fragment>
      <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Guardar" icon="pi pi-check" onClick={saveCount} />
    </React.Fragment>
  );

  const deleteCountDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteCountDialog}
      />
      <Button
        label="Sí"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteCounts}
      />
    </React.Fragment>
  );

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
          value={countInventorys}
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
          rowClassName={rowClass}
        >
          <Column
            field="product"
            header="Producto"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column field="category" header="Categoria"></Column>
          <Column field="supplier" header="Proveedor"></Column>
          <Column field="d_date" header="Fecha de Registro"></Column>
          <Column field="amount" header="Stock"></Column>
          <Column field="unitprice" header="Precio Unitario"></Column>
          <Column field="totalprice" header="Precio total"></Column>

          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={countDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Crear Producto"
        modal
        className="p-fluid"
        footer={countDialogFooter}
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
          <label htmlFor="category" className="font-bold">
            Categoria
          </label>
          <InputText
            id="category"
            value={product.category}
            onChange={(e) => onInputChange(e, "category")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.category })}
          />
          {submitted && !product.category && (
            <small className="p-error">La categoria es requerido.</small>
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
            className={classNames({ "p-invalid": submitted && !product.supplier })}
          />
          {submitted && !product.supplier && (
            <small className="p-error">El proveedor es requerido.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="d_date" className="font-bold">
            Fecha de Registro
          </label>
          <InputDate
            id="d_date"
            value={product.d_date}
            onChange={(e) => onInputChange(e, "d_date")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.d_date })}
          />
          {submitted && !product.d_date && (
            <small className="p-error">La fecha de Registro es requerida.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="amount" className="font-bold">
            Stock
          </label>
          <InputText
            id="amount"
            value={product.amount}
            onChange={(e) => onInputChange(e, "amount")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.amount })}
          />
          {submitted && !product.amount && (
            <small className="p-error">El stock es requerido.</small>
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
            className={classNames({ "p-invalid": submitted && !product.unitprice })}
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
            /* onChange={(e) => onInputChange(e, "totalprice")}
            required
            autoFocus */
            readOnly
            className={classNames({ "p-invalid": submitted && !product.totalprice })}
          />
          {submitted && !product.totalprice && (
            <small className="p-error">El precio total es requerido.</small>
          )}
        </div>

      </Dialog>

      <Dialog
        visible={deleteCountDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteCountDialogFooter}
        onHide={hideDeleteCountDialog}
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

export { CountInventoryTable };
