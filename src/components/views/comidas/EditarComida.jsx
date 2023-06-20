import { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { buscarcomida, editarReceta } from '../../helpers/queries';

const EditarComida = () => {
    const { register, handleSubmit, formState: { errors }, reset,setValue } = useForm();
    const {id} = useParams();

    useEffect(()=>{
    buscarcomida(id).then((respuesta)=>{
    if(respuesta){
    setValue('nombre',respuesta.nombre);
    setValue('precio',respuesta.precio);
    setValue('imagen',respuesta.imagen);
    setValue('categoria',respuesta.categoria);
    }
    })
    })
    const enviar=(productoEditado)=>{
    editarReceta(productoEditado).then((respuesta)=>{
    respuesta.status==201?(Swal.fire('Comida Guardada','Actualizacion Exitosa','success'),reset()):Swal.fire('Error al Modificar',`El producto ${comidaNueva.nombre} no se pudo modificar`,'error');
    })
    }
    return (
        <section className='container mainSection'>
            <h1 className='display-3'>Editar Comida</h1>
            <hr />
            <Form onSubmit={handleSubmit(enviar)}>
                <Form.Group className="mb-3" controlId="formNombreProdcuto">
                    <Form.Label>Comida*</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ej: Cafe"
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
                <Form.Group className="mb-3" controlId="formPrecio">
                    <Form.Label>Precio*</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Ej: 50"
                        {...register("precio", {
                            required: "El precio del producto es obligatorio",
                            min: {
                                value: 1,
                                message: "El precio minimo es de $1",
                            },
                            max: {
                                value: 10000,
                                message: "El precio maximo es de $10000",
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
                        placeholder="Ej: https://www.pexels.com/es-es/vans-en-blanco-y-negro-fuera-de-la-decoracion-para-colgar-en-la-pared-1230679/"
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
                    <Form.Select    {...register("categoria", {
                        required: "La categoria es obligatoria",
                    })}>
                        <option value="">Seleccione una opcion</option>
                        <option value="bebida caliente">Bebida caliente</option>
                        <option value="bebida fria">Bebida fria</option>
                        <option value="dulce">Dulce</option>
                        <option value="salado">Salado</option>
                    </Form.Select>
                    <Form.Text className="text-danger">
                        {errors.categoria?.message}
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                Modificar
                </Button>
            </Form>
        </section>
    );
};

export default EditarComida;