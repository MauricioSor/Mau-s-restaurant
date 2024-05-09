//#region Imports
import { Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { crearComida } from '../../../helpers/queries';
import { useNavigate } from 'react-router-dom';
//#endregion
const CrearComida = () => {
//#region States
    const { register, handleSubmit, formState: { errors }, reset, } = useForm();
    const navegar = useNavigate();
//#endregion
//#region Functions
    const guardar = (comidaNueva) => {
        crearComida(comidaNueva).then((respuesta) => {
            if (respuesta.status === 201) {
                Swal.fire('Comida Guardada', 'Guardado Exitoso', 'success')
                navegar('/administrador')
            } else {
                Swal.fire('Error al Guardar', `El producto ${comidaNueva.nombre} no se pudo guardar`, 'error');
            }
        });
    }
//#endregion
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
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='Pj.Chipá'
                        {...register('descripcion', {
                            required: "La descripcion es un campo obligatorio"
                        })}
                    />
                    <Form.Text className="text-danger">
                        {errors.descripcion?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select aria-label="Default select example"
                        {...register('categoria',{
                        required:"Debe seleccionar una categoria"
                        })
                        }>
                        <option>Seleccione una categoria</option>
                        <option value="Calientes">Calientes</option>
                        <option value="Bebida Caliente">Bebida Caliente</option>
                        <option value="Bebida fria">Bebida fria</option>
                        <option value="Simples">Simples</option>
                        <option value="Frio">Frio</option>
                        <option value="Pastas">Pastas</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Minutas">Minutas</option>
                        <option value="Guarnicion">Guarnicion</option>
                    </Form.Select>
                </Form.Group>
                <Button className='mt-2' variant="primary" type='submit'>Guardar</Button>
            </Form>
        </section>
    );
};

export default CrearComida;