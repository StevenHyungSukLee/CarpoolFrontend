import React, {useState, useEffect} from "react";
import {View, Text, Modal, StyleSheet} from "react-native";

const Popup = ({visible, children}) => {
    const [showModal, setShowModal] = useState(visible)
    const toggleModal = () => {
        if(visible) {
            setShowModal(true)
        } else {
            setShowModal(false)
        }
    }

    useEffect(() => {
        toggleModal()
    }, [visible])


    return (
        <Modal transparent={true} visible={showModal} animationType={"fade"}>
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
        height: '25%',
        backgroundColor: 'rgba(255,255,255,1)',

        alignItems: 'center',

        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 20,
    }
})

export default Popup