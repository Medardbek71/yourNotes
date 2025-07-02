import Colors from "@/constants/Colors";
import { Checkbox } from "expo-checkbox";
import * as Contacts from "expo-contacts";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const CollaboratorList = (collaboratorList, setCollaboratorList) => {
  const [error, setError] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const [contactsAreSelected, setContactsSelected] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
          const { data } = await Contacts.getContactsAsync({
            fields: [
              Contacts.Fields.FirstName,
              Contacts.Fields.LastName,
              Contacts.Fields.ID,
            ],
          });

          if (data.length > 0) {
            setContacts(data);
            // Initialiser les états des checkboxes
            const initialSelected = {};
            data.forEach((contact) => {
              initialSelected[contact.id] = false;
            });
            setSelectedContacts(initialSelected);
          } else {
            setError("No contact found");
          }
        } else {
          setError("Access denied");
        }
      } catch (error) {
        setError(error.message || "Une erreur est survenue");
        console.error(error);
      }
    })();
  }, []);

  const getContactDisplayName = (contact) => {
    if (contact.firstName && contact.lastName) {
      return `${contact.firstName} ${contact.lastName}`;
    } else if (contact.firstName) {
      return contact.firstName;
    } else if (contact.name) {
      return contact.name;
    } else {
      return "Contact sans nom";
    }
  };

  const toggleContactSelection = (contactId, contactName) => {
    // Déterminer la nouvelle valeur AVANT de mettre à jour l'état
    const isCurrentlySelected = selectedContacts[contactId] || false;
    const newSelectedValue = !isCurrentlySelected;

    // Mettre à jour l'état des checkboxes
    setSelectedContacts((prev) => ({
      ...prev,
      [contactId]: newSelectedValue,
    }));

    // Gérer la liste des collaborateurs basé sur la NOUVELLE valeur
    if (newSelectedValue) {
      // Contact sélectionné : ajouter à la liste
      setCollaboratorList((prev) => {
        // Vérifier si déjà présent pour éviter les doublons
        const exists = prev.some((collab) => collab.id === contactId);
        if (!exists) {
          return [...prev, { id: contactId, name: contactName }];
        }
        return prev;
      });
    } else {
      // Contact désélectionné : retirer de la liste
      setCollaboratorList((prev) =>
        prev.filter((collab) => collab.id !== contactId)
      );
    }
  };

  return (
    <View style={styles.collaboratorSection}>
      <Text style={[styles.label, { marginTop: 15 }]}>
        Collaborators ({collaboratorList.length})
      </Text>
      <View style={styles.collaborator}>
        <View style={styles.avatarContainer}>
          {collaboratorList.slice(0, 3).map((collab, index) => (
            <View key={index} style={styles.avatar}>
              <Text style={styles.avatarText}>
                {collab.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          ))}
          {collaboratorList.length > 3 && (
            <View style={styles.moreButton}>
              <Text style={styles.moreButtonText}>
                {collaboratorList.length - 3}+
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() => setContactsSelected(!contactsAreSelected)}
          style={styles.addContact}
        >
          <Text style={styles.addContactText}>
            {contactsAreSelected ? "Fermer" : "Contacts"}
          </Text>
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {contactsAreSelected && contacts && contacts.length > 0 && (
        <View style={styles.collaboratorList}>
          <ScrollView
            style={styles.contactScrollView}
            contentContainerStyle={styles.contactScrollContent}
            nestedScrollEnabled={true}
            scrollEventThrottle={16}
          >
            {contacts.map((contact, index) => (
              <TouchableOpacity
                key={contact.id || index}
                style={styles.contactView}
                onPress={() =>
                  toggleContactSelection(
                    contact.id,
                    getContactDisplayName(contact)
                  )
                }
                activeOpacity={0.7}
              >
                <Text style={styles.contactName}>
                  {getContactDisplayName(contact)}
                </Text>
                <Checkbox
                  value={selectedContacts[contact.id] || false}
                  onValueChange={() =>
                    toggleContactSelection(
                      contact.id,
                      getContactDisplayName(contact)
                    )
                  }
                  style={styles.checkbox}
                  color={Colors?.background?.tertiary || "#007AFF"}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default CollaboratorList;

const styles = StyleSheet.create({
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors?.background?.blue_light || "#007AFF",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  moreButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors?.background?.secondary || "#666",
    justifyContent: "center",
    alignItems: "center",
  },
  moreButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  addContact: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors?.background?.tertiary || "#007AFF",
    backgroundColor: "transparent",
  },
  addContactText: {
    color: Colors?.background?.tertiary || "#007AFF",
    fontSize: 14,
    fontWeight: "600",
  },
  contactView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  contactName: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  collaboratorSection: {
    marginBottom: 20,
  },
  collaborator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  collaboratorList: {
    marginTop: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    height: 200, // Hauteur fixe pour le container
  },
  contactScrollView: {
    flex: 1,
  },
  contactScrollContent: {
    flexGrow: 1,
    padding: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
});
