import React, {useState, useEffect} from "react";
import {View, Text, Modal, StyleSheet} from "react-native";

const Popup1 = ({visible, children}) => {
    


    return (
        <Modal transparent={true} visible={visible} animationType={"fade"}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    {children}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(0,0,0,0.5)'
    },

    modalContainer: {
        width: '80%',
        height: '35%',
        backgroundColor: 'rgba(255,255,255,1)',

        alignItems: 'center',

        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 20,
    }
})

export default Popup1