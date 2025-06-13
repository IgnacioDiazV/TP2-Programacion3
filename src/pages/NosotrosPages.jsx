import React, { useState } from "react";
import Nosotros from "../components/Nosotros.jsx";

const NosotrosPages = ({ integrantesData, logueado }) => {
  const [integrantes, setIntegrantes] = useState(integrantesData);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formVisible, setFormVisible] = useState(false); // Nuevo estado
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [legajo, setLegajo] = useState("");
  const [github, setGithub] = useState("");
  const [foto, setFoto] = useState("");

  // Mostrar el formulario con animación de entrada
  const handleAbrirFormulario = () => {
    setFormVisible(true);
    setTimeout(() => setMostrarFormulario(true), 10); // Pequeño delay para activar la animación
  };

  // Ocultar el formulario con animación de salida
  const handleCerrarFormulario = () => {
    setMostrarFormulario(false);
    setTimeout(() => setFormVisible(false), 600); // 600ms igual al tiempo de la animación CSS
  };

  const handleAddIntegrante = (nuevoIntegrante) => {
    setIntegrantes((prev) => [...prev, nuevoIntegrante]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!nombre || !apellido || !legajo || !github || !foto) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    const nuevoIntegrante = {
      nombre,
      apellido,
      legajo,
      github:
        github.startsWith("https://") || github.startsWith("http://")
          ? github
          : `https://github.com/${github}`,
      foto,
    };
    handleAddIntegrante(nuevoIntegrante);
    setNombre("");
    setApellido("");
    setLegajo("");
    setGithub("");
    setFoto("");
    handleCerrarFormulario();
  };

  const handleEliminarIntegrante = (legajo) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este integrante?")) {
      setIntegrantes((prev) => prev.filter((i) => i.legajo !== legajo));
    }
  };

  return (
    <main>
      <h2>Nuestro Equipo</h2>
      <Nosotros
        listaIntegrantes={integrantes}
        onEliminarIntegrante={logueado ? handleEliminarIntegrante : undefined}
      />

      {logueado && !formVisible && (
        <button
          className="add-integrante-btn"
          onClick={handleAbrirFormulario}
        >
          Agregar Integrante
        </button>
      )}

      {logueado && formVisible && (
        <div className={`form-container-anim${mostrarFormulario ? " visible" : ""}`}>
          <form onSubmit={handleSubmit}>
            <h3>Agregar Nuevo Integrante</h3>
            <div>
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                placeholder="Juan"
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="apellido">Apellido:</label>
              <input
                type="text"
                id="apellido"
                value={apellido}
                placeholder="Perez"
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="legajo">Legajo:</label>
              <input
                type="text"
                id="legajo"
                value={legajo}
                placeholder="123456"
                onChange={(e) => setLegajo(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="github">GitHub (URL o usuario):</label>
              <input
                type="text"
                id="github"
                value={github}
                placeholder="usuario / https://github.com/usuario"
                onChange={(e) => setGithub(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="foto">URL de la Foto:</label>
              <input
                type="url"
                id="foto"
                value={foto}
                placeholder="https://..."
                onChange={(e) => setFoto(e.target.value)}
                required
              />
            </div>
            <div className="form-buttons">
              <button
                type="submit"
                className="btn-agregar"
                style={{ width: "100%" }}
              >
                Agregar Integrante
              </button>
              <button
                type="button"
                className="btn-cancelar"
                style={{ width: "100%" }}
                onClick={handleCerrarFormulario}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
};

export default NosotrosPages;
