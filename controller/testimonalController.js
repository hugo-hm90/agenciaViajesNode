import { Testimonial } from "../models/Testimoniales.js";

const guardarTestimoniales = async (req, res) => { // req - Lo que enviamos     res - lo que express nos responde
 
    const {nombre, correo, mensaje} = req.body;
    const errores = [];


    if (nombre.trim() === '') {
        errores.push({ mensaje: 'El nombre esta vacío' });
    }
    if (correo.trim() === '') {
        errores.push({ mensaje: 'El correo esta vacío' });
    }
    if (mensaje.trim() === '') {
        errores.push({ mensaje: 'El mensaje esta vacío' });
    }
    
    if (errores.length > 0 ) {

        //Consultar los testimoniales existentes
        const testimoniales = await Testimonial.findAll();



        // Mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        });

    } else{
        // Almacenarlo en la base de datos 
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimoniales')
        } catch (error) {
            console.log(error);
        }
    }


}

export {
        guardarTestimoniales
    };