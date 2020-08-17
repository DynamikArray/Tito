export default {
  username: [v => !!v || "Username is a required field"],
  password: [v => !!v || "Password is a required field"]
};
