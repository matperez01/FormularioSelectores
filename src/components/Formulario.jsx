import React, { useState } from "react";
import { rubrosData, subrubrosData } from "../helpers/rubros";
import { MostrarDatos } from "./MostrarDatos";

export const Formulario = () => {
  const [form, setForm] = useState({
    nombreProducto: "",
    precio: "",
    descripcion: "",
    stock: "",
    rubros: "",
    subrubro: "",
  });

  const [array, setArray] = useState([]);
  const [editable, setEditable] = useState(null);
  const [error, setError] = useState({});
  const [subrubros, setSubrubros] = useState(subrubrosData);
  const [rubros, setRubros] = useState(rubrosData);
  const [subrubrofil, setSubrubrofil] = useState([]);

  const onBlur = () => {
    let errores = {};

    const expNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/;
    if (!expNombre.test(form.nombreProducto.trim())) {
      errores.nombreProducto =
        "La cantidad de caracteres del nombre debe ser mayor a 2, menor a 50 y solo permite letras y espacios.";
    }

    if (form.precio < 0) {
      errores.precio = "El precio del Producto debe ser mayor a 0";
    }

    const expEntero = /^\d+$/;
    if (!expEntero.test(form.stock)) {
      errores.stock = "El número de stock debe ser un valor entero.";
    }

    if (form.rubros == "") {
      errores.rubros =
        "se debe eleguir algun rubro al que pertenece el producto";
    }
    if (form.subrubro == "") {
      errores.subrubros =
        "se debe eleguir algun subrubro al que pertenece el producto";
    }

    if (
      form.descripcion.trim().length < 5 ||
      form.descripcion.trim().length > 100
    ) {
      errores.descripcion =
        "La descripción debe tener entre 5 y 100 caracteres.";
    }

    setError(errores);

    return Object.keys(errores).length === 0;
  };

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "rubros") {
      const subrubroFiltrado = subrubros.filter(
        (sub) => sub.categoria === e.target.value
      );
      setSubrubrofil(subrubroFiltrado);
      console.log("Subrubros filtrados:", subrubroFiltrado);
    }
  };

  const handleDelete = (id) => {
    const nuevoArray = array.filter((dato) => dato.id !== id);

    setArray(nuevoArray);
  };

  const handleEdit = (id) => {
    const info = array.find((dato) => dato.id === id);

    setForm({
      nombreProducto: info.nombreProducto,
      precio: info.precio,
      descripcion: info.descripcion,
      stock: info.stock,
      rubros: info.rubros,
      subrubros: info.subrubros,
    });

    const subrubroFiltrado = subrubros.filter(
      (sub) => sub.categoria === info.rubros
    );
    setSubrubrofil(subrubroFiltrado);

    setEditable(id);
  };

  const agregarDatos = () => {
    if (editable) {
      const traerdata = array.map((data) =>
        data.id == editable ? { ...form, id: editable } : data
      );
      alert("datos actualizados");
      setForm({
        nombreProducto: "",
        precio: "",
        descripcion: "",
        stock: "",
        rubros: "",
        subrubro: "",
      });
      setArray(traerdata);
      setEditable(null);
    } else {
      const nuevoProducto = { ...form, id: Date.now() };
      setArray([...array, nuevoProducto]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!onBlur()) {
      alert("Corrige los datos ingresados");
      return;
    }

    if (
      !form.nombreProducto.trim() ||
      !form.precio.trim() ||
      !form.descripcion.trim() ||
      !form.stock.trim() ||
      !form.rubros.trim() ||
      !form.subrubro.trim()
    ) {
      alert("Todos los campos deben ser completados");
      return;
    }

    agregarDatos();
    alert("Los datos se cargaron correctamente");
    console.log(array);

    setForm({
      nombreProducto: "",
      precio: "",
      descripcion: "",
      stock: "",
      rubros: "",
      subrubro: "",
    });

    console.log(array);
  };

  return (
    <section className=" w-full h-full max-w-full overflow-x-hidden p-2 ">
        
      <form onSubmit={onSubmit} className="border p-3.5 rounded-md w-full max-w-2xl mx-auto  ">
        <h1 className="text-xl text-center border-b-1">Formulario ABM</h1>
        <h6 className="mt-1">Nombre del Producto</h6>
        <input
          type="text"
          name="nombreProducto"
          placeholder="Coca Cola"
          value={form.nombreProducto}
          onChange={onChange}
          className="border w-full rounded-sm p-1 mt-1 "
        />
        {error.nombreProducto && <p className="text-sm text-red-600">{error.nombreProducto}</p>}

        <h6>Precio</h6>
        <input
          type="number"
          placeholder="99.9"
          name="precio"
          value={form.precio}
          onChange={onChange}
          className="border w-full rounded-sm p-1 mt-1  "
        />
        {error.precio && <p className="text-sm text-red-600">{error.precio}</p>}
        <h6>Stock</h6>
        <input
          type="number"
          name="stock"
          placeholder="100"
          value={form.stock}
          onChange={onChange}
          className="border w-full rounded-sm p-1 mt-1 "
        />
        {error.stock && <p className="text-sm text-red-600">{error.stock}</p>}
        <section className="flex-col  justify-around">
        <h6>Rubro</h6>

        <select
          name="rubros"
          id="rubros"
          value={form.rubros}
          onChange={onChange}
          className="border w-full rounded-sm p-1 mt-1   "
        >
          <option value="">Seleccione un rubro</option>
          {rubros.map((rubro) => (
            <option key={rubro.id} value={rubro.nombre}>
              {rubro.nombre}
            </option>
          ))}
        </select>
        {error.rubro && <p className="text-sm text-red-600">{error.rubro}</p>}

        <h6>Subrubro</h6>

        <select
          name="subrubro"
          id="subrubro"
          value={form.subrubro}
          onChange={onChange}
          className="border w-full rounded-sm p-1 mt-1 "
        >
          {form.rubros === "" ? (
            <option value="">Se debe elegir un rubro</option>
          ) : (
            <>
              <option value="">---------</option>
              {subrubrofil.map((sub) => (
                <option key={sub.id} value={sub.nombre}>
                  {sub.nombre}
                </option>
              ))}
            </>
          )}
        </select>
        </section>

        {error.subrubro && <p className="text-sm text-red-600">{error.subrubro}</p>}
        <h6>Descripcion</h6>
        <input
          type="text"
          name="descripcion"
          placeholder="Gaseosa coca cola de 2L"
          value={form.descripcion}
          onChange={onChange}
          className="border w-full h-25 rounded-sm p-1 mt-1   "
        />
        {error.descripcion && <p className="text-sm text-red-600">{error.descripcion}</p>}
        <section className="text-center mt-2" >
          <button  type="submit" onClick={onSubmit} className="border-2 border-solid p-1 w-25 h-10 rounded-md cursor-pointer bg-blue-400 hover:bg-blue-500">
            Enviar
          </button>
        </section>
      </form>
      <MostrarDatos
        array={array}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </section>
  );
};
