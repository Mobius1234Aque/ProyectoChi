
import '../css/Titulo.css'
export function Titulo({tit,icono}) {
    return(
        <article className="conTit">
            <h1 className="titulo">{tit}   {icono}</h1>
        </article>
    )
}

export function Subtitulo({subTit}) {
    return(
        <h2 className='subtitulo'>{subTit}</h2>
    );
    
}