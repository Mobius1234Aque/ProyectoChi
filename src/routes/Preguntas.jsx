import React from 'react';

import { Header } from '../components/Header';

import { Footer } from "../components/Footer";

import { Subtitulo, Titulo } from '../components/Titulos';


import '../css/Preguntas.css'

import { Card, Space } from 'antd';


export function Preguntas() {
    return(
        <>
            <Header/>
                <Titulo tit={'Preguntas frecuentes'}/>

                <div className="contendor-preguntas" style={{maxWidth:'100%', width:'1200px', textAlign:'center', display: 'block', margin: 'auto'}}>   
                    <Space direction="vertical" size={20}>
                        <Card
                        title="¿Como se puede registrar?"
                        style={{
                            width: 300,
                            margin:'20px',
                            border:'1px solid black'
                        }}
                        >
                        <p>El registro depende completamente de los directivos quienes les proporcionaran una cuenta en caso de ser trabajador de algun plantel de la zona</p>

                        </Card>
                    </Space>
                    <Space direction="vertical" size={16}>
                        <Card
                        title="¿Como se puede registrar?"
                        style={{
                            width: 300,
                            margin:'20px',
                            border:'1px solid black'
                        }}
                        >
                        <p>El registro depende completamente de los directivos quienes les proporcionaran una cuenta en caso de ser trabajador de algun plantel de la zona</p>
                        </Card>
                    </Space>
                    <Space direction="vertical" size={16}>
                        <Card
                        title="Webi wabo"
                        style={{
                            width: 300,
                            margin:'20px',
                            border:'1px solid black'
                        }}
                        >
                        <p>El registro depende completamente de los directivos quienes les proporcionaran una cuenta en caso de ser trabajador de algun plantel de la zona</p>
                        </Card>
                    </Space>
                </div>

            <Footer/>
        </>
    )
    
}