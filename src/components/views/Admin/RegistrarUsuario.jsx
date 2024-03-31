//#region Imports
import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { crearUsuario } from '../../helpers/queries';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
//#endregion
const RegistrarUsuario = () => {
    //#region States
    const { register, handleSubmit, formState: { errors }, reset, } = useForm();
    const navegacion = useNavigate();
    //#endregion
    //#region Functions
    const cargar = (usuario) => {
        crearUsuario(usuario).then((respuesta) => {
            if (respuesta.status === 201) {
                Swal.fire("Exito al crear usuario", "Usuario registrador exitosamente", "success");
                navegacion("/");
            } else {
                Swal.fire("Eror al cargar usuario", "No se pudo cargar usuario nuevo, Intentelo nuevamente mas tarde", "error");
            }
        })
    }
    //#endregion
    return (
        <div>
            <div className="mt-5 mainSection">
                <h2 className='ms-3 mt-3'>Registrar empleado</h2>
                <hr className='mx-3' />
                <div className='row justify-content-center mx-2'>
                    <div className='col-12 col-sm-8 col-md-6 col-xl-4'>
                        <Form onSubmit={handleSubmit(cargar)}>
                            <Form.Group className="mb-2">
                                <Form.Label>Nombre*</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese un nombre de usuario"
                                    {...register('nombre', {
                                        required: "El nombre es obligatorio"
                                        , minLength: {
                                            value: 2,
                                            message: "Debe tener mas de 2 caracteres"
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: "Debe tener menos de 25 caracteres"
                                        }
                                    })}
                                />
                            </Form.Group>
                            <Form.Text className='text-danger'>
                                {errors.nombre?.message}
                            </Form.Text>
                            <Form.Group className="mb-2">
                                <Form.Label>Correo electrónico*</Form.Label>
                                <Form.Control
                                    type='String'
                                    placeholder="Ingrese un email"
                                    {...register("email", {
                                        required: "Ël campo es obligatorio"
                                        , minLength: {
                                            value: 6,
                                            message: "La cantidad minima de caracteres es 6"
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: "La cantidad maxima de caracteres es 25"
                                        }
                                    })
                                    }
                                />
                                <Form.Text className='text-danger'>
                                    {errors.email?.message}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Contraseña*</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Ingrese un password"
                                    {...register("contraseña", {
                                        required: "El campo es obligatorio"
                                        , minLength: {
                                            value: 8,
                                            message: "La cantidad minima de caracteres es 8"
                                        }
                                        , maxLength: {
                                            value: 30
                                            , message: "La cantidad maxima de caracteres es 20"
                                        }
                                    })
                                    }
                                />
                                <Form.Text className='text-danger'>
                                    {errors.contraseña?.message}
                                </Form.Text>
                            </Form.Group>
                            <div className="text-center">
                                <Button
                                    className="mt-3 btn btn-info btn-lg btn-block mb-2"
                                    type="submit">
                                    Registrar
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrarUsuario;