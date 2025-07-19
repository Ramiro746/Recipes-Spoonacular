import React from "react";
import { ChefHat } from "lucide-react";
import {CircleUserRound} from "lucide-react";

import "../components/nav.css"


export default function nav() {
    return(
        <nav>
            <div className="prin">
                <ChefHat size={30}/>
                <h2>Spoonacular</h2>
            </div>

            <div className="items">
                <p>Buscador</p>
                <p>Categorias</p>
                <p>Favoritos</p>
            </div>

            <div>
                <CircleUserRound size={30}/>
            </div>
        </nav>
    )
}