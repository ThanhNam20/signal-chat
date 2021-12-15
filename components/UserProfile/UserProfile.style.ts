import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  avatarUser: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10
  },
  userProfileInputData: {

  },

  profileItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    margin: 10,
    borderWidth: .5,
    borderColor: "thistle",
    borderRadius: 2,
    overflow: "hidden"
  },
  profileItemInput: {
    textAlign: 'right',
    borderWidth: .5,
    borderBottomColor: '#fff',
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    borderRightColor: '#fff',
    width: 200,
  }

});

export default styles;