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
            // Mapear las claves del backend al frontend
            const mappedImages = response.data.map((img) => ({
                id: img.id,
                imageName: img.image_name, // Mapear image_name a imageName
                imageUrl: img.image_url,   // Mapear image_url a imageUrl
                isActive: img.is_active    // Mapear is_active a isActive
            }));
            setImages(mappedImages);
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
        try {
            const response = await axios.post("/api/images", {
                image_name: newImage.imageName, // Clave compatible con el backend
                image_url: newImage.imageUrl,   // Clave compatible con el backend
                isActive: newImage.isActive
            });
            console.log("Imagen añadida:", response.data);
            setNewImage({ imageName: "", imageUrl: "", isActive: true }); // Limpiar el formulario
            fetchImages(); // Refresca la lista de imágenes
        } catch (error) {
            console.error("Error al agregar imagen:", error.response?.data || error.message);
        }
    };


    const handleEdit = (image) => {
        setEditingImage({ ...image }); // Establece la imagen en edición
    };

    const handleSaveEdit = async () => {
        if (!editingImage?.id) return;

        try {
            await axios.put(`/api/images/${editingImage.id}`, editingImage);
            setEditingImage(null);
            fetchImages(); // Refrescar la lista
        } catch (error) {
            console.error("Error al actualizar la imagen:", error.response?.data || error.message);
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
                                        src={image.imageUrl} // Vista previa de la imagen
                                        alt={image.imageName}
                                        className="image-preview"
                                    />
                                </td>
                                <td>{image.imageName}</td>
                                <td>{image.imageUrl}</td>
                                <td>
                                    {editingImage?.id === image.id ? (
                                        <>
                                            <input
                                                type="text"
                                                value={editingImage.imageName}
                                                onChange={(e) =>
                                                    setEditingImage({...editingImage, imageName: e.target.value})
                                                }
                                            />
                                            <input
                                                type="text"
                                                value={editingImage.imageUrl}
                                                onChange={(e) =>
                                                    setEditingImage({...editingImage, imageUrl: e.target.value})
                                                }
                                            />
                                            <button onClick={handleSaveEdit} className="button-save">Guardar</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEdit(image)} className="button-edit">
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDeleteImage(image.id)}
                                                className="button-delete"
                                            >
                                                Eliminar
                                            </button>
                                        </>
                                    )}
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
