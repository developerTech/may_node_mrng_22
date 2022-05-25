// Page1
# List Of City
> http://localhost:9100/location
# List of Restaurants
http://localhost:9100/restaurants
# Restaurants WRT City
http://localhost:9100/restaurants?stateId=1
# MealType
http://localhost:9100/list/mealType

//Page2
# Restaurants WRT To MealType
http://localhost:9100/restaurants?mealId=1
# Restaurants WRT To Cuisine
http://localhost:9100/filter/1?cuisineId=4
# Restaurants WRT To Cost
http://localhost:9100/filter/1?lcost=500&hcost=1000
# Sort on basis of cost
http://localhost:9100/filter/1?lcost=500&hcost=1000&sort=-1
# Pagination
http://localhost:9100/filter/1?lcost=500&hcost=2000&skip=4&limit=2

//Page3
# Details of Restaurants
http://localhost:9100/details/11
# Menu wrt to Restaurants
http://localhost:9100/menu/8

//Page4
# Details of selected Menu
(POST) http://localhost:9100/menuItem
[4,5,23]
# Place Order
(POST) http://localhost:9100/placeOrder
{
	"id":767675687,
	"userName":"Amit",
	"phone":9879878997,
	"rest_name":"Domino's Pizza",
	"cost":789,
	"status":"Payment Pending"
}


//Page5
# Get All The Orders
> http://localhost:9100/getOrder
# GET Order on basis of emailId
> http://localhost:9100/getOrder?email=a@a.com
# Update the order status
(put)> http://localhost:9100/updateOrder
# Delete the orders
(delete)> http://localhost:9100/removeOrder