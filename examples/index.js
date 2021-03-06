
const data = [
	{
		place: 'Koenraad',
		coord: [52.09412601996657, 5.118930974598105],
		image: '../examples/img/koendraad.jpg',
		building: 'Voorstraat 14',
		ig: '@koenraad_utrecht',
		description1: `You won't find any fuss at Koenraad, because here they go back to the basic of good and pure food. 
		No hypes and trends, but above all just a good night out with the best food and fine wines. 
		Koenraad has been on the Voorstraat since 2019 and is therefore still fairly new in Utrecht. 
		Ingredients and also the drinks are locally sourced, and the service ensures that you have a night out as it should be.`,
		description2: `When they can open indoors, you can also have a drink there and eat at the bar. Or even at the cosy fireplace. Like we said, no fuss! And did you know Koenraad even has real Utrecht specialties on the menu?,
		`
	},
	{
		place: 'The Streetfood Club',
		coord: [52.093005462934606, 5.122074096180487],
		image: '../examples/img/The Streetfood Club.jpeg',
		building: 'Janskerkhof 9',
		ig: '@thestreetfoodclub',
		description1: `From no fuss to extremely hip. The Streetfood Club is the hotspot in Utrecht at the Janskerkhof. Everything has been thought of and every corner is Insta-worthy. There is a luxurious cocktail bar with a DJ, an urban jungle and a bright pink room. But the food has also been well thought out. `,
		description2: `The extensive menu includes dishes such as: dim sum, spring rolls, tacos and ceviche. Most dishes are suitable for sharing, which is a good thing, because you can choose a lot of dishes to try! The interior is great, but most important: so is the food. What else do you want? If you are there next time; order the KFC. Trust us, you will not regret it!`
	},
	{
		place: 'Cerveceria Boulevard',
		coord: [52.08947054035109, 5.135407084543179],
		image: '../examples/img/cerveceria boulevard.jpg',
		building: 'Burgemeester Reigerstraat 45',
		ig: '@cerveceriaboulevard',
		description1: `At Cerveceria Boulevard you can enjoy Spanish delicacies in a Basque way in a warm, light and Mediterranean vibe. 
		You can go here for Spanish sandwiches, different types of cheese, charcuterie and a wide range of beers, wines and other drinks.`,
		description2: `But the pintxos (snacks on a skewer) are the number one priority: from Spanish ham and Manchego, 
		to special pintxos with Pata Negra, goat cheese and honey or with grilled tuna, wasabi cream and seaweed. With friends or on a romantic date, 
		at Cerveceria Boulevard you can enjoy Spanish flavours and conviviality every evening.`,
	},
	{
		place: 'Vegitalian',
		coord: [52.092918262960346, 5.1193295268707475],
		image: '../examples/img/Vegitalian.jpeg',
		building: 'Schoutenstraat 17',
		ig: '@vegitalian.nl',
		description1: `??????A tavola non si invecchia???. This beautiful Italian saying means: "you don't get old at the table". With good company and good food, you
		never waste time. An old Italian philosophy, which is embraced with
		love at Vegitalian! And if there is one more thing they want to add to
		this tradition here: eat consciously.
		`,
		description2: `That is why everything they serve here is vegetarian (n), they work
		with sustainable suppliers, they use local products and organic
		ingredients as much as possible. Many people take small steps.
		Vegitalian believes that this determines the future! And we believe in
		Vegitalian.`,
	},
	{
		place: 'Ruby Rose',
		coord: [52.09288364620955, 5.122015711525638],
		image: '../examples/img/Ruby Rose.jpg',
		building: 'Korte Jansstraat 23',
		ig: '@rubyroseutrecht',
		description1: `Ruby Rose is a wine and food bar with an amazing interior. Lots of
		beautiful prints and a huge bar in the middle of the place. An infinite
		amount of good wine and everything you like comes from the kitchen. A
		menu with mainly Mediterranean dishes that you order to share. Good
		products served in all their simplicity, but always bursting with flavour.
		Think of beautiful hams from the slicer, oysters, burrata, snails, fruits de
		mer, carpaccio with fresh truffle, risotto, cheeses, pasta and small pizzas.
		Perfect for a drink with friends or an extensive dinner at a date night??????A tavola non si invecchia???. This beautiful Italian saying means: "you don't get old at the table". With good company and good food, you
		never waste time. An old Italian philosophy, which is embraced with
		love at Vegitalian! And if there is one more thing they want to add to
		this tradition here: eat consciously.
		`,
		description2: `All this is served in a special location. A beautiful Jugendstil building from
		1904 on the Korte Jansstraat that was built as a flower shop at the time,
		something that you definitely see in the interior. So pop those bottles
		next time you???re there and celebrate life!
		`,

	}
]

const map = L.map('map');

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let createLatLng = point => {
	let stacks = []
	point.forEach(l => {
		stacks.push(L.latLng(l.coord))
	})
	return stacks
}


let control = L.Routing.control(L.extend(window.lrmConfig, {
	waypoints: createLatLng(data),
	geocoder: L.Control.Geocoder.nominatim(),
	routeWhileDragging: true,
	reverseWaypoints: true,
	showAlternatives: true,
	altLineOptions: {
		styles: [
			{ color: 'black', opacity: 0.15, weight: 9 },
			{ color: 'white', opacity: 0.8, weight: 6 },
			{ color: 'blue', opacity: 0.5, weight: 2 }
		]
	}
})).addTo(map);

L.Routing.errorControl(control).addTo(map);

let contentList = (list) => {
	for (let i = 1; i < list.length; i++) {
		// Image section
		let imgList = document.createElement('li')
		let elImg = `
					<a>
						<img src="${list[i].image}" alt="" class="src">
					</a>
					`
		imgList.innerHTML = elImg
		document.getElementById('img-list').appendChild(imgList)

		// Description section
		let contentList = document.createElement('li')

		let elContent = `
						<div>
							<h2> ${data[i].place} 
								<span>
									<button class="play" id="speech${i}" style="float: right;"><i class="fa fa-play-circle-o" style="font-size:28px;color:red"></i></button> 
									<button class="play" id="pause${i}" style="float: right;display:none"><i class="fa fa-pause-circle-o" style="font-size:28px;color:red"></i></button>
									<button class="play" id="stop${i}" style="float: right;display:none"><i class="fa fa-stop-circle-o" style="font-size:28px;color:red"></i></button>
								</span>
							</h2>
							<ul class='icon-text'>
								<li><i class="fas fa-map-marker-alt" style='font-size:12px;color:red;vertical-align: middle;'></i> ${data[i].building}</li>
								<li><i class="fab fa-instagram" style='font-size:12px;color:#C13584;vertical-align: middle;'></i> ${data[i].ig}</li>
							</ul>
							<div class="new-hr-line"></div>
							<p id="p${i}">
								${data[i].description1}
							</p>
							<p id="pp${i}">
								${data[i].description2}
							</p>                         
						</div> 
						`
		contentList.innerHTML = elContent
		document.getElementById('content-list').appendChild(contentList)
	}
}

contentList(data)

let naratorVoice = (text) => {
	let msg = new SpeechSynthesisUtterance();

	msg.lang = 'en'
	msg.text = text;

	window.speechSynthesis.speak(msg);
}

let speech = () => {
	let ul = document.getElementById('content-list')
	let query = ul.querySelectorAll('button')
	
	for(let i = 0; i < query.length; i++) {

		let existBtn = document.getElementById(`speech${i}`)
		let pauseBtn= document.getElementById(`pause${i}`)
		let stopBtn= document.getElementById(`stop${i}`)

		existBtn.addEventListener('click', function(){
			let p1 = document.getElementById(`p${i}`)
			let p2 = document.getElementById(`pp${i}`)

			let text = p1.innerHTML +'    '+ p2.innerHTML

			existBtn.style.display = 'none'
			pauseBtn.style.display = 'block'
			stopBtn.style.display = 'block'
			
			naratorVoice(text)
		})

		pauseBtn.addEventListener('click', function(){
			window.speechSynthesis.pause();

			existBtn.style.display = 'block'
			pauseBtn.style.display = 'block'
			stopBtn.style.display = 'none'
		})

		stopBtn.addEventListener('click', function(){
			window.speechSynthesis.pause();

			existBtn.style.display = 'block'
			pauseBtn.style.display = 'none'
			stopBtn.style.display = 'none'
		})
	}
}

// let pauseSpeech = () => {
// 	for(let i = 0; i < query.length; i++) {

// 		let existBtn = document.getElementById(`speech${i}`)
// 		let pauseBtn= document.getElementById(`pause${i}`)
// 		let stopBtn= document.getElementById(`stop${i}`)

// 		pauseBtn.onclick = function() {
// 			window.speechSynthesis.pause();
// 			existBtn.style.display = 'block'
// 			pauseBtn.style.display = 'none'
// 			stopBtn.style.display = 'none'
// 		}
// 	}
// }

speech()
