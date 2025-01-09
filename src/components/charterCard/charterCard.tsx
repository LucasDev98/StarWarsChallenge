import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// INTERFACES
import { HeroInterface } from "../../interfaces/api-response-interface";

interface HeroCardProps {
  hero: HeroInterface;
  getIndexElement: (element: HeroInterface) => number;
}

// SERVICES
import { getCharacterImage } from "../../services/SwapiService";



export default function CharterCard( { hero, getIndexElement }: HeroCardProps) {

    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchImage = async () => {
          const url = await getCharacterImage(getIndexElement(hero));
          setImageUrl(url);
        };
    
        fetchImage();
      }, [hero, getIndexElement]);
    
  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={imageUrl}
          alt={hero.name}
          className="w-full h-96 object-cover"
         
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{hero.name}</h2>
          <p className="text-gray-700">
            <span className="font-bold">Altura:</span> {hero.height}
          </p>
          <p className="text-gray-700">
            <span className="font-bold">Peso:</span> {hero.mass}
          </p>
          <p className="text-gray-700">
            <span className="font-bold">Género:</span> {hero.gender}
          </p>

          <Link  to={`/heroe/${ getIndexElement(hero) == 17 ?  18 : getIndexElement(hero)}`}>
            <button className="bg-slate-800 text-cyan-600 p-2 w-full mt-1 rounded-s font-bold">
              VER MÁS
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
