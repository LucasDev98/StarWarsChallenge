// REACT DEPENDENCIES
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// COMPONENTS
import { Header } from "../components/header/header";
import Spinner from '../components/spinner/spinner';

// INTERFACES
import { HeroInterface } from '../interfaces/api-response-interface';
// SERVICES
import { getCharacterByID, getCharacterImage } from '../services/SwapiService';

export default function HeroePage() {
  const { heroId } = useParams();
  const [hero, setHero] = useState<HeroInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState('');
  useEffect(() => {
    const fetchHeroe = async () => {
      try {
        if (!heroId) {
          throw new Error('ID del héroe no proporcionado');
        }
        const data: HeroInterface = await getCharacterByID(parseInt(heroId));
        setHero(data); // Actualiza el estado con los datos del héroe

        const image = await getCharacterImage(parseInt(heroId));
        setImage(image);
      } catch (error) {
        if (error instanceof Error) {
          setHero(null)
        }
      } finally {
        setLoading(false); // Desactiva el estado de carga
      }
    };
    fetchHeroe();
  }, [heroId]);


  

  return (
    <>
    <Header />
    <section className="container max-w-7xl mx-auto mt-4 px-8">
      {/* Mostrar el Spinner si loading es true */}
      {loading && (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner />
        </div>
      )}
  
      {!loading && hero == null && (
        <div className="flex justify-center flex-col gap-5 items-center min-h-screen">
          <h3 className="text-6xl">UPS HEROE NO ENCONTRADO</h3>
          <img src="/images/404-image.png" alt="404 image" />
        </div>
      )}

      {/* Mostrar el contenido si loading es false */}
      {!loading && hero &&  (
        <article className="heroe grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Imagen del héroe */}
          <img
            src={image}
            alt={hero?.name || "Héroe"}
            className="w-full h-auto rounded-lg shadow-md"
          />
  
          {/* Información del héroe */}
          <div className="heroe-info">
            <h3 className="text-6xl font-bold uppercase">{hero?.name}</h3>
            <p className="text-3xl text-zinc-700">Información</p>
  
            {/* Detalles básicos */}
            <div className="space-y-2">
              <p><span className="font-bold">Altura:</span> {hero?.height} cm</p>
              <p><span className="font-bold">Peso:</span> {hero?.mass}</p>
              <p><span className="font-bold">Color de pelo:</span> {hero?.hair_color}</p>
              <p><span className="font-bold">Color de piel:</span> {hero?.skin_color}</p>
              <p><span className="font-bold">Color de ojos:</span> {hero?.eye_color}</p>
              <p><span className="font-bold">Año de nacimiento:</span> {hero?.birth_year}</p>
              <p><span className="font-bold">Género:</span> {hero?.gender}</p>
              <p><span className="font-bold">Planeta natal:</span> {hero?.homeworld}</p>
            </div>
  
            {/* Películas */}
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-800">Películas</h3>
              <ul className="list-disc list-inside">
                {hero?.films.map((film, index) => (
                  <li key={index}>
                    <a href={film} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      Película {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Especies */}
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-800">Especies</h3>
              <ul className="list-disc list-inside">
                {hero?.species.map((specie, index) => (
                  <li key={index}>
                    <a href={specie} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      Especie {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Vehículos */}
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-800">Vehículos</h3>
              {hero?.vehicles.length > 0 ? (
                <ul className="list-disc list-inside">
                  {hero?.vehicles.map((vehicle, index) => (
                    <li key={index}>
                      <a href={vehicle} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        Vehículo {index + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No tiene vehículos.</p>
              )}
            </div>
  
            {/* Naves Estelares */}
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-800">Naves Estelares</h3>
              {hero?.starships.length > 0 ? (
                <ul className="list-disc list-inside">
                  {hero?.starships.map((starship, index) => (
                    <li key={index}>
                      <a href={starship} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        Nave Estelar {index + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No tiene naves estelares.</p>
              )}
            </div>
  
            {/* Fechas de creación y edición */}
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-800">Fechas</h3>
              <p><span className="font-bold">Creado:</span> {new Date(hero?.created).toLocaleDateString()}</p>
              <p><span className="font-bold">Editado:</span> {new Date(hero?.edited).toLocaleDateString()}</p>
            </div>
          </div>
        </article>
      )}
    </section>
  </>
  );
}