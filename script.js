function random(min = 1, max = 3){
	let rand = Math.floor(min + Math.random() * (max + 1 - min))
	let paper 
	let stone 
	let scissors 
	if(rand===1){paper = "paper"}
	else if(rand===2){stone = "stone"}
	else if(rand===3){scissors = "scissors"}
	let arr = [paper,stone, scissors].filter(Boolean).join()
	return arr
}


const mysql = require('mysql2')
const prompt = require('prompt')
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'chingachung',
	password: 'root1993'
})
const winnerObj = {
	"paperpaper": "draw",
   "stonestone": "draw",
   "scissorsscissors": "draw",
   "paperscissors": "Player 2 wins",
   "paperstone": "Player 1 wins",
   "stonepaper": "Player 2 wins",
   "stonescissors": "Player 1 wins",
   "scissorsstone": "Player 2 wins",
   "scissorspaper": "Player 1 wins",
}


function game(){
	let player1
	let player2 = random()
	let winner
	
	prompt.start()
	prompt.get("Make your turn", function (err, result) {
		if (err) {
			console.error('Error occurred:', err)
			return
		}
		console.log("Player 1 turn:", result["Make your turn"])
		console.log("Player 2 turn:", player2)
		player1 = result["Make your turn"]
		let gameResult = player1 + player2
		winner = winnerObj[gameResult]
		console.log("Result:", winner)

		const sql = `INSERT INTO gameresults ( player1_result, player2_result, winner_result) VALUES (?, ?, ? )`
		const values = [ player1, player2, winner]
		connection.query(sql, values, (err, result) => {
			if (err) {
				console.error('Error inserting data:', err)
			} else {
				console.log('Data inserted successfully!')
			}
		})
		
		if(winner === "draw"){game()}
		if(!winner){game()}
	})
}

game()



// connection.execute('SELECT * FROM `gameresults`', function (err, results, fields) {
// console.log(results);
// console.log(fields);
// });




