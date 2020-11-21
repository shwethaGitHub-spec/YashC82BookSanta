import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem, Icon, Card } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class MyDonationsScren extends React.Component{
    static navigationOptions = {header: null};
    constructor(){
        super()
        this.state = {
          allDonations : [],
          userId: firebase.auth().currentUser.email
        }
      }
      getAllDonations = () =>{
        this.requestRef = db.collection("all_donations").where("donor_id","==",this.state.userId)
        .onSnapshot((snapshot)=>{
          var allDonations = snapshot.docs.map(document => document.data());
          this.setState({
            allDonations : allDonations
          });
        })
      }
      componentDidMount(){
          this.getAllDonations();
      }

    keyExtractor = (item, index) => index.toString()

    renderItem = ( {item, i} ) =>{
        return (
        <ListItem
            key={i}
            title={item.book_name}
            subtitle={"Requested by: " + item.requested_by + "\nstatus: " + item.request_status}
            leftElement={
                <Icon name = "book" type = "font-awesome" color = "grey"/>
            }
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            rightElement={
                <TouchableOpacity style={styles.button}>
                <Text style={{color:'#ffff'}}>Send Book</Text>
                </TouchableOpacity>
            }
            bottomDivider
        />
        )
    }

    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader title="Donate Books"/>
                <View style={{flex:1}}>
                   {
                        this.state.allDonations.length === 0
                        ?(
                            <View style={styles.subtitle}>
                                <Text style={{ fontSize: 20}}>List Of All Book Donations</Text>
                            </View>
                        )
                        :(
                            <FlatList
                                keyExtractor={this.keyExtractor}
                                data={this.state.allDonations}
                                renderItem={this.renderItem}
                            />
                        )
                   }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({ 
    button:{ width:100, height:30, justifyContent:'center', alignItems:'center', backgroundColor:"#ff5722", shadowColor: "#000", 
    shadowOffset: { width: 0, height: 8 }, elevation : 16 }, 
    subtitle :{ flex:1, fontSize: 20, justifyContent:'center', alignItems:'center' } 
})
