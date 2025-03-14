import React from "react";

export const MostrarDatos = ({ array, handleDelete, handleEdit }) => {
  return (
    <>  
    <h1 className="text-center mt-2 text-xl border-b-1 ">Listado de datos</h1>
  


      <section className="w-full flex flex-wrap justify-around items-center  ">
        {array.length > 0 ? (
          array.map((dato) => (
            <section
              key={dato.id}
              className="border max-w-xl  p-4 mt-4 rounded-md  shadow-md"
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold">{dato.nombreProducto}</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <h6 className="font-medium">Precio:</h6>
                  <p>{dato.precio}</p>
                </div>
                <div className="flex justify-between">
                  <h6 className="font-medium">Stock:</h6>
                  <p>{dato.stock}</p>
                </div>
                <div className="flex justify-between">
                  <h6 className="font-medium">Rubro:</h6>
                  <p>{dato.rubros}</p>
                </div>
                <div className="flex justify-between">
                  <h6 className="font-medium">Subrubro:</h6>
                  <p>{dato.subrubro}</p>
                </div>
                
              </div>
              <div className=" text-center mt-2">
                  <h6 className="font-medium">Descripción:</h6>
                  <p>{dato.descripcion}</p>
                </div>

              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={() => handleDelete(dato.id)}
                  className="border w-32 h-10 rounded-md cursor-pointer bg-red-400 hover:bg-red-600"
                >
                  Borrar
                </button>
                <button
                  onClick={() => handleEdit(dato.id)}
                  className="border w-32 h-10 rounded-md cursor-pointer bg-blue-400 hover:bg-blue-500"
                >
                  Editar
                </button>
              </div>
            </section>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info text-center ">
              No hay ningún producto registrado
            </div>
          </div>
        )}
      </section>
    
    
    </>
  );
};
