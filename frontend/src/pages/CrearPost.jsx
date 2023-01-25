import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { CamposFormulario, Loader } from '../components';

const CrearPost = () => {
  const navegacion = useNavigate();
  const [ formulario, setFormulario ] = useState({
    nombre: '',
    instrucciones: '',
    imagen: '',
  });

  const [generandoImagen, setGenerandoImagen] = useState(false);
  const [cargando, setCargando] = useState(false);

  const generarImagen = async () => {
    if(formulario.instrucciones) {
      try {
        setGenerandoImagen(true);
        const respuesta = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: formulario.instrucciones }),
        });

        const data = await respuesta.json();
        setFormulario({ ...formulario, imagen: `data:image/jpge;base64,${data.photo}` });

      } catch (error) {
        alert(error);
      } finally {
        setGenerandoImagen(false);
      }
    } else {
      alert('Por favor ingresa las instrucciones');
    }
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    if(formulario.nombre && formulario.instrucciones && formulario.imagen) {
      try {
        setCargando(true);
        const respuesta = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formulario),
        });

        await respuesta.json();
        navegacion('/');
      } catch (error) {
        alert(error);
      } finally {
        setCargando(false);
      }
    } else {
      alert('Por favor completa todos los campos');
    }
  };

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value })
  };

  const handleSorprendeme = () => {
    const randomPromt = getRandomPrompt(formulario.instrucciones);
    setFormulario({ ...formulario, instrucciones: randomPromt });
  };

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-gray-900 text-xl'>
        Crear
        </h1>
        <p className='mt-2 text-gray-600 text-sm max-w[500px]'>
        Crear imágenes creativas y visualmente impresionantes generadas por la IA DALL-E y muestralas a la comunidad
        </p>
      </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <CamposFormulario
            labelName="Tu Nombre"
            type="text"
            name="nombre"
            placeholder="Dall-E"
            value={formulario.nombre}
            handleChange={handleChange}
          />
          <CamposFormulario
            labelName="Instrucciones"
            type="text"
            name="instrucciones"
            placeholder="Una portada de cómic de un superhéroe con auriculares"
            value={formulario.instrucciones}
            handleChange={handleChange}
            esSorprendeme
            handleSorprendeme={handleSorprendeme}
          />

          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {formulario.imagen ? (
              <img 
                src={formulario.imagen} 
                alt={formulario.instrucciones}
                className='w-full h-full object-contain' 
                />  
            ) : (
              <img
                src={preview}
                alt='preview'
                className='w-9/12 h-9/12 object-contain opacity-40'
              />
            )}

            {generandoImagen && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>                
            )}

          </div>
        </div>
        <div className='mt-5 flex gap-5'>
          <button
            type='button'
            onClick={generarImagen}
            className='bg-green-700 text-white font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            >
              {generandoImagen ? 'Generando...' : 'Generar Imagen'}
            </button>
        </div>
        <div className="mt-10">
          <p className='mt-2 text-gray-500 text-sm'>Una vez que hayas creado la imagen que deseas, puedes compartirla con otros en la comunidad</p>
          <button
            type='submit'
            className='mt-3 text-white bg-indigo-600 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            >
              {cargando ? 'Compartiendo...' : 'Compartir con la comunidad'}
            </button>
        </div>
      </form>
    </section>
  )
}

export default CrearPost