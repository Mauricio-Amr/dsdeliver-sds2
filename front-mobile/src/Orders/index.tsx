import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView , Alert,  Text} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { fetchOrders } from '../api';
import Header from '../Header';
import OrderCard from '../Ordercard';
import { Order } from '../types';


function Orders() {

  const[orders, setOrders] = useState<Order[]>([]);
  const[isLoading, setIsLoading] =  useState(false);
  const navigate =useNavigation();
  const isFocused = useIsFocused();

const fetchData = () =>{
 
    setIsLoading (true);
    fetchOrders()
    .then(response => setOrders(response.data))
    .catch(error => Alert.alert('Houve um erro para busca o seu pedido'))
    .finally(()=> setIsLoading(false));

  }

  useEffect(()=>{
    if (isFocused){
      fetchData();
    }

  },[isFocused]);

  const handlerOnPress = (order: Order) => {
     navigate.navigate('OrderDetails', {
       order
     });
    }


  

  return (
   <>
   <Header />
   
    <ScrollView style = {styles.container}>
    {isLoading ? (<Text>Buscando pedidos ... </Text>) : (orders.map(order => (
      <TouchableWithoutFeedback
      key ={order.id}
      onPress= {() => handlerOnPress(order)}
      >
        <OrderCard order = {order} />
      </TouchableWithoutFeedback>
    ))
    )}
    
    </ScrollView>
   </>
  );

  function newFunction() {
    try { } finally { }
  }
}



const styles = StyleSheet.create({
  container: {paddingRight : '5%',
paddingLeft: '5%',
 }


}); 
export default Orders;