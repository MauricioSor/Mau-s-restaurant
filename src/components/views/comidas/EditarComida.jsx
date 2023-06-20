import { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { buscarcomida, editarReceta } from '../../helpers/queries';
import Swal from 'sweetalert2';
const EditarComida = () => {

    const { register, handleSubmit, formState: { errors }, reset,setValue } = useForm();
    const {id} = useParams();

    useEffect(()=>{
    buscarcomida(id).then((respuesta)=>{
    if(respuesta){
    setValue('id',respuesta.id);
    setValue('nombre',respuesta.nombre);
    setValue('precio',respuesta.precio);
    setValue('imagen',respuesta.imagen);
    setValue('categoria',respuesta.categoria);
    }
    })
    })
    const enviar=(productoEditado)=>{
    console.log(productoEditado);
    console.log(productoEditado.id);
    editarReceta(productoEditado,productoEditado.id).then((respuesta)=>{
    if(respuesta.status===200){
    Swal.fire('Comida Guardada','Actualizacion Exitosa','success')
    reset();
    }else{
        Swal.fire('Error al Modificar',`El producto ${productoEditado.nombre} no se pudo modificar`,'error');
    }})
    }
    return (
        <section className='container mainSection'>
            <h1 className='display-3'>Editar Comida</h1>
            <hr />
            <Form onSubmit={handleSubmit(enviar)}>
            <Form.Group className="mb-3" controlId="formNombreProdcuto">
                    <Form.Label>Codigo*</Form.Label>
                    <Form.Control
                        type="text"
                        {...register("id", {
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
                        {errors.id?.message}
                    </Form.Text>
                </Form.Group>
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
        </section>
    );
};

export default EditarComida;