import { Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { crearReceta } from '../../helpers/queries';
import { useNavigate } from 'react-router-dom';
const CrearComida = () => {
    const { register, handleSubmit, formState: { errors }, reset, } = useForm();
    const navegar= useNavigate();
    const guardar = (comidaNueva) => {
        console.log(comidaNueva);
        crearReceta(comidaNueva).then((respuesta) => {
            if (respuesta.status === 201) {
            Swal.fire('Comida Guardada', 'Guardado Exitoso', 'success')
            navegar('/administrador')
            } else {
                Swal.fire('Error al Guardar', `El producto ${comidaNueva.nombre} no se pudo guardar`, 'error');
            }
        });
    }
    return (
            <section className='container mainSection'>
                <h1 className='mt-4'>Nuevo Producto</h1>
                <hr />
                <Form onSubmit={handleSubmit(guardar)}>
                    <Form.Group>
                        <Form.Label>Nombre de Comida</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Pj.Chipá'
                            {...register('nombre', {
                                required: "El nombre de Comida es obligatorio"
                                , minLength: {
                                    value: 2,
                                    message: "La cantidad minima de caracteres es de 2 y maximo de 20"
                                },
                                maxLength: {
                                    value: 20
                                    , message: "La cantidad minima de caracteres es de 2 y maximo de 20"
                                }
                            })}
                        />
                        <Form.Text className="text-danger">
                            {errors.nombre?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder='Ej: 1200'
                            {...register('precio', {
                                required: "El precio de la Comida es obligatorio"
                                , min: {
                                    value: 20,
                                    message: "La cantidad minima es de $20"
                                },
                                max: {
                                    value: 100000
                                    , message: "La cantidad maxima es de $10000"
                                }
                            })}
                        />
                        <Form.Text className="text-danger">
                            {errors.precio?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Imagen URL*</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Ej: https://media.istockphoto.com/id/1462145716/es/foto/jugosos-bocados-de-carne-de-nueva-york.jpg?s=612x612&w=0&k=20&c=V8iCuI1dUVBjqajE9MDC8thQxBvL2RJkvbqqXL7IV0A='
                            {...register('imagen', {
                                required: "El imagen de Comida es obligatorio"
                                
                            })}
                        />
                        <Form.Text className="text-danger">
                            {errors.imagen?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Ej: Bebida caliente'
                            {...register('categoria', {
                                required: "El nombre de categoria es obligatorio"                                
                                , minLength: {
                                    value: 2,
                                    message: "La cantidad minima de caracteres es de 2 y maximo de 20"
                                },
                                maxLength: {
                                    value: 20
                                    , message: "La cantidad minima de caracteres es de 2 y maximo de 20"
                                }
                            })}
                        />
                        <Form.Text className="text-danger">
                            {errors.categoria?.message}
                        </Form.Text>
                    </Form.Group>
                    <Button className='mt-2' variant="primary" type='submit'>Guardar</Button>
                </Form>
            </section>
        );
    };

    export default CrearComida;