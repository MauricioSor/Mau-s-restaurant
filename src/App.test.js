import axios from "axios";
import {iniciarSesion} from "./components/helpers/queries";

describe("test de peticiones asincronicas",async () => {
    
    test("Ejecutar inicio de sesion", async () => {
        // Llamada a la función asincrónica
        const consulta = await axios.post(`https://mau-resto-backend.vercel.app/apiUsuarios/autenticacion`,{
            email:"mauricio@admin.com",
            contraseña:"Mauricio123"
        })
        expect(consulta.status).toEqual(200)
        // Verificación
    });
    test("Listar usuarios", async () => {
        // Llamada a la función asincrónica
        const consulta = await axios.get(`https://mau-resto-backend.vercel.app/apiUsuarios/`)
        expect(consulta.status).toEqual(200)
        // Verificación
    });
    test("Listar roles", async () => {
        // Llamada a la función asincrónica
        const consulta = await axios.get(`https://mau-resto-backend.vercel.app/apiroles/`)
        expect(consulta.status).toEqual(200)
        // Verificación
    });
});