import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio = async (req, res) => { // req - Lo que enviamos     res - lo que express nos responde
    
    const promiseDB = [];

    // Consultar 3 viajes del modelo viaje
    promiseDB.push( Viaje.findAll({limit: 3} ));
    // Consultar 3 testimoniales del modelo testimonial
    promiseDB.push( Testimonial.findAll({limit: 3} ));

    try {
        const resultado = await Promise.all(promiseDB);

        res.render('inicio', {
            pagina: 'Inicio',
            clase:'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }

}
const paginaNosotros = (req, res) => { // req - Lo que enviamos     res - lo que express nos responde
 
    res.render('nosotros', {
        pagina: 'Nosotros'
    });

}
const paginaViajes = async (req, res) => { // req - Lo que enviamos     res - lo que express nos responde
    // Consultar BD
    const viajes = await Viaje.findAll();
    
    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes,
    });
}
const paginaTestimoniales = async (req, res) => { // req - Lo que enviamos     res - lo que express nos responde
    
    const testimoniales = await Testimonial.findAll();



   try {
    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales
    });

   } catch (error) {
    console.log(error);
   }
}


// Muestra viaje por su slug 
const paginaDetalleViaje = async (req, res) => {

    const { slug } = req.params; // es el slug que hay en la bd de viaje

    try {
            const viaje = await Viaje.findOne({where : {slug} });

            res.render('viaje', {
                pagina:'Información Viaje',
                viaje
            })
    } catch (error) {
        console.log(error);
    }

}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}