const socket = io();

const send = document.querySelector(".send");
const user = document.querySelector(".user-input ");
const message = document.querySelector(".msg-input ");
const msgcontainer = document.querySelector(".msg-container");
const typing = document.querySelector(".typing");

//Envio mensaje
send.addEventListener("click", () => {
	let data = { msg: message.value, user: user.value };
	socket.emit("chat:msg", data);
});

//Recibo mensajes
socket.on("chat:msg", (data) => {
	let msgType = "";
	let flex = "";
	if (data.user != user.value) {
		msgType = "other";
		flex = "end";
	} else {
		msgType = "you";
		flex = "start";
	}
	msgcontainer.innerHTML += ` <div class="col-12 d-flex justify-content-${flex}">
    <p class="${msgType}"><strong>${data.user}:</strong> <br>${data.msg}</p>
</div>`;

	//pateamos el scroll abajo para ver nuevos mensajes
	msgcontainer.scrollTop = msgcontainer.scrollHeight;
});

//emitimos evento cuando  el usuario esta tipeando
message.addEventListener("keypress", () => {
	socket.emit("user:typing", user.value);
});

//recibimos evento si esta tipiando
socket.on("user:typing", (user) => {
	typing.innerHTML = `<em>${user} esta escribiendo..</em>`;

	setTimeout(() => {
		typing.innerHTML = "";
	}, 2000);
});
