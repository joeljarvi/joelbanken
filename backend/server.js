import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
const PORT = 4000;
// Middleware
app.use(cors());
app.use(bodyParser.json());
// Generera engångslösenord
function generateOTP() {
  // Generera en sexsiffrig numerisk OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}
// Din kod här. Skriv dina arrayer
const users = [];
let account = [];
const session = [];
// Din kod här. Skriv dina routes:

app.post("/createAccount", (req, res) => {
  const data = req.body;
  data.id = 101 + users.length;
  users.push(data);
  const newAccount = [];
  newAccount.userId = 100 + users.length;
  newAccount.id = users.length;
  newAccount.amount = 0;
  account.push(newAccount);
  console.log("in users array", users);
  console.log("in account array ", account);
  res.send("Posts recived");
});
app.post("/login", (req, res) => {
  const data = req.body;
  let loginSuccessful = false;
  let newSession = {};
  let usersAccount = {};
  for (let i = 0; i < users.length; i++) {
    if (
      users[i].username == data.username &&
      users[i].password == data.password
    ) {
      const token = generateOTP();
      newSession = { userId: users[i].id, token: token };
      session.push(newSession);
      usersAccount = {
        userId: account[i].userId,
        id: account[i].id,
        amount: account[i].amount,
        username: users[i].username,
      };
      loginSuccessful = true;
      break;
    }
  }
  if (loginSuccessful) {
    res.json({
      message: "Login successful",
      session: newSession,
      account: usersAccount,
    });
    console.log("in session array ", session);
  } else {
    res.status(401).send({ message: "Invalid username or password" });
  }
});
// Starta servern
app.listen(PORT, () => {
  console.log(`Bankens backend körs på http://localhost:${PORT}`);
});
