import { useSQLiteContext } from 'expo-sqlite'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const DeadLineSchedule = () => {
    const [data, setData] = useState([]) // Tableau au lieu de string
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const database = useSQLiteContext()

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true)
                setError(null)
                
                const result = await database.getAllAsync("SELECT * FROM users")
                setData(result || []) // S'assurer que c'est un tableau
                
                console.log('Data loaded:', result)
            } catch (err) {
                console.error('Error loading data:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        
        loadData()
    }, [])

    // Fonction pour afficher un utilisateur
    const renderUser = ({ item }) => (
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <View style={styles.userItem}>
                <Text style={styles.userId}>ID: {item.id}</Text>
                <Text style={styles.userName}>Nom: {item.name || 'Non défini'}</Text>
                <Text style={styles.userEmail}>Email: {item.email || 'Non défini'}</Text>
            </View>
            <View>
                <TouchableOpacity
                    onPress={()=>alert(item.id)}
                    style={{backgroundColor:'white',height:50,width:50,display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:25}}
                >
                    <Text>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Chargement des données...</Text>
            </View>
        )
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>Erreur: {error}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>DeadLine - Utilisateurs</Text>
            
            {data.length === 0 ? (
                <Text style={styles.emptyText}>Aucun utilisateur trouvé</Text>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderUser}
                    style={styles.list}
                />
            )}
            
            <Text style={styles.countText}>
                Total: {data.length} utilisateur(s)
            </Text>
        </View>
    )
}

export default DeadLineSchedule

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
    },
    list: {
        flex: 1,
    },
    userItem: {
        backgroundColor: 'white',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    userId: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
    },
    userName: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 4,
        color: '#333',
    },
    userEmail: {
        fontSize: 14,
        marginTop: 2,
        color: '#666',
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 50,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
    countText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#666',
        marginTop: 16,
        fontWeight: '500',
    },
})