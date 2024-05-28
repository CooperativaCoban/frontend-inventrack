"use client";
import React from 'react';
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { apiSystem } from "@/api";
import { useRef, useState } from "react";

export default function RoleTable({ roles, onRefetch }) {
  let emptyRole = {
    pk_role: null,
    role: "",
    comment: "",
  };

  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
/*   const [deleteProductsDialog, setDeleteProductsDialog] = useState(false); */
  const [role, setRole] = useState(emptyRole);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const createRol = async (data) => {
    await apiSystem
      .post(`/role`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        
      });
  };

  const updateRol = async (id, data) => {
    await apiSystem
      .put(`/role/${id}`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deteleRol = async (id) => {
    await apiSystem
      .delete(`/role/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openNew = () => {
    setRole(emptyRole);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const saveProduct = async () => {
    setSubmitted(true);

    if (role.role.trim()) {
      console.log("que paso", role);
      if (role.pk_role) {
        try {
          await updateRol(role.pk_role, role);
          toast.current.show({
            severity: "success",
            summary: "Rol actualizado",
            detail: "El rol se actualizo correctamente",
            life: 3000,
          });
        } catch (error) {
          console.log(error);
          toast.current.show({
            severity: "error",
            summary: "Error! ",
            detail: "Hubo un error al actualizar el rol",
            life: 3000,
          });
        }
      } else {
        try {
          await createRol(role);
          toast.current.show({
            severity: "success",
            summary: "Exito!",
            detail: "El rol se creo correctamente",
            life: 3000,
          });
        } catch (error) {
          console.log(error);
          toast.current.show({
            severity: "error",
            summary: "Error! ",
            detail: "Hubo un error al crear el rol",
            life: 3000,
          });
        }
      }

      setProductDialog(false);
      setRole(emptyRole);
    }

    onRefetch(true);
  };
  

  const editProduct = (role) => {
    setRole({ ...role });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (role) => {
    setRole(role);
    setDeleteProductDialog(true);
  };

  const deleteProduct = async () => {
    try {
      await deteleRol(role.pk_role);
      setDeleteProductDialog(false);
      setRole(emptyRole);
      toast.current.show({
        severity: "success",
        summary: "Éxito!",
        detail: "Rol eliminado correctamente",
        life: 3000,
      });
    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: "error",
        summary: "Error! ",
        detail: "Hubo un error al eliminar el rol",
        life: 3000,
      });
    }
    onRefetch(true);
  };


  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...role };

    _product[`${name}`] = val;

    setRole(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <Button
        label="Crear Rol"
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
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
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
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Guardar" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Sí"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteProduct}
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
          value={roles}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
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
            field="role"
            header="Rol"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column field="comment" header="Comentario"></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Crear Rol"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="role" className="font-bold">
            Rol
          </label>
          <InputText
            id="role"
            value={role.role}
            onChange={(e) => onInputChange(e, "role")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !role.role })}
          />
          {submitted && !role.role && (
            <small className="p-error">El rol es requerido.</small>
          )}
        </div>

        <div className="formgrid grid">
          <div className="field">
            <label htmlFor="comment" className="font-bold">
              Comentario
            </label>
            <InputTextarea
              id="comment"
              value={role.comment}
              onChange={(e) => onInputChange(e, "comment")}
              required
              rows={3}
              cols={20}
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {role && (
            <span>
              Esta seguro de querer eliminar el rol <b>{role.role}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export { RoleTable };
