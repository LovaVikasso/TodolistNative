import {Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import {ReactElement, ReactNode, useState} from "react";
import {Checkbox} from "expo-checkbox";

export default function App() {
    const [value, setValue] = useState('')
    const [show, setShow] = useState<number | null>(null)
    const [tasks, setTasks] = useState([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS", isDone: false},
        {id: 4, title: "React", isDone: true},
        {id: 5, title: "React Native", isDone: false},
        {id: 6, title: "RTK", isDone: true},
    ])
    const addTask = () => {
        const newTask = {id: tasks.length + 1, title: value, isDone: false}
        setTasks([newTask, ...tasks])
        setValue(' ')
    }
    const changeStatus = (id: number, status: boolean) => {
        setTasks(tasks.map(t => t.id === id ? {...t, isDone: status} : t))
    }
    const changeTask = (id: number, title: string) => {
        setTasks(tasks.map(t => t.id === id ? {...t, title} : t))
    }
    const deleteTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id))
    }
    return (
        <View style={styles.container}>
            <Text style={{color: 'white'}}>Add new task</Text>
            <HideKeyboard>
                <View style={{width: '60%'}}>
                    <TextInput style={[globalStyles.border, styles.input]} value={value} onChangeText={setValue}/>
                </View>
            </HideKeyboard>
            <Button title={'Add task'} onPress={addTask}/>

            <View style={{width: '60%'}}>
                {tasks.map((t) => {
                    return <View key={t.id} style={[styles.boxTask]}>
                        <Checkbox value={t.isDone} onValueChange={(value) => changeStatus(t.id, value)}/>
                        {show === t.id
                            ? <TextInput style={[globalStyles.border, styles.input]} value={t.title}
                                         onChangeText={(title) => changeTask(t.id, title)}/>
                            : <Text onPress={() => setShow(t.id)}>{t.title}</Text>}
                        <Button title={'X'} onPress={() => deleteTask(t.id)}/>
                    </View>
                })}
            </View>
        </View>
    );
}

const HideKeyboard = ({children}: {
    children: ReactNode
}): ReactElement => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0e17',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20
    },
    input: {
        // width: '60%',
        backgroundColor: 'white',
        fontSize: 18,
        padding: 15,
        marginBottom: 20
    },
    boxTask: {
        flexDirection: 'row',
        backgroundColor: '#fffffe',
        justifyContent: 'space-between',
        paddingVertical: 4,
        paddingHorizontal: 20,
        marginVertical: 3
    }
});

const globalStyles = StyleSheet.create({
    border: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: 'black'
    }
})