//#region Imports
import { Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { buscarComida, editarComida } from '../../../helpers/queries';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
//#endregion

const EditarComida = () => {
    //#region States
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { _id } = useParams();
    const [spinner, setSpinner] = useState(true);
    const navegar = useNavigate();
    //#endregion
    //#region Functions
    useEffect(() => {
        buscarComida(_id).then((respuesta) => {
            if (respuesta) {
                setValue('_id', respuesta._id);
                setValue('nombre', respuesta.nombre);
                setValue('precio', respuesta.precio);
                setValue('imagen', respuesta.imagen);
                setValue('descripcion', respuesta.descripcion);
                setValue('categoria', respuesta.categoria);
                setSpinner(false)
            }
        })
    }, [])

    const enviar = (productoEditado) => {
        console.log(productoEditado);
        console.log(productoEditado._id);
        editarComida(productoEditado, productoEditado._id).then((respuesta) => {
            if (respuesta.status === 201) {
                Swal.fire('Comida Guardada', 'Actualizacion Exitosa', 'success')
                navegar('/administrador');
            } else {
                Swal.fire('Error al Modificar', `El producto ${productoEditado.nombre} no se pudo modificar`, 'error');
            }
        })
    }
//#endregion
    return (
        <section className='container mainSection'>
            <h1 className='display-3'>Editar Comida</h1>
            <hr />
            {
                spinner ?
                    (<div className='d-flex justify-content-center'>
                        <Spinner></Spinner>
                    </div>) :
                    <>
                        <Form onSubmit={handleSubmit(enviar)}>
                            {/*             <Form.Group className="mb-3" controlId="formNombreProdcuto">
                    <Form.Label>Codigo*</Form.Label>
                    <Form.Control
                        type="text"
                        {...register("_id", {
                            required: "El nombre de la comida es obligatorio",
                            minLength: {
                                value: 2,
                                message: "La cantidad minima de caracteres es de 2 digitos",
                            },
                            maxLength: {
                                value: 100,
                                message: "La cantidad minima de caracteres es de 2 digitos",
                            },
                        })}
                    />
                    <Form.Text className="text-danger">
                        {errors._id?.message}
                    </Form.Text>
                </Form.Group> */}
                            <Form.Group className="mb-3" controlId="formNombreProdcuto">
                                <Form.Label>Comida*</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register("nombre", {
                                        required: "El nombre de la comida es obligatorio",
                                        minLength: {
                                            value: 2,
                                            message: "La cantidad minima de caracteres es de 2 digitos",
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "La cantidad minima de caracteres es de 2 digitos",
                                        },
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
                                    placeholder='Pj.Chipá'
                                    {...register('descripcion', {
                                        required: "La descripcion es un campo obligatorio"
                                        , minLength: {
                                            value: 20,
                                            message: "La cantidad minima de caracteres es de 2"
                                        },
                                        maxLength: {
                                            value: 500
                                            , message: "La cantidad maxima es de 500"
                                        }
                                    })}
                                />
                                <Form.Text className="text-danger">
                                    {errors.descripcion?.message}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPrecio">
                                <Form.Label>Precio*</Form.Label>
                                <Form.Control
                                    type="number"
                                    {...register("precio", {
                                        required: "El precio del producto es obligatorio",
                                        min: {
                                            value: 1,
                                            message: "El precio minimo es de $1",
                                        },
                                        max: {
                                            value: 999999,
                                            message: "El precio maximo es de $999999",
                                        },
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
                                    {...register("imagen", {
                                        required: "La imagen es obligatoria",
                                    })}
                                />
                                <Form.Text className="text-danger">
                                    {errors.imagen?.message}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPrecio">
                                <Form.Label>Categoria*</Form.Label>
                                <Form.Control
                                    type='text'
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