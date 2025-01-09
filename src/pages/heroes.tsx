// REACT DEPENDENCIES
import { useState, useEffect } from "react";
// SERVICE
import { getCharacters } from "../services/SwapiService"; 
// INTERFACES
import {
  HeroInterface,
  ApiResponse,
} from "../interfaces/api-response-interface";

// COMPONETNS
import { Header } from "../components/header/header";
import Spinner from "../components/spinner/spinner";
import CharterCard from "../components/charterCard/charterCard";

export default function HeroesPage() {
  const [heroes, setHeroes] = useState<HeroInterface[]>([]); // Almacena los personajes de la página actual
  const [loading, setLoading] = useState(true); // Indica si la carga está en curso
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas disponibles
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Llama al servicio para obtener los personajes de la página actual
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const data: ApiResponse = await getCharacters(currentPage);
        setHeroes(data.results); // Extrae la propiedad "results" y asígnala a "heroes"
        setTotalPages(Math.ceil(data.count / 10)); // Calcula el total de páginas (10 personajes por página)
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [currentPage]);

  // Función para ir a la página anterior
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Función para ir a la página siguiente
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const filteredHeroes = heroes.filter((hero) =>
    hero.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIndexElement = (element: HeroInterface): number => {
    // Calcula el índice global del personaje
    const indexInPage = heroes.indexOf(element); // Índice en la página actual
    let globalIndex = (currentPage - 1) * 10 + indexInPage + 1; // +1 porque la API comienza en 1, no en 0

    // Si el índice global es mayor o igual a 17, incrementar en 1
    if (globalIndex >= 17) {
      globalIndex++;
    }

    return globalIndex; // Devolver el índice global ajustado
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="relative mb-5">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            🔍
          </span>
        </div>

        {/* Renderizado condicional del Spinner */}
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <Spinner />
          </div>
        ) : (
          <>
            {/* Grid de 4 columnas para las tarjetas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredHeroes.map((hero) =>
                hero ? (
                  <CharterCard
                    key={hero.name}
                    hero={hero}
                    getIndexElement={getIndexElement}
                  />
                ) : null
              )}
            </div>

            {/* Mensaje si no hay héroes */}
            {filteredHeroes.length === 0 && (
              <p className="text-center text-lg text-gray-700 col-span-full">
                No se encontraron héroes que coincidan con "{searchTerm}".
              </p>
            )}

            {/* Controles de paginación */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={goToPreviousPage}
                disabled={
                  currentPage === 1 || filteredHeroes.length < heroes.length
                }
                className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              <span className="text-lg">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={
                  currentPage === totalPages ||
                  filteredHeroes.length < heroes.length
                }
                className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
