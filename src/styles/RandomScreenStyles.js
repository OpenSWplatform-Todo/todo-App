import { StyleSheet } from "react-native";
import { theme } from '../theme';

export const viewStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
    alignItems: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor: theme.white,
    alignItems: 'center',
  },
  item1: {
    flexDirection: 'row',
    top: 10,
    width:390,
    height: 'auto',
    padding: 15,
    backgroundColor: theme.lightGray,
    alignItems: 'center', 
  },
  item2: {
    top: 10,
    width:390,
    height: 170,
    padding: 15,
    justifyContent: 'center',
    backgroundColor: theme.lightGray,
  },
});

export const textStyles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.ewhagreen,
    alignItems: 'flex-start',
    marginTop: -5,
  },
  title2: {
    marginTop: 70,
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.ewhagreen,
  },
  title3: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.ewhagreen,
  },
  quote: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.ewhagreen,
    marginLeft: 10,
  },
  author: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.midGray,
    marginRight: 20,
    marginTop: 10,
    textAlign: 'right',
  },
  todo: {
    fontSize: 23,
    fontWeight: '600',
    color: theme.ewhagreen,
    marginRight: 20,
  },
  duedate: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.midGray,
  },
});

export const imageStyles = StyleSheet.create({
    image: {
      width: 116,
      height: 154,
      marginTop: 160,
      marginBottom: 70,
    },
    image2: {
      width: 40,
      height: 43,
      marginRight: 20,
    },
});

export const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: theme.ewhagreen,
    alignItems: 'center',
    justifyContent: 'center',
    top: 20,
    paddingLeft: 25,
    paddingRight: 25,
    height: 40,
    borderRadius: 5,   
  },
  button2: {
    backgroundColor: theme.midGray,
    alignItems: 'center',
    justifyContent: 'center',
    left: 10,
    top: 20,
    paddingLeft: 25,
    paddingRight: 25,
    height: 40,
    borderRadius: 5,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.white,
  },
});