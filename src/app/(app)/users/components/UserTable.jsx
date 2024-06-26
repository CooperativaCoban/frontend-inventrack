"use client";
import React from "react";
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
import { InputOption } from "@/components";

export default function UserTable({ users, onRefetch }) {
  let emptyUser = {
    pk_user: null,
    user: "",
    name_user: "",
    password: "",
    pk_role: "",
  };

  const [userDialog, setUserDialog] = useState(false);
  const [deleteUserDialog, setDeleteUserDialog] = useState(false);
  const [name_user, setName_User] = useState(emptyUser);
  const [selectedUser, setSelectedUser] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const createUser = async (data) => {
    await apiSystem
      .post(`/user`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUser = async (id, data) => {
    await apiSystem
      .put(`/user/${id}`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUser = async (id) => {
    await apiSystem
      .delete(`/user/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openNew = () => {
    setName_User(emptyUser);
    setSubmitted(false);
    setUserDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setUserDialog(false);
  };

  const hideDeleteUserDialog = () => {
    setDeleteUserDialog(false);
  };

  const saveUser = async () => {
    setSubmitted(true);

    if (name_user.name_user.trim()) {
      console.log("que paso", name_user);
      if (name_user.pk_user) {
        try {
          await updateUser(name_user.pk_user, name_user);
          toast.current.show({
            severity: "success",
            summary: "Usuario actualizado",
            detail: "El usuario se actualizo correctamente",
            life: 3000,
          });
        } catch (error) {
          console.log(error);
          toast.current.show({
            severity: "error",
            summary: "Error! ",
            detail: "Hubo un error al actualizar el usuario",
            life: 3000,
          });
        }
      } else {
        try {
          await createUser(name_user);
          toast.current.show({
            severity: "success",
            summary: "Exito!",
            detail: "El usuario se creo correctamente",
            life: 3000,
          });
          console.log("info", createUser)
        } catch (error) {
          console.log(error);
          toast.current.show({
            severity: "error",
            summary: "Error! ",
            detail: "Hubo un error al crear el usuario",
            life: 3000,
          });
        }
      }

      setUserDialog(false);
      setName_User(emptyUser);
    }

    onRefetch(true);
  };

  const editUser = (name_user) => {
    setName_User({ ...name_user });
    setUserDialog(true);
  };

  const confirmDeleteUser = (name_user) => {
    setName_User(name_user);
    setDeleteUserDialog(true);
  };

  const deleteUsers = async () => {
    try {
      await deleteUser(name_user.pk_user);
      setDeleteUserDialog(false);
      setName_User(emptyUser);
      toast.current.show({
        severity: "success",
        summary: "Éxito!",
        detail: "Usuario eliminado correctamente",
        life: 3000,
      });
    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: "error",
        summary: "Error! ",
        detail: "Hubo un error al eliminar el usuario",
        life: 3000,
      });
    }
    onRefetch(true);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _user = { ...name_user };

    _user[`${name}`] = val;

    setName_User(_user);
  };

  const leftToolbarTemplate = () => {
    return (
      <Button
        label="Crear Usuario"
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
          onClick={() => editUser(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteUser(rowData)}
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
  const userDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        outlined
        onClick={hideDialog}
      />
      <Button label="Guardar" icon="pi pi-check" onClick={saveUser} />
    </React.Fragment>
  );
  const deleteUserDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteUserDialog}
      />
      <Button
        label="Sí"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteUsers}
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
          value={users}
          selection={selectedUser}
          onSelectionChange={(e) => setSelectedUser(e.value)}
          dataKey="id"
          paginator
          rows={5}
          tableClassName="border"
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando registros del {first} al {last}, Total {totalRecords} registros"
          globalFilter={globalFilter}
        >
          <Column
            field="name_user"
            header="Nombre"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column field="user" header="Usuario"></Column>
          <Column field="pk_user" header="Rol"></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={userDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Crear Usuario"
        modal
        className="p-fluid"
        footer={userDialogFooter}
        onHide={hideDialog}
      >
        <div className="field p-2">
          <label htmlFor="name_user" className="font-bold">
            Nombre completo
          </label>
          <InputText
            id="name_user"
            value={name_user.name_user}
            onChange={(e) => onInputChange(e, "name_user")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !name_user.name_user,
            })}
          />
          {submitted && !name_user.name_user && (
            <small className="p-error">El nombre es requerido.</small>
          )}
        </div>

        <div className="flex ">
          <div className="field p-2">
            <label htmlFor="user" className="font-bold">
              Usuario
            </label>
            <InputText
              id="user"
              value={name_user.user}
              onChange={(e) => onInputChange(e, "user")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !name_user.user,
              })}
            />
            {submitted && !name_user.user && (
              <small className="p-error">El usuario es requerido.</small>
            )}
          </div>

          <div className="field p-2">
            <label htmlFor="password" className="font-bold">
              Contraseña
            </label>
            <InputText
              id="password"
              value={name_user.password}
              onChange={(e) => onInputChange(e, "password")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !name_user.password,
              })}
            />
            {submitted && !name_user.password && (
              <small className="p-error">La contraseña es requerida.</small>
            )}
          </div>
        </div>

        <div className="field p-2 ">
          <label htmlFor="pk_role" className="font-bold">
            Rol
          </label>
          <InputOption
            role={name_user.pk_role}
            onSelect={(optionId) => (name_user.pk_role = optionId)}
            required
          />
          {submitted && !name_user.pk_role && (
            <small className="p-error">El rol es requerido.</small>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteUserDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteUserDialogFooter}
        onHide={hideDeleteUserDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {name_user && (
            <span>
              Esta seguro de querer eliminar el usuario{" "}
              <b>{name_user.name_user}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export { UserTable };
