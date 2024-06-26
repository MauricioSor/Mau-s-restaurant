//#region imports
import { Form, Button} from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { buscarComida, editarComida } from '../../../helpers/queries';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import SpinnerCustom from '../../../common/SpinnerCustom';
//#endregion

const EditarComida = () => {
    //#region hooks
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { _id } = useParams();
    const [spinner, setSpinner] = useState(true);
    const [comida, setComida] = useState()
    const navegar = useNavigate();
    //#endregion
    //#region funciones
    const enviar = (productoEditado) => {
        productoEditado._id=_id
        editarComida(productoEditado).then((respuesta) => {
            if (respuesta.status == 201) {
                Swal.fire('Comida Guardada', 'Actualizacion Exitosa', 'success')
                navegar('/Administrador');
            } else {
                Swal.fire('Error al Modificar', `El producto ${productoEditado.nombre} no se pudo modificar`, 'error');
            }
        })
    }
    useEffect(() => {
        buscarComida(_id).then((respuesta) => {
            if (respuesta.status==200) {
                setComida(respuesta.data)
                setSpinner(false)
            }else{
                Swal.fire("Error","No se pudo establecer conexion con  el servidor, intente nuevamente luego","error")
            }
        })
    }, [])
//#endregion
    return (
        <section className='container mainSection'>
            <h1 className='display-3'>Editar Comida</h1>
            <hr />
            {
                spinner ?
                    (<SpinnerCustom/>) :
                    <>
                        <Form onSubmit={handleSubmit(enviar)}>
                            <Form.Group className="mb-3" controlId="formNombreProdcuto">
                                <Form.Label>Comida</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={comida.nombre}
                                    {...register("nombre", {
                                        required: "El nombre de la comida es obligatorio",
                                    })}
                                />
                                <Form.Text className="text-danger">
                                    {errors.nombre?.message}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Descripcion</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={comida.descripcion}
                                    {...register('descripcion', {
                                        required: "La descripcion es un campo obligatorio"
                                    })}
                                />
                                <Form.Text className="text-danger">
                                    {errors.descripcion?.message}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPrecio">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control
                                    type="number"
                                    defaultValue={comida.precio}
                                    {...register("precio", {
                                        required: "El precio del producto es obligatorio"
                                    })}
                                />
                                <Form.Text className="text-danger">
                                    {errors.precio?.message}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formImagen">
                                <Form.Label>Imagen URL*</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={comida.imagen}
                                    {...register("imagen", {
                                        required: "La imagen es obligatoria",
                                    })}
                                />
                                <Form.Text className="text-danger">
                                    {errors.imagen?.message}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPrecio">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control
                                    type='text'
                                    defaultValue={comida.categoria}
                                    {...register("categoria", {
                                        required: "La categoria es obligatoria",
                                    })}>
                                </Form.Control>
                                <Form.Text className="text-danger">
                                    {errors.categoria?.message}
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Modificar
                            </Button>
                        </Form>
                    </>
            }
        </section>
    );
};

export default EditarComida;