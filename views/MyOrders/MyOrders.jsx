import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './MyOrders.module.css'; 
import { useSelector } from 'react-redux';
import pedidos from './assets/pedidos.gif'
import FooterSimple from '../../components/FooterSimple/FooterSimple'
import { Link } from "react-router-dom";

function MyOrders() {
  const email = useSelector((state) => state.email);
  const [ordersFromDB, setOrdersFromDB] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    // Función para obtener órdenes de la base de datos
    const fetchOrdersFromDB = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://backend-henry-pf.onrender.com/`);
        const orders = response.data;
        setOrdersFromDB(orders);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener las órdenes de la base de datos:', error);
        setIsLoading(false);
      }
    };

    // Llama a la función cuando el email en Redux cambia
    fetchOrdersFromDB();
  }, [email]); 

  return (
    <div className={style.centrar}>
      <h1 className={style.title}>📦 Your orders are as follows: 📦</h1>
      {isLoading ? (
        <p>Cargando órdenes...</p>
      ) : ordersFromDB.length > 0 ? (
        // Mostrar las órdenes desde la base de datos
        <div className={style.allOrders}>
          {ordersFromDB.map((order) => (
            <div key={order.ordenId} className={style.finalizar}>
              <br />
              <p><strong>Numero de Orden: </strong> {order.ordenId}</p>
              <p><strong>Fecha de Orden: </strong> {order.orderDate}</p>
              <p><strong>Nombre de Titular: </strong>{`${order.nombre} ${order.apellido}`}</p>
              <p><strong>Monto Total: </strong>U$S {order.total}</p>

              <p><strong>Estatus de Orden: </strong> {order.status === "pendiente" ? (<span> {order.status} <Link to="/buy"><button>Pagar</button></Link></span>) : (order.status)}</p>

              {order.Products.map((product) => (
                <div key={product.id} className={style.product}>
                  <p><strong>Nombre de Producto: </strong>{product.name}</p>
                  <p><strong>Categoría de Producto: </strong>{product.category}</p>
                </div>
              ))}
              <br />
            </div>
          ))}
        </div>
      ) : (
        <div className={style.sinOrdenes}>
          <p> ❌¡Aun No tienes órdenes creadas!❌</p>
          <img className={style.gif} src={pedidos} alt="orders" />
        </div>
      )}
      <FooterSimple />
    </div>
  );
}

export default MyOrders;

