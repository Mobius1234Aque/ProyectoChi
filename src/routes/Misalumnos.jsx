import React from 'react';

import { Header } from '../components/Header';

import { Link } from "react-router-dom";


import { Footer } from "../components/Footer";

import { Subtitulo, Titulo } from '../components/Titulos';
import { Space, Table, Tag } from 'antd';
const columns = [
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Edad',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Direccion',
    dataIndex: 'address',
    key: 'address',
  },
  
  {
    title: 'Accion',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
];

export function Misalumno() {
    return(
        <>
        <Header/>

            <Titulo tit={'Mi lista de alumnos'}/>
            <div style={{maxWidth:'100%', width:'1000px', textAlign:'center', display: 'block', margin: 'auto'}}>
                <Table style={{width:'850px', display: 'block', margin: 'auto'}} columns={columns} dataSource={data} />
            </div>

        <Footer/>
        </>)
}