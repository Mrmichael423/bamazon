// my var requiring npm packages
var Table = require("cli-table");

var inquirer = require("inquirer");

var mysql = require("mysql");

require("dotenv").config();

// info to my database
var connection = mysql.createConnection({
  host: "localhost",
  PORT: 3306,
  user: "root",
  password: process.env.MYSQL_PASS,
  database: "bamazon_db"
});

// connection to my database
connection.connect(function(err) {
  if (err) throw err;
  console.log(`connected as id: ${connection.threadId}`);
});

// Function to put items from my database into the command line
function runApp() {
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    if (err) throw err;
    // setting up the headers for my table in node
    var table = new Table({
      head: [
        "Item ID",
        "Product name",
        "Product Sales",
        "Department name",
        "Price",
        "Stock quantity"
      ],
      colWidths: [10, 30, 30, 30, 15, 30]
    });
    //for loop to go through the table in mysql and push the items to the table in node.
    for (var i = 0; i < res.length; i++) {
      table.push([
        res[i].item_id,
        res[i].product_name,
        res[i].product_sales,
        res[i].department_name,
        res[i].price,
        res[i].stock_quantity
      ]);
    }
    // displaying the table in node
    console.log(table.toString());
    // running the next function so the user can buy items
    buy();
  });
}

// functions so user and buy items
function buy() {
  inquirer
    .prompt([
      {
        //asking what the user wants to buy by id number and storing answer in "id"
        name: "id",
        message: "What id number would you like to buy?"
      },
      {
        // asking how much the user wants to buy and storing answer in "amount"
        name: "amount",
        message: "How much would you like to buy?"
      }
    ]) // callback function with the user responses
    .then(function(answer) {
      // storing user answers in variables
      var product = answer.id;
      var amount = answer.amount;
      update(product, amount);
    });
}

//function to update the table in mysql and node
function update(product, amount) {
  var query = "SELECT * FROM products WHERE ?";
  connection.query(query, { item_id: product }, function(err, res) {
    if (err) throw err;
    if (amount <= res[0].stock_quantity);
    var cost = res[0].price * amount;
    // console.log(res[0].stock_quantity);
    console.log(
      `I cant believe you just bought ${amount} ${res[0].product_name} for $${cost}! You're out of your mind!`
    );
    var newAmount = (res[0].stock_quantity -= amount);
    connection.query("UPDATE products SET ? WHERE ?", [
      { stock_quantity: newAmount },
      { item_id: product },
      function(err, res) {
        if (err) throw err;
      }
    ]);
    setTimeout(runApp, 4000);
  });
}
runApp();
