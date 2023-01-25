import React, { useState, useEffect} from 'react';
import { Loader, Card, CamposFormulario } from '../components';

const RenderizarCards = ({ data, titulo }) => {
  if(data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post}/>)
  }
  return (
    <h2 className='mt-5 font-bold text-indigo-600 text-xl uppercase'>{titulo}</h2>
  )
};

const Inicio = () => {
  const [cargando, setCargando] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [textoBuscar, setTextoBuscar] = useState('');
  const [resultadoBusqueda, setResultadoBusqueda] = useState(null);
  const [buscadorTimeout, setBuscadorTimeout] = useState(null);
  
  const obtenerPosts = async () => {
    setCargando(true);

    try {
      const respuesta = await fetch('http://localhost:8080/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (respuesta.ok) {
        const resultado = await respuesta.json();
        setAllPosts(resultado.data.reverse());
      }
    } catch (error) {
      alert(error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerPosts();
  }, []);


  const handleBuscadorChange = (e) => {
    setTextoBuscar(e.target.value);

    setBuscadorTimeout(
      setTimeout(() => {
        const resultadoBusqueda = allPosts.filter((item) => item.nombre.toLowerCase().includes(textoBuscar.toLowerCase()) || item.instrucciones.toLowerCase().includes(textoBuscar.toLowerCase()));
  
        setResultadoBusqueda(resultadoBusqueda);
      }, 500)
    );    
  };

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-gray-900 text-xl'>
        La Exposición de la Comunidad
        </h1>
        <p className='mt-2 text-gray-600 text-sm max-w[500px]'>
        Explora una colección de imágenes creativas y visualmente impresionantes generadas por la IA DALL-E
        </p>
      </div>

      <div className='mt-16'>
        <CamposFormulario 
          labelName="Buscar Posts"
          type="text"
          name="text"
          placeholder="Buscar Posts"
          value={textoBuscar}
          handleChange={handleBuscadorChange}
        />
      </div>
      <div className='mt-10'>
        {cargando ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>  
        ) : (
          <>
            {textoBuscar && (
              <h2 className='font-medium text-gray-600 text-xl mb-3'>Mostrando resultados para <span className='text-gray-600'>{textoBuscar}...</span></h2>
            )}
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-3'>
              {textoBuscar ? (
                <RenderizarCards
                  data={resultadoBusqueda}
                  titulo="No se encontraron resultados de búsqueda"
                  />
              ) : (
                <RenderizarCards
                  data={allPosts}
                  titulo="No se han encontrado posts"
                  />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Inicio