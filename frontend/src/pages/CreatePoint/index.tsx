import React from 'react';
import {Link} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import {Map, Marker, TileLayer} from 'react-leaflet'

import './CreatePoint.css'
import logo from '../../assets/logo.svg'
const CreatePoint: React.FC = () => {
  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta"/>

        <Link to ='/'>
          <FiArrowLeft/>
          Voltar para home
        </Link>

      </header>

      <form>
        <h1>Cadastro do <br/>ponto de coleta</h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className= "field">
            <label htmlFor="name">Nome da entidade</label>
            <input type="text" id= "name" name= "name"/>
          </div>

          <div className="field-group">
            <div className= "field">
              <label htmlFor="email">Email</label>
              <input type="email" id= "email" name= "email"/>
            </div>

            <div className= "field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="text" id= "whatsapp" name= "whatsapp"/>
            </div>
          </div>
        </fieldset>


        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center = {[-15.908864,-47.7724672]} zoom = {15}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position ={[-15.908864,-47.7724672]}/>
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado(UF)</label>
              <select name="uf" id="uf">
                <option value="0">Selecione uma UF</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city">
                <option value="0">Selecione uma cidade</option>
              </select>
            </div>
          </div>
        </fieldset>


        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais ítens abaixo</span>
          </legend>

          <ul className="items-grid">
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="oleo"/>
              <span>Oleo de Cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="oleo"/>
              <span>Oleo de Cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="oleo"/>
              <span>Oleo de Cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="oleo"/>
              <span>Oleo de Cozinha</span>
            </li>

          </ul>
        </fieldset>
        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
}

export default CreatePoint;