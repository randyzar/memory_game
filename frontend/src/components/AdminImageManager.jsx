import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminImageManager = () => {
    const [images, setImages] = useState([]);
    const [newImage, setNewImage] = useState({
        imageName: "",
        imageUrl: "",
        isActive: true,
    });
    const [editingImage, setEditingImage] = useState(null);
    const [loading, setLoading] = useState(true);

    // Obtener todas las imágenes
    const fetchImages = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/images");
            setImages(response.data);
        } catch (error) {
            console.error("Error al obtener imágenes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    // Agregar una nueva imagen
    const handleAddImage = async () => {
        if (!newImage.imageName || !newImage.imageUrl) return;

        try {
            await axios.post("/api/images", newImage);
            setNewImage({ imageName: "", imageUrl: "", isActive: true });
            fetchImages();
        } catch (error) {
            console.error("Error al agregar imagen:", error);
        }
    };

    // Actualizar una imagen existente
    const handleUpdateImage = async (id) => {
        if (!editingImage?.imageName || !editingImage?.imageUrl) return;

        try {
            await axios.put(`/api/images/${id}`, editingImage);
            setEditingImage(null);
            fetchImages();
        } catch (error) {
            console.error("Error al actualizar la imagen:", error);
        }
    };

    // Eliminar una imagen
    const handleDeleteImage = async (id) => {
        try {
            await axios.delete(`/api/images/${id}`);
            fetchImages();
        } catch (error) {
            console.error("Error al eliminar la imagen:", error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Gestión de Imágenes</h1>

            {/* Formulario para agregar una nueva imagen */}
            <div style={{ marginBottom: "20px" }}>
                <h3>Agregar Imagen</h3>
                <input
                    type="text"
                    placeholder="Nombre de la imagen"
                    value={newImage.imageName}
                    onChange={(e) => setNewImage({ ...newImage, imageName: e.target.value })}
                    style={{ marginRight: "10px" }}
                />
                <input
                    type="text"
                    placeholder="URL de la imagen"
                    value={newImage.imageUrl}
                    onChange={(e) => setNewImage({ ...newImage, imageUrl: e.target.value })}
                    style={{ marginRight: "10px" }}
                />
                <button onClick={handleAddImage}>Agregar</button>
            </div>

            {/* Tabla de imágenes */}
            {loading ? (
                <p>Cargando imágenes...</p>
            ) : (
                <div style={{overflowY: "auto", maxHeight: "400px", border: "1px solid #ddd"}}>
                    <table className="admin-table">
                        <thead>
                        <tr>
                            <th>Vista Previa</th>
                            <th>Nombre</th>
                            <th>URL</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {images.map((image) => (
                            <tr key={image.id}>
                                <td>
                                    <img
                                        src={image.imageUrl}
                                        alt={image.imageName}
                                        className="image-preview"
                                    />
                                </td>
                                <td>{image.imageName}</td>
                                <td>{image.imageUrl}</td>
                                <td className="button-container">
                                    <button className="button-edit" onClick={() => handleEdit(image.id)}>
                                        Editar
                                    </button>
                                    <button className="button-delete" onClick={() => handleDelete(image.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>
            )}
        </div>
    );
};

export default AdminImageManager;
