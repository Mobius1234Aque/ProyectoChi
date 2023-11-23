import { Header } from '../components/Header';

import { Footer } from "../components/Footer";

import { Subtitulo, Titulo } from '../components/Titulos';

import '../css/Inicio.css'

import '../css/Slider.css'


import { data } from "../js/data";

import { useEffect, useRef, useState } from 'react';




export function Home() {

  const listRef = useRef();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {

    const listNode = listRef.current;

    const imgNode = listNode.querySelectorAll("li")[currentIndex];
  
    if (imgNode) {
      imgNode.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start"
      });
    }
  }, [currentIndex]);
  

  const scrollToImage = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex(curr => {
        const isFirstSlide = currentIndex === 0;
        return isFirstSlide ? 0 : curr - 1;
      })
    } else {
      const isLastSlide = currentIndex === data.length - 1;
      if (!isLastSlide) {
        setCurrentIndex(curr => curr + 1);
      }
    }
  }

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  }
    return(
        <>
            <Header/>
            
            <Titulo tit='Bienvenido'/>
                <section className='container'>

                    <div className="main-container">
                        <div className="slider-container">
                            <div className='leftArrow' onClick={() => scrollToImage('prev')}>&#10092;</div>
                            <div className='rightArrow' onClick={() => scrollToImage('next')}>&#10093;</div>
                            <div className="container-images">
                            <ul ref={listRef}>
                                {
                                data.map((item) => {
                                    return <li key={item.id}>
                                    <img className='slide-img' src={item.imgUrl} width={700} height={280} />
                                    </li>
                                })
                                }
                            </ul>
                            </div>
                            <div className="dots-container">
                            {
                                data.map((_, idx) => (
                                <div key={idx}
                                    className={`dot-container-item ${idx === currentIndex ? "active" : ""}`}
                                    onClick={() => goToSlide(idx)}>
                                    &#9865;
                                </div>))
                            }
                            </div>
                        </div>
                    </div >
                    
                    <div className='item-dos'>
                          <Subtitulo subTit={"Zona 012"}/>
                          <p>Supervicion Escolar Sistema Indigena 
                            Numero 12 de Huazalingo Hidalgo es una 
                            unidad económica registrada desde 2014-12 que se dedica a la actividad económica Actividades administrativas de instituciones de bienestar social clasificada por (SCIAN) 931610, con domicilio en , Col. Guillermo Rossell, Huazalingo, Huazalingo, Hidalgo C.P. 43070, . 
                            Puedes contactarlos a través de 7711499741, o visitando su sitio web . 
                            Toda la información sobre esta empresa se ha obtenido a través de fuentes 
                            públicas del gobierno de Huazalingo, Hidalgo México.</p>
                    </div>


                    <div className="item-tres">
                        <Subtitulo subTit={"Infomacion relevante"}/>

                        <p> Es una unidad económica registrada desde 2014-12 que se dedica a la actividad económica Actividades administrativas de instituciones de bienestar social</p>
                    </div>               
                </section>
                
                

            <Footer/>
        </>
    );
    
}