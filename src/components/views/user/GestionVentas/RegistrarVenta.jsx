import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { crearComprobante, listarClientes, listarUsuarios } from '../../../helpers/queries';
import Swal from 'sweetalert2';

const RegistrarVenta = (props) => {
    const [datosMesa, setDatosMesa] = useState(JSON.parse(localStorage.getItem("DatosMesa")) || null)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [mosos, setMosos] = useState([""])
    const [clientes, setClientes] = useState([""])
    const [spinner, setspinner] = useState(false)
    
    const cargarMosos = () => {
        listarUsuarios().then((resp) => {
            if (resp.status == 200) {
                const mososData = resp.data.map(item => ({ _id: item._id, nombre: item.nombre }));
                setMosos(mososData);
            } else {
                Swal.fire("Error al conectar con el servidor", "", "error")
            }
        })
    }
    const cargarClientes = () => {
        listarClientes().then((resp) => {
            if (resp.status == 200) {
                const clientesData = resp.data.map(item => ({ _id: item._id, nombre: item.nombre }));
                setClientes(clientesData);
                setspinner(true)
            } else {
                Swal.fire("Error al conectar con el servidor", "", "error")
            }
        })
    }
    useEffect(() => {
        cargarMosos();
        cargarClientes();
    }, [])
    const registrarDatosVenta = async(venta) => {
        console.log(venta);
        venta.mesa=parseInt(venta.mesa)
        crearComprobante(venta).then((resp)=>{
            if(resp.status==200){
                Swal.fire("Success","","success")
                
            }else{
                Swal.fire("Error","","error")
            }
        })
    }
    return (
        <Container>
            <h1 className='fs-1 mb-3'>Registro de Ventas</h1>
            {spinner ?
                (<>
                    <h4 className="fs-3 text-center">Datos de mesa</h4>
                    <Form onSubmit={handleSubmit(registrarDatosVenta)} className='d-flex flex-column'>
                        <Form.Label>Mesa</Form.Label>
                        <Form.Control
                            type='text'
                            //disabled={true}
                            defaultValue={datosMesa._id}
                            value={datosMesa._id}
                            {...register('mesa')} />
                        <Form.Text className='text-danger'>
                            {errors.mesa?.message}
                        </Form.Text>
                        <Form.Label>Detalle</Form.Label>
                        <Form.Control
                            type='text'
                            defaultValue={datosMesa.detalle}
                            value={datosMesa.detalle}
                            //disabled={true}
                            {...register('detalle')}
                        />
                        <Form.Text className='text-danger'>
                            {errors.detalle?.message}
                        </Form.Text>
                        <Form.Label>Empleado</Form.Label>
                        <Form.Select
                            type='text'
                            {...register('usuario', {
                                required: "Debe seleccionar un empleado"
                            })}>
                            {
                                mosos.map((moso, index) => (
                                    <option key={index} value={moso._id}>{moso.nombre}</option>
                                ))
                            }
                        </Form.Select>
                        <Form.Text className='text-danger'>
                            {errors.empleado?.message}
                        </Form.Text>
                        <h4 className="fs-3 text-center">Datos de facturacion</h4>
                        <Form.Label>Cliente</Form.Label>
                        <Form.Select
                            type='text'
                            {...register('cliente', {
                                required: "El codigo de cliente es obligatorio"
                            })}>
                            {
                                clientes.map((moso, index) => (
                                    <option key={index} value={moso._id}>{moso.nombre}</option>
                                ))
                            }
                        </Form.Select>
                        <Form.Text className='text-danger'>
                            {errors.cliente?.message}
                        </Form.Text>
                        <Form.Label>Total</Form.Label>
                        <Form.Control
                            type='text'
                            defaultValue={datosMesa.total}
                            {...register('total', {
                                required: "El total es un campo obligatorio"
                            })}
                        />
                        <Form.Text className='text-danger'>
                            {errors.total?.message}
                        </Form.Text>
                        <Form.Label>Tipo de pago</Form.Label>
                        <Form.Control
                            type='text'
                            defaultValue={(datosMesa.pago == null ? "" : datosMesa.pago)}
                            {...register('pago', {
                                required: "El pago es un campo obligatorio"
                            })}
                        />
                        <Form.Text className='text-danger'>
                            {errors.pago?.message}
                        </Form.Text>
                        <Container className='text-center'>
                            <Button type="submit" variant="primary" className='my-3'>Registrar Compra</Button>
                        </Container>
                    </Form>
                </>
                ) : <SpinnerCustom/>
            }
        </Container>
    );
};

export default RegistrarVenta;