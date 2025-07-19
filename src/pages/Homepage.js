import React, {useState, useEffect} from "react";
import chefHat from "../assets/chef-hat.svg"
import { gsap } from "gsap";
import Nav from "../components/nav"
import "./Homepage.css"


const Homepage = () => {

    useEffect(() => {
    const img = document.querySelector(".chef");
    if (!img) return;

    img.onload = () => {
        let fondito = document.createElement("div");

        fondito.className = "fondo-transicion";

        fondito.style.position="fixed";
        fondito.style.top= "0";
        fondito.style.left= "0";
        fondito.style.width= "100%";
        fondito.style.height= "100%";
        fondito.style.background= "#fef9e7";
        fondito.style.zIndex= "1010";
        
        fondito.style.pointerEvents= "none";

        document.body.appendChild(fondito);


        let tl = gsap.timeline({
            repeat: 1, // Repite la línea de tiempo infinitamente
            yoyo: true, // Hace que la línea de tiempo se invierta en cada repetición
            onComplete: () => {
                document.querySelector(".chef").style.display = "none";

                /*Esto de aca abajo puro chat gpt */
                gsap.to(fondito, {
                    opacity: 0,
                    duration: 0.25,
                    ease: "power1.out",
                    onComplete: () => {
                        fondito.remove(); // elimina tras desvanecerse
                    }
                });;
            }
        });

        
        tl.from(".fondo-transicion", {
            opacity: 1,
            duration: 0.25,
            
        }, "<");
        tl.from(".chef", {  
            y: -250,
            x:200,
            ease:"back.out",
            rotate:40,
            opacity: 0,
            delay: .10,
            
            /*
            onComplete : () => {
                gsap.to(".chef", {
                    x:500,
                    y:-300,
                    ease:"back.in",
                    opacity:0
                })
            }
                */
        });
    };
}, []);

    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState([]);
    
    /*Aqui es asi ya que la API devuelve multiples recetas, entonces recipes tiene que ser un array
    ya que se espera multiples objetos, "useState("");" asi solo guardara texto*/

    /*Texto	""
    Lista de elementos	[] */


    const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

    const search = async (e) => {

        e.preventDefault();

        try {
            const res = await fetch (`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}`, {
                method: "GET",
            });
            
            const data = await res.json();
            setRecipes(data.results); //aqui la api de spoonacular devuelve un parametro results por tanto hacemos "data.results"

            console.log(data);

        } catch (error){
            console.error("Error en la busqueda", error);
        }   
    };

    const resultList = recipes.length > 0 ? (
        recipes.map((recipe) => (
            <div className="receta" key={recipe.id}>
                <img className="imagenReceta" src={recipe.image} alt={recipe.title}></img>
                <h3>{recipe.title}</h3>
                
            </div>
        ))
    ) : (
        <p>No hay resultados</p>
    );

    const clearSearch = () => {
        setQuery("");
        setRecipes([]);
    }


        const [param1, setParam1] = useState('');
        const [param2, setParam2] = useState('');
        const [number, setNumber] = useState(5);
        
    const [nutrients, setNutrients] = useState([]);

    const findByNutrientes = async (e) => {

        e.preventDefault();

        const baseURL = "https://api.spoonacular.com/recipes/findByNutrients";
        const query = `?minProtein=${param1}&maxCarbs=${param2}&number=${number}`;
        const apikey = `&apiKey=${API_KEY}`;

        const fullUrl = baseURL + query + apikey;
        try{
            const res = await fetch(fullUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            setNutrients(data);//aqui la api de spoonacular no devuelve results por tanto ponemos solo data
            console.log(data, "nutrientes");

            } catch (error){
            console.error("Error en la busqueda", error);
        } 
    }
    const resultNutrients = nutrients.length > 0 ? (
        nutrients.map((nutrient) => (
            <div className="nutrientesCaja" key={nutrient.id}>
                <img className="imagenNutriente" src={nutrient.image} alt={nutrient.title}></img>
                <h3>{nutrient.title}</h3>
                <p>Calories: {nutrient.calories} kcal</p>
                <p>Protein: {nutrient.protein}</p>
                <p>Carbs: {nutrient.carbs}</p>
            </div>
        ))
    ) : (
        <p>No hay resultados</p>
    );
    const clearSearch2 = () => {
        setNutrients([]);
    }
    


    return (
        <div>
             <div className="introAnimation">
                <img className="chef" src={chefHat} />
            </div>
                {/*<div className="cajaChef" >*/}
                    <Nav/>
                    <div className="superhero">
                        <h2 className="titleSearch">Buscador de recetas</h2>
                        <div className="hero">  
                            <div className="hero-controls"> 
                                <form onSubmit={search}>
                                    <input
                                        className="Buscador"
                                        type="text"
                                        placeholder="Busca recetas"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)} /*actualiza query con lo que el usuario escriba, ya que sino si busque rice una vez, 
                                        cuando vuelva a escribir otra cosa como chicken solo volvera a buscar rice*/
                                    >
                                    </input>

                                    <button type="submit" className="botonBuscar">Buscar</button>
                                </form>
                                <button onClick={clearSearch} className="clear">Clear</button>
                            </div>
                        </div>

                        <div className="resultados">   
                            {resultList}
                        </div>
                        <div className="content">
                            <h2>Categorias</h2>
                            <div className="principalItems">
                                <div className="item1">
                                    <img className="imagenCategory" src="https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/1248/cached.offlinehbpl.hbpl.co.uk/news/OMC/Italian_food-20151028123558935.jpg"></img>
                                    <h3>Italian</h3>
                                </div>
                                <div className="item1">
                                    <img className="imagenCategory" src="https://images.immediate.co.uk/production/volatile/sites/30/2022/10/Pork-carnitas-b94893e.jpg?quality=90&webp=true&resize=700,636"></img>
                                    <h3>Mexican</h3>
                                </div>
                                <div className="item1">
                                    <img className="imagenCategory" src="https://admin.expatica.com/es/wp-content/uploads/sites/2/2023/10/spanish-cuisine-1536x1024.jpg"></img>
                                    <h3>Spanish</h3>
                                </div>
                                <div className="item1">
                                    <img className="imagenCategory" src="https://www.tapasmagazine.es/wp-content/uploads/2023/06/restaurantes-chinos-madrid.jpg"></img>
                                    <h3>Chinese</h3>
                                </div>
                                <div className="item1">
                                    <img className="imagenCategory" src="https://www.rewardsnetwork.com/wp-content/uploads/2016/12/IndianFood_Main.jpg"></img>
                                    <h3>Indian</h3>
                                </div>
                                <div className="item1">
                                    <img className="imagenCategory" src="https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/00/a0000370/img/basic/a0000370_main.jpg?20201002142956&q=80"></img>
                                    <h3>Japanese</h3>
                                </div>
                                <div className="item1">
                                    <img className="imagenCategory" src="https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1273516682.jpg?c=16x9&q=h_653,w_1160,c_fill/f_avif"></img>
                                    <h3>American</h3>
                                </div>
                            </div>
                        </div>

                        <div className="nutrientes">
                            <h2>Nutrientes</h2>
                            <div className="hero-controls">
                                <form>
                                <input
                                    className="buscadorProte"
                                    type="number"
                                    placeholder="Mínimo de proteínas"
                                    value={param1}
                                    onChange={(e) => setParam1(e.target.value)}
                                />
                                <input
                                    className="buscadorCarbs"
                                    type="number"
                                    placeholder="Max de carbs"
                                    value={param2}
                                    onChange={(e) => setParam2(e.target.value)}
                                />
                                <input
                                    className="numResultados"
                                    type="number"
                                    placeholder="Numero de resultados"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                                <button onClick={findByNutrientes} className="botonBuscar2">Buscar</button>
                            </form>
                                <button onClick={clearSearch2} className="clear">Clear</button>
                            </div>

                            <div className="seccionRecetas">
                                {resultNutrients}
                            </div>
                        </div>
                    </div>
                {/*</div>*/}
        </div>    
    );
};

export default Homepage;